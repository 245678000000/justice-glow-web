import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, PhoneOff, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { RetellWebClient } from "retell-client-js-sdk";

const AGENT_ID = "agent_01ea89539267e2c00e78af1f9b";
const WEB_CALL_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/retell-web-call`;

type CallStatus = "idle" | "connecting" | "active" | "ended";

const RetellWidget = () => {
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const retellClientRef = useRef<RetellWebClient | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const client = new RetellWebClient();

    client.on("call_started", () => {
      setCallStatus("active");
    });

    client.on("call_ended", () => {
      setCallStatus("idle");
    });

    client.on("error", (error) => {
      console.error("Retell error:", error);
      toast({
        title: "通话出错",
        description: "语音连接异常，请稍后重试",
        variant: "destructive",
      });
      setCallStatus("idle");
    });

    retellClientRef.current = client;

    return () => {
      client.stopCall();
    };
  }, [toast]);

  const startCall = async () => {
    if (callStatus !== "idle") return;
    setCallStatus("connecting");

    try {
      const resp = await fetch(WEB_CALL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ agent_id: AGENT_ID }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.error || "无法创建通话");
      }

      const data = await resp.json();

      await retellClientRef.current?.startCall({
        accessToken: data.access_token,
      });
    } catch (e: any) {
      console.error("Start call error:", e);
      toast({
        title: "连接失败",
        description: e.message || "请稍后再试",
        variant: "destructive",
      });
      setCallStatus("idle");
    }
  };

  const endCall = () => {
    retellClientRef.current?.stopCall();
    setCallStatus("idle");
  };

  const toggleMute = () => {
    if (!retellClientRef.current) return;
    const newMuted = !isMuted;
    if (newMuted) {
      retellClientRef.current.mute();
    } else {
      retellClientRef.current.unmute();
    }
    setIsMuted(newMuted);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-end gap-2">
      <AnimatePresence>
        {callStatus === "active" && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
          >
            <Button
              onClick={toggleMute}
              size="icon"
              variant="outline"
              className="h-10 w-10 rounded-full shadow-lg bg-card border-border"
              title={isMuted ? "取消静音" : "静音"}
            >
              {isMuted ? <MicOff className="h-4 w-4 text-destructive" /> : <Mic className="h-4 w-4" />}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        {callStatus === "idle" ? (
          <Button
            onClick={startCall}
            className="h-14 w-14 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700"
            title="点击与小鼎语音通话"
          >
            <Phone className="h-6 w-6" />
          </Button>
        ) : callStatus === "connecting" ? (
          <Button
            disabled
            className="h-14 w-14 rounded-full bg-yellow-500 text-white shadow-lg animate-pulse"
          >
            <Phone className="h-6 w-6" />
          </Button>
        ) : (
          <Button
            onClick={endCall}
            className="h-14 w-14 rounded-full bg-destructive text-destructive-foreground shadow-lg hover:bg-destructive/90"
            title="挂断通话"
          >
            <PhoneOff className="h-6 w-6" />
          </Button>
        )}
      </motion.div>

      <AnimatePresence>
        {callStatus === "active" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-card text-card-foreground text-xs px-3 py-1.5 rounded-full shadow-lg border border-border"
          >
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              正在与小鼎通话中...
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RetellWidget;
