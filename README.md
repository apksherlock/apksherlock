# apksherlock

Personal site for **Stavro Xhardha** — Android engineering, blog reader, and contact. Static **HTML / CSS / vanilla JS**, designed for **[GitHub Pages](https://pages.github.com/)** on the [`apksherlock/apksherlock`](https://github.com/apksherlock/apksherlock) repository.

**Live site:** [https://apksherlock.github.io/apksherlock/](https://apksherlock.github.io/apksherlock/)

## Contents

| Path | Purpose |
|------|---------|
| `index.html` | Landing: hero, about, blog teaser, work, skills, hire / Formspree |
| `blog.html` | **Reader** — full posts from Hashnode (GraphQL), search, pagination |
| `css/style.css` | Global styles |
| `js/script.js` | Home: scroll, blog cards, Formspree JSON submit, parallax |
| `js/blog-reader.js` | Reader: post list, article body (Marked + DOMPurify), hash routing |
| `assets/images/` | Hero wallpaper, profile photo |
| `robots.txt` / `sitemap.xml` | SEO for crawlers |

## Run locally

No build step. From the repo root:

```bash
# Python 3
python3 -m http.server 8080

# or Node
npx --yes serve -l 8080
```

Open [http://localhost:8080](http://localhost:8080). Use the same origin when testing Hashnode and Formspree fetches (some behavior differs on `file://`).

## GitHub Pages

1. Repository **Settings → Pages**
2. **Build and deployment:** Source *Deploy from a branch*
3. Branch **`main`**, folder **`/` (root)**
4. Site URL: `https://apksherlock.github.io/apksherlock/`

If you later use a **custom domain** or a **`username.github.io`** repo, update canonical URLs, Open Graph tags, `sitemap.xml`, and `robots.txt` to match your real base URL.

## Contact form (Formspree)

The hire form posts JSON to Formspree. The form ID in the HTML is **public by design** (same as embedding any hosted form). Configure spam protection (CAPTCHA, honeypot, etc.) in the [Formspree](https://formspree.io/) dashboard.

## Blog / Reader (Hashnode)

- **Teaser cards** on the home page load the latest posts from `https://gql.hashnode.com` for publication host `dispatchersdotplayground.hashnode.dev`.
- **`blog.html`** loads the full list and article bodies the same way; markdown is rendered with **Marked** and sanitized with **DOMPurify** (CDN scripts in `blog.html`).

## Search engines

After Pages is live, add the site in [Google Search Console](https://search.google.com/search-console) and submit:

`https://apksherlock.github.io/apksherlock/sitemap.xml`

## License

See [LICENSE](LICENSE) (MIT).
