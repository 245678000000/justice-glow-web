import { useEffect } from "react";

const RETELL_PUBLIC_KEY = "key_3188dd74ec1233eff3791f773a2e";
const RETELL_AGENT_ID = "agent_01ea89539267e2c00e78af1f9b";

const RetellWidget = () => {
  useEffect(() => {
    // Avoid duplicate script
    if (document.getElementById("retell-widget")) return;

    const script = document.createElement("script");
    script.id = "retell-widget";
    script.src = "https://dashboard.retellai.com/retell-widget.js";
    script.type = "module";
    script.setAttribute("data-public-key", RETELL_PUBLIC_KEY);
    script.setAttribute("data-agent-id", RETELL_AGENT_ID);
    // Position left of the existing chat widget
    script.setAttribute("data-position", "bottom-left");
    document.body.appendChild(script);

    return () => {
      const el = document.getElementById("retell-widget");
      if (el) el.remove();
    };
  }, []);

  return null;
};

export default RetellWidget;
