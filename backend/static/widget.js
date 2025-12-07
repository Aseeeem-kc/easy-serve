
(function () {
  const config = window.EASYSERVE_CONFIG || {};
  const defaults = {
    primaryColor: "#000000ff",      // Chat button & header
    textColor: "#ffffff",         // Text on header
    bubbleColor: "#e0e7ff",       // AI messages
    userColor: "#6366f1",         // User messages
    position: "bottom-right",     // bottom-right, bottom-left, top-right, top-left
    size: "normal",               // small, normal, large
    welcomeMessage: "Hi! How can we help you?",
    businessName: "EasyServe AI"
  };

  // Merge config with defaults
  const c = { ...defaults, ...config };

  // Size multiplier
  const sizeScale = c.size === "small" ? 0.85 : c.size === "large" ? 1.2 : 1;

  // Position logic
  const pos = c.position.split("-");
  const bottom = pos[0] === "bottom" ? "20px" : "auto";
  const top = pos[0] === "top" ? "20px" : "auto";
  const right = pos[1] === "right" ? "20px" : "auto";
  const left = pos[1] === "left" ? "20px" : "auto";

  const container = document.createElement("div");
  container.innerHTML = `
    <div id="easyserve-root" style="position:fixed;bottom:${bottom};top:${top};right:${right};left:${left};z-index:999999;">
      <button id="easyserve-toggle" style="background:${c.primaryColor};color:${c.textColor};border:none;width:${60*sizeScale}px;height:${60*sizeScale}px;border-radius:50%;box-shadow:0 4px 20px rgba(0,0,0,0.3);cursor:pointer;font-size:${28*sizeScale}px;">
        💬
      </button>
      <div id="easyserve-panel" style="display:none;background:white;width:${380*sizeScale}px;height:${520*sizeScale}px;border-radius:16px;box-shadow:0 10px 40px rgba(0,0,0,0.2);position:absolute;bottom:${80*sizeScale}px;right:0;overflow:hidden;">
        <div style="background:${c.primaryColor};color:${c.textColor};padding:16px;font-weight:bold;display:flex;justify-content:space-between;align-items:center;">
          <span>${c.businessName}</span>
          <span id="easyserve-close" style="cursor:pointer;font-size:24px;">×</span>
        </div>
        <div id="easyserve-messages" style="height:${380*sizeScale}px;padding:16px;overflow-y:auto;background:#f8f9fa;">
          <div style="background:${c.bubbleColor};color:#1f2937;padding:12px;border-radius:12px;max-width:80%;margin:8px 0;">
            ${c.welcomeMessage}
          </div>
        </div>
        <input id="easyserve-input" placeholder="Type a message..." style="width:100%;padding:16px;border:none;border-top:1px solid #eee;outline:none;font-size:16px;">
      </div>
    </div>
  `;
  document.body.appendChild(container);

  // Toggle & close
  document.getElementById("easyserve-toggle").onclick = () => {
    const p = document.getElementById("easyserve-panel");
    p.style.display = p.style.display === "none" ? "block" : "none";
  };
  document.getElementById("easyserve-close").onclick = () => {
    document.getElementById("easyserve-panel").style.display = "none";
  };

  // Dummy replies
  const replies = [
    "Thanks! Our AI is checking your request...",
    "One moment please, we're looking it up.",
    "Got it! An agent will reply soon.",
    "We're on it! Usually under 30 seconds."
  ];

  document.getElementById("easyserve-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      const msg = e.target.value;
      const messages = document.getElementById("easyserve-messages");

      // User message
      messages.innerHTML += `
        <div style="text-align:right;margin:12px 0;">
          <div style="background:${c.userColor};color:white;padding:12px;border-radius:12px;display:inline-block;max-width:80%;">${msg}</div>
        </div>`;
      e.target.value = "";

      // Fake AI reply
      setTimeout(() => {
        const reply = replies[Math.floor(Math.random() * replies.length)];
        messages.innerHTML += `
          <div style="background:${c.bubbleColor};color:#1f2937;padding:12px;border-radius:12px;max-width:80%;margin:12px 0;">
            ${reply}
          </div>`;
        messages.scrollTop = messages.scrollHeight;
      }, 1000);

      messages.scrollTop = messages.scrollHeight;
    }
  });

  console.log("EasyServe Widget Loaded – Fully Customizable!");
})();