import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { description } = await req.json();
    if (!description || typeof description !== "string" || description.trim().length < 5) {
      return new Response(JSON.stringify({ error: "请输入至少5个字的案情描述" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content:
              "你是一位资深中国法律顾问，擅长分析各类法律案件。根据用户描述的案情，提供专业的初步法律分析。请使用提供的工具返回结构化分析结果。",
          },
          {
            role: "user",
            content: `请分析以下案情并提供初步法律意见：\n\n${description.trim()}`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "analyze_case",
              description: "返回案件的结构化法律分析结果",
              parameters: {
                type: "object",
                properties: {
                  case_type: {
                    type: "string",
                    enum: ["争议解决", "公司商事", "知识产权", "资本市场", "刑事辩护", "劳动人事", "其他"],
                    description: "最匹配的案件类型",
                  },
                  summary: {
                    type: "string",
                    description: "一句话概括案情（不超过50字）",
                  },
                  legal_areas: {
                    type: "array",
                    items: { type: "string" },
                    description: "涉及的法律领域（1-3个）",
                  },
                  key_points: {
                    type: "array",
                    items: { type: "string" },
                    description: "关键法律要点（2-4条，每条不超过80字）",
                  },
                  suggested_actions: {
                    type: "array",
                    items: { type: "string" },
                    description: "建议下一步行动（2-3条）",
                  },
                },
                required: ["case_type", "summary", "legal_areas", "key_points", "suggested_actions"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "analyze_case" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "请求过于频繁，请稍后再试" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI 服务额度不足，请联系管理员" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      throw new Error("AI service error");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall?.function?.arguments) {
      throw new Error("No structured output from AI");
    }

    const result = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-case error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "分析失败，请稍后重试" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
