/* Minimal vanilla JS: smooth anchor scroll, reveal on scroll, parallax, glitch bursts */

(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Footer year
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Smooth scroll for internal links (respects prefers-reduced-motion)
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  $$("a[data-scroll]").forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href") || "";
      if (!href.startsWith("#")) return;
      const id = href.slice(1);
      if (!id) return;
      e.preventDefault();
      scrollToId(id);
      history.replaceState(null, "", href);
    });
  });

  // IntersectionObserver: reveal sections
  const revealEls = $$(".reveal");
  const onReveal = (el) => el.classList.add("is-visible");

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        onReveal(entry.target);
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => io.observe(el));

  // Blog: load latest posts from Hashnode (GraphQL)
  const blogHost = "dispatchersdotplayground.hashnode.dev";
  const blogStatus = $("#blog-status");
  const blogPosts = $("#blog-posts");

  const setBlogStatus = (text) => {
    if (!blogStatus) return;
    blogStatus.textContent = text;
  };

  const escapeHtml = (str) =>
    String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const fmtDate = (iso) => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
  };

  const renderPosts = (posts) => {
    if (!blogPosts) return;
    if (!posts.length) {
      setBlogStatus("No posts found yet.");
      return;
    }

    blogPosts.innerHTML = posts
      .map((p) => {
        const title = escapeHtml(p.title || "Untitled");
        const brief = escapeHtml(p.brief || "");
        const rawSlug = p.slug || "";
        const readerHref = rawSlug ? `./blog.html#${encodeURIComponent(rawSlug)}` : `https://${blogHost}/`;
        const slugPath = String(rawSlug)
          .replace(/^\/+/, "")
          .split("/")
          .filter(Boolean)
          .map((seg) => encodeURIComponent(seg))
          .join("/");
        const hashnodeHref = slugPath ? `https://${blogHost}/${slugPath}` : `https://${blogHost}/`;
        const date = fmtDate(p.publishedAt);
        return `
          <article class="blog-card" role="listitem">
            <div class="blog-card__top">
              <span class="blog-card__date mono">${escapeHtml(date)}</span>
              <span class="blog-card__badge">ANDROID</span>
            </div>
            <h3 class="blog-card__title">${title}</h3>
            <p class="blog-card__desc">${brief}</p>
            <div class="blog-card__links">
              <a class="blog-card__link mono" href="${readerHref}">Read here →</a>
              <a class="blog-card__link blog-card__link--ghost mono" href="${hashnodeHref}" target="_blank" rel="noreferrer">Hashnode</a>
            </div>
          </article>
        `;
      })
      .join("");

    setBlogStatus("Latest posts");
  };

  const loadBlogPosts = async () => {
    if (!blogPosts) return;
    try {
      const res = await fetch("https://gql.hashnode.com", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          query: `
            query PublicationPosts($host: String!) {
              publication(host: $host) {
                posts(first: 6) {
                  edges {
                    node {
                      title
                      brief
                      slug
                      publishedAt
                    }
                  }
                }
              }
            }
          `,
          variables: { host: blogHost }
        })
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const edges = json?.data?.publication?.posts?.edges ?? [];
      const posts = edges.map((e) => e?.node).filter(Boolean);
      renderPosts(posts);
    } catch (err) {
      setBlogStatus("Couldn’t load posts here. Use “Open Blog” above.");
      if (blogPosts) blogPosts.innerHTML = "";
    }
  };

  loadBlogPosts();

  // Hero parallax (very subtle)
  const heroBg = $("#hero-bg");
  const hero = $(".hero");
  let raf = 0;
  const onScroll = () => {
    if (!heroBg || !hero) return;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const rect = hero.getBoundingClientRect();
      // Only while hero is in view
      const inView = rect.bottom > 0 && rect.top < window.innerHeight;
      if (!inView) return;
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height)));
      const y = progress * 18; // px
      heroBg.style.transform = `translate3d(0, ${y}px, 0) scale(1.02)`;
    });
  };
  if (!reduceMotion) {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Random glitch bursts (subtle) on the hero headline
  const glitch = $(".glitch");
  if (glitch && !reduceMotion) {
    const burst = () => {
      glitch.classList.add("is-burst");
      window.setTimeout(() => glitch.classList.remove("is-burst"), 260);
      // Next burst: 2.2s–5.2s
      const next = 2200 + Math.random() * 3000;
      window.setTimeout(burst, next);
    };
    window.setTimeout(burst, 1400 + Math.random() * 1200);
  }

  // Hire form → Formspree (JSON POST, reliable success/error UI)
  const hireForm = $("#my-form");
  if (hireForm) {
    const endpoint = hireForm.getAttribute("data-formspree") || hireForm.getAttribute("action");
    const msgSuccess = $("#form-msg-success", hireForm);
    const msgError = $("#form-msg-error", hireForm);
    const msgErrorText = $("#form-msg-error-text", hireForm);
    const submitBtn = $("#form-submit-btn", hireForm);

    const clearFieldErrors = () => {
      $$("[data-field-error]", hireForm).forEach((el) => {
        el.textContent = "";
        el.hidden = true;
      });
    };

    const hideOverlays = () => {
      if (msgSuccess) {
        msgSuccess.hidden = true;
        msgSuccess.classList.remove("is-visible");
      }
      if (msgError) {
        msgError.hidden = true;
        msgError.classList.remove("is-visible");
      }
    };

    const showSuccess = () => {
      hideOverlays();
      clearFieldErrors();
      if (msgSuccess) {
        msgSuccess.hidden = false;
        msgSuccess.classList.add("is-visible");
      }
      hireForm.reset();
      window.setTimeout(() => {
        if (msgSuccess) {
          msgSuccess.classList.remove("is-visible");
          msgSuccess.hidden = true;
        }
      }, 5200);
    };

    const showError = (text) => {
      hideOverlays();
      if (msgErrorText) msgErrorText.textContent = text || "Something went wrong. Please try again.";
      if (msgError) {
        msgError.hidden = false;
        msgError.classList.add("is-visible");
      }
    };

    const applyFormspreeErrors = (payload) => {
      clearFieldErrors();
      const errors = payload?.errors;
      if (!errors || typeof errors !== "object") return;
      const fieldNodes = $$("[data-field-error]", hireForm);
      for (const [key, val] of Object.entries(errors)) {
        if (!/^[a-z0-9_-]{1,64}$/i.test(key)) continue;
        const el = fieldNodes.find((n) => n.getAttribute("data-field-error") === key);
        if (!el) continue;
        const msg = Array.isArray(val) ? val.join(" ") : String(val);
        el.textContent = msg;
        el.hidden = !msg;
      }
    };

    hireForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!endpoint) return;

      hideOverlays();
      clearFieldErrors();

      const fd = new FormData(hireForm);
      const body = {
        name: String(fd.get("name") || "").trim(),
        email: String(fd.get("email") || "").trim(),
        message: String(fd.get("message") || "").trim()
      };

      if (submitBtn) submitBtn.disabled = true;

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });

        const payload = await res.json().catch(() => ({}));

        if (!res.ok) {
          applyFormspreeErrors(payload);
          const fallback =
            typeof payload?.error === "string"
              ? payload.error
              : "Could not send your message. Check the fields and try again.";
          showError(fallback);
        } else if (payload?.error) {
          applyFormspreeErrors(payload);
          showError(typeof payload.error === "string" ? payload.error : "Could not send your message.");
        } else {
          showSuccess();
        }
      } catch {
        showError("Network error. Check your connection and try again.");
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }
})();

