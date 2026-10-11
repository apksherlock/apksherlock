/* Contact relay: website form → (bot checks) → private Telegram chat.
   Secrets (set with `wrangler secret put`, never committed):
     TELEGRAM_BOT_TOKEN  token from @BotFather
     TELEGRAM_CHAT_ID    your chat id with the bot
     TURNSTILE_SECRET    optional; when set, every submission must pass Cloudflare Turnstile
   Plain var (wrangler.toml): ALLOWED_ORIGINS, comma-separated */

const LIMITS = { name: 100, email: 200, message: 3500 }; // Telegram caps a message at 4096 chars
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowed = (env.ALLOWED_ORIGINS || "").split(",").map((o) => o.trim()).filter(Boolean);
    const cors = allowed.includes(origin)
      ? { "Access-Control-Allow-Origin": origin, Vary: "Origin" }
      : {};

    const reply = (status, body) =>
      new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json", ...cors }
      });

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          ...cors,
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "86400"
        }
      });
    }
    if (request.method !== "POST") return reply(405, { ok: false });
    if (!cors["Access-Control-Allow-Origin"]) return reply(403, { ok: false });

    let data;
    try {
      data = await request.json();
    } catch {
      return reply(400, { ok: false });
    }

    // Honeypot: humans never see this field. Pretend success so bots don't retry.
    if (data._gotcha) return reply(200, { ok: true });

    const field = (key) => String(data[key] ?? "").trim();
    const name = field("name");
    const email = field("email");
    const message = field("message");

    const errors = {};
    if (!name || name.length > LIMITS.name) errors.name = true;
    if (!EMAIL_RE.test(email) || email.length > LIMITS.email) errors.email = true;
    if (!message || message.length > LIMITS.message) errors.message = true;
    if (Object.keys(errors).length) return reply(400, { ok: false, invalid: Object.keys(errors) });

    if (env.TURNSTILE_SECRET) {
      const check = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET,
          response: field("cf-turnstile-response"),
          remoteip: request.headers.get("CF-Connecting-IP") || ""
        })
      }).then((r) => r.json()).catch(() => ({ success: false }));
      if (!check.success) return reply(403, { ok: false, captcha: true });
    }

    // Plain text on purpose (no parse_mode): nothing in a submission can disguise a link.
    const text = [
      "📩 New message from the website",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      message
    ].join("\n");

    const sent = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text,
        link_preview_options: { is_disabled: true }
      })
    }).catch(() => null);

    if (!sent?.ok) return reply(502, { ok: false });
    return reply(200, { ok: true });
  }
};
