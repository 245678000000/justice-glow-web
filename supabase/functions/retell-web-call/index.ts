import { corsHeaders, jsonResponse } from "../_shared/cors.ts";
import { rateLimit } from "../_shared/rate-limit.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders(req) });
  }

  if (req.method !== "POST") {
    return jsonResponse(req, { error: "Method not allowed" }, 405);
  }

  // 每个 IP 每 5 分钟最多发起 3 次通话，语音按分钟计费，需要更严格的限制
  if (!rateLimit(req, 3, 5 * 60 * 1000)) {
    return jsonResponse(req, { error: "呼叫过于频繁，请稍后再试" }, 429);
  }

  try {
    const RETELL_API_KEY = Deno.env.get("RETELL_API_KEY");
    if (!RETELL_API_KEY) throw new Error("RETELL_API_KEY is not configured");

    const { agent_id } = await req.json();
    if (typeof agent_id !== "string" || agent_id.length === 0) {
      return jsonResponse(req, { error: "agent_id is required" }, 400);
    }

    // 只允许拨打服务端配置的坐席，避免本站接口被用来给任意坐席刷通话
    const allowedAgents = (Deno.env.get("RETELL_ALLOWED_AGENT_IDS") ?? "")
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);
    if (allowedAgents.length > 0 && !allowedAgents.includes(agent_id)) {
      return jsonResponse(req, { error: "该语音坐席不可用" }, 403);
    }

    const response = await fetch("https://api.retellai.com/v2/create-web-call", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RETELL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ agent_id }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Retell API error:", response.status, errorText);
      return jsonResponse(req, { error: "无法创建通话，请稍后再试" }, response.status);
    }

    const data = await response.json();
    // 只回传客户端建立通话所需的字段
    return jsonResponse(req, {
      access_token: data.access_token,
      call_id: data.call_id,
    });
  } catch (e) {
    console.error("retell-web-call error:", e);
    return jsonResponse(req, { error: "服务暂时不可用，请稍后再试" }, 500);
  }
});
