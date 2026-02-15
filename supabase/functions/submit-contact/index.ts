import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, phone, email, caseType, description } = await req.json();

    // Validate
    if (!name || !phone || !email || !caseType || !description) {
      return new Response(
        JSON.stringify({ error: "所有字段均为必填" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

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
      return new Response(
        JSON.stringify({ error: "存储失败" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send email notification via Resend
    const resendKey = Deno.env.get("RESEND_API_KEY");
    const notificationEmail = Deno.env.get("NOTIFICATION_EMAIL");

    if (resendKey && notificationEmail) {
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
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">姓名</td><td style="padding:8px;border:1px solid #ddd;">${name}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">电话</td><td style="padding:8px;border:1px solid #ddd;">${phone}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">邮箱</td><td style="padding:8px;border:1px solid #ddd;">${email}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">案件类型</td><td style="padding:8px;border:1px solid #ddd;">${caseType}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">案情描述</td><td style="padding:8px;border:1px solid #ddd;">${description}</td></tr>
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

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({ error: "服务器错误" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
