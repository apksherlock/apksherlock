# Contact relay

Small Cloudflare Worker that receives the website's contact form and sends each message to a private Telegram chat. Visitors only see the form. No email address or phone number is published anywhere.

```
website form ──► Worker (origin check, honeypot, Turnstile, validation) ──► Telegram bot ──► your phone
```

Free tier: 100,000 requests/day on Workers. Telegram and Turnstile are free.

## One-time setup

### 1. Telegram bot (about 2 min)
1. In Telegram, message **@BotFather** → `/newbot` → pick a name. Copy the **token**.
2. Open a chat with your new bot and send it any message (e.g. `hi`).
3. Open `https://api.telegram.org/bot<TOKEN>/getUpdates` in a browser. Copy the number at `"chat":{"id": …}`. That's your **chat id**.

### 2. Deploy the Worker
```bash
cd worker
npx wrangler login                          # opens the browser, free Cloudflare account
npx wrangler deploy                         # prints the URL, e.g. https://contact-relay.<you>.workers.dev
npx wrangler secret put TELEGRAM_BOT_TOKEN  # paste the token
npx wrangler secret put TELEGRAM_CHAT_ID    # paste the chat id
```

### 3. Turnstile bot check (recommended)
1. Cloudflare dashboard → **Turnstile** → *Add widget* → domain `apksherlock.github.io`, mode *Managed*.
2. `npx wrangler secret put TURNSTILE_SECRET` → paste the **secret key**.
3. In `index.html`, put the **site key** (public, safe to commit) into `data-turnstile-sitekey="…"` on the form.

### 4. Point the website at the Worker
In `index.html`, set `data-endpoint="https://contact-relay.<you>.workers.dev"` on `#my-form`. Then push and send yourself a test message from the live site.

## Notes
- Secrets live only in Cloudflare. Nothing secret is in this repo.
- Allowed origins are in `wrangler.toml` (`ALLOWED_ORIGINS`). Add a custom domain there if you get one.
- Messages arrive as plain text with link previews off. Check links before opening them; anyone can type anything into a form.
- Telegram's limit is 4096 characters per message, so the form message is capped at 3500.
