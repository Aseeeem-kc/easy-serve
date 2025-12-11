
(async function () {
  // 1. Get clientId from config or URL
  const urlParams = new URLSearchParams(window.location.search);
  const clientId = window.EASYSERVE_CONFIG?.clientId || urlParams.get("clientId");

  if (!clientId) {
    console.error("EasyServe Widget: clientId is missing!");
    return;
  }

  // 2. Default branding (fallback)
  let c = {
    business_name: "EasyServe",
    primary_color: "#6366f1",
    text_color: "#ffffff",
    bubble_color: "#e0e7ff",
    user_bubble_color: "#6366f1",
    welcome_message: "Hi! How can we help you today?",
    position: "bottom-right",
    size: "normal"
  };

  // 3. Fetch real branding from your backend
  try {
    const res = await fetch(`http://localhost:8000/api/users/onboarding/widget/config/${clientId}`);
    if (res.ok) {
      const data = await res.json();
      c = { ...c, ...data };  // Merge with defaults
      console.log("EasyServe: Custom branding loaded", c);
    } else {
      console.warn("EasyServe: Client not found – using defaults");
    }
  } catch (err) {
    console.warn("EasyServe: Could not connect to backend – using defaults", err);
  }

  // 4. Position & Size logic
  const pos = c.position.split("-");
  const bottom = pos[0] === "bottom" ? "20px" : "auto";
  const top = pos[0] === "top" ? "20px" : "auto";
  const right = pos[1] === "right" ? "20px" : "auto";
  const left = pos[1] === "left" ? "20px" : "auto";
  const scale = c.size === "small" ? 0.85 : c.size === "large" ? 1.15 : 1;

  // 5. Create widget
  const container = document.createElement("div");
  container.innerHTML = `
    <div style="position:fixed;bottom:${bottom};top:${top};right:${right};left:${left};z-index:999999;font-family:system-ui,Arial,sans-serif;">
      <!-- Toggle Button -->
      <button id="es-toggle" style="
        background:${c.primary_color};
        color:${c.text_color};
        border:none;
        width:${60*scale}px;
        height:${60*scale}px;
        border-radius:50%;
        box-shadow:0 6px 25px rgba(0,0,0,0.25);
        cursor:pointer;
        font-size:${28*scale}px;
        transition:all 0.3s ease;
      ">Chat</button>

      <!-- Chat Panel -->
      <div id="es-panel" style="
        display:none;
        background:white;
        width:${380*scale}px;
        height:${520*scale}px;
        border-radius:18px;
        box-shadow:0 15px 50px rgba(0,0,0,0.25);
        position:absolute;
        bottom:${80*scale}px;
        right:0;
        overflow:hidden;
        border:1px solid #e5e7eb;
      ">
        <!-- Header -->
        <div style="
          background:${c.primary_color};
          color:${c.text_color};
          padding:16px 20px;
          font-weight:700;
          font-size:18px;
          display:flex;
          justify-content:space-between;
          align-items:center;
        ">
          <span>${c.business_name}</span>
          <span id="es-close" style="cursor:pointer;font-size:28px;">×</span>
        </div>

        <!-- Messages -->
        <div id="es-messages" style="
          height:${380*scale}px;
          padding:16px;
          overflow-y:auto;
          background:#f8fafc;
        ">
          <div style="
            background:${c.bubble_color};
            color:#1f2937;
            padding:12px 16px;
            border-radius:16px;
            max-width:80%;
            margin:8px 0;
            display:inline-block;
          ">
            ${c.welcome_message}
          </div>
        </div>

        <!-- Input -->
        <input id="es-input" placeholder="Type your message..." style="
          width:100%;
          padding:16px 20px;
          border:none;
          border-top:1px solid #e5e7eb;
          outline:none;
          font-size:16px;
        ">
      </div>
    </div>
  `;

  document.body.appendChild(container);

  // Toggle panel
  document.getElementById("es-toggle").onclick = () => {
    const panel = document.getElementById("es-panel");
    panel.style.display = panel.style.display === "none" ? "block" : "none";
  };

  document.getElementById("es-close").onclick = () => {
    document.getElementById("es-panel").style.display = "none";
  };

  // Dummy replies
  const replies = [
    "Thanks! Our AI is reviewing your request...",
    "One moment please, we're checking our knowledge base.",
    "Got it! An agent will assist you shortly.",
    "We're on it! Usually under 30 seconds."
  ];

  document.getElementById("es-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      const msg = e.target.value.trim();
      const messages = document.getElementById("es-messages");

      // User message
      messages.innerHTML += `
        <div style="text-align:right;margin:12px 0;">
          <div style="background:${c.user_bubble_color};color:white;padding:12px 16px;border-radius:16px;display:inline-block;max-width:80%;">
            ${msg}
          </div>
        </div>`;

      e.target.value = "";

      // Fake AI reply
      setTimeout(() => {
        const reply = replies[Math.floor(Math.random() * replies.length)];
        messages.innerHTML += `
          <div style="background:${c.bubble_color};color:#1f2937;padding:12px 16px;border-radius:16px;max-width:80%;margin:12px 0;display:inline-block;">
            ${reply}
          </div>`;
        messages.scrollTop = messages.scrollHeight;
      }, 800);

      messages.scrollTop = messages.scrollHeight;
    }
  });

  console.log("EasyServe Widget Loaded – Client ID:", clientId);
})();