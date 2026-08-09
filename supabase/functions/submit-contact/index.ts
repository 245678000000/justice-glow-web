import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders, jsonResponse } from "../_shared/cors.ts";
import { rateLimit } from "../_shared/rate-limit.ts";

const LIMITS = {
  name: 50,
  phone: 20,
  email: 100,
  caseType: 20,
  description: 1000,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** 转义邮件 HTML，避免用户输入被当作标签解析 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function validate(payload: Record<string, unknown>): { ok: true; data: Record<keyof typeof LIMITS, string> } | { ok: false; error: string } {
  const result = {} as Record<keyof typeof LIMITS, string>;

  for (const [field, max] of Object.entries(LIMITS) as [keyof typeof LIMITS, number][]) {
    const raw = payload[field];
    if (typeof raw !== "string" || raw.trim().length === 0) {
      return { ok: false, error: "所有字段均为必填" };
    }
    const value = raw.trim();
    if (value.length > max) {
      return { ok: false, error: `字段 ${field} 超出长度限制（最多 ${max} 字符）` };
    }
    result[field] = value;
  }

  if (!EMAIL_RE.test(result.email)) {
    return { ok: false, error: "邮箱格式不正确" };
  }

  return { ok: true, data: result };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders(req) });
  }

  if (req.method !== "POST") {
    return jsonResponse(req, { error: "Method not allowed" }, 405);
  }

  // 每个 IP 每 10 分钟最多提交 5 次
  if (!rateLimit(req, 5, 10 * 60 * 1000)) {
    return jsonResponse(req, { error: "提交过于频繁，请稍后再试" }, 429);
  }

  try {
    const payload = await req.json();
    const validated = validate(payload);
    if (!validated.ok) {
      return jsonResponse(req, { error: validated.error }, 400);
    }
    const { name, phone, email, caseType, description } = validated.data;

    // Save to database
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert({ name, phone, email, case_type: caseType, description });

    if (dbError) {
      console.error("DB error:", dbError);
      return jsonResponse(req, { error: "存储失败" }, 500);
    }

    // Send email notification via Resend
    const resendKey = Deno.env.get("RESEND_API_KEY");
    const notificationEmail = Deno.env.get("NOTIFICATION_EMAIL");

    if (resendKey && notificationEmail) {
      const row = (label: string, value: string) =>
        `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">${label}</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(value)}</td></tr>`;

      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "鼎盛律所 <onboarding@resend.dev>",
          to: [notificationEmail],
          subject: `新咨询：${caseType} - ${name}`,
          html: `
            <h2>新的咨询预约</h2>
            <table style="border-collapse:collapse;width:100%;max-width:500px;">
              ${row("姓名", name)}
              ${row("电话", phone)}
              ${row("邮箱", email)}
              ${row("案件类型", caseType)}
              ${row("案情描述", description)}
            </table>
            <p style="color:#888;font-size:12px;margin-top:16px;">此邮件由鼎盛律所官网自动发送</p>
          `,
        }),
      });

      if (!emailRes.ok) {
        const errText = await emailRes.text();
        console.error("Resend error:", errText);
      }
    }

    return jsonResponse(req, { success: true });
  } catch (err) {
    console.error("submit-contact error:", err);
    return jsonResponse(req, { error: "服务器错误" }, 500);
  }
});
