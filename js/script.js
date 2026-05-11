/* Minimal vanilla JS: i18n, smooth anchor scroll, reveal on scroll, parallax, glitch bursts */

(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // --- Simple i18n: EN / DE (landing page only, blog stays EN) ---
  const translations = {
    en: {
      skip_to_content: "Skip to content",
      nav_about: "About",
      nav_blog: "Blog",
      nav_work: "Work",
      nav_hire: "Hire",
      hero_subheading: "Android Engineer",
      hero_enter: "Enter",
      hero_read_blog: "Read Blog",
      hero_chip_mode_label: "Mode",
      hero_chip_mode_value: "Android",
      hero_chip_stack_label: "Stack",
      hero_chip_stack_value: "Mobile",
      hero_chip_status_label: "Status",
      hero_chip_status_value: "Open to Hire",
      hero_scroll_hint: "SCROLL",

      about_title: "About Me",
      about_subtitle:
        "Android engineering, integrations, and security—with a straight list of what I can take on below.",
      about_p1:
        "I’m an Android engineer. Most of my work has been shipping production apps and integrations: phones, smart accessories, in-vehicle systems, and third-party services: where complex UI has to hold up in real daily use.",
      about_p2:
        "Today a large share of my time is Android Automotive: infotainment UX, theming, and tooling for a major global OEM. I also run Android app security reviews and document what I learn on my blog.",
      about_p3: "Check below what I concretely offer for you.",
      offer_title: "What I offer",

      offer_mobile_label: "Mobile Apps",
      offer_mobile_value: "Native Android or Multiplatform mobile solutions (Android + iOS)",
      offer_security_label: "Security Audit",
      offer_security_value: "Android app security review, risk notes, and practical fixes",
      offer_coaching_label: "Coaching",
      offer_coaching_value: "Upskill developers and teams transitioning to Android",
      offer_play_label: "Play Store shipping",
      offer_play_value: "Shipping your app to production can be a challenge; I can help you get it live",
      offer_web_label: "Business websites",
      offer_web_value: "Clear, fast sites that explain what you sell and make it easy to get in touch",
      offer_telegram_label: "Telegram bots",
      offer_telegram_value:
        "Lightweight customer channel when a full site isn’t in the budget: bookings, FAQs, menus, and alerts—right inside Telegram",
      offer_nfc_label: "NFC for marketing",
      offer_nfc_value:
        "Tap-to-open campaigns: tags that launch your site, app, or offer—great for events, menus, and retail",
      offer_ai_label: "AI Integration",
      offer_ai_value: "Ship AI features safely: integration, UX, and developer workflow automation",

      blog_title: "Blog",
      blog_subtitle: "Dispatchers, deep dives, and Android notes—from beginner-friendly to very nerdy.",
      blog_browse_btn: "Browse Blog Section",

      work_title: "Selected Work",
      work_subtitle: "Much of my recent work is under NDA. Here are a few public-facing highlights.",
      work_card_mysugr_desc:
        "Integrated Bluetooth-enabled insulin pumps into the app, enabling seamless synchronization of bolus doses with the digital logbook.",
      work_card_mallya_desc:
        "Developed a BLE SDK for insulin pen integration, implementing cryptographic protocols to securely transmit dose data to Android apps.",
      work_card_belt_desc:
        "A Kotlin Multiplatform (KMP) app built as a modern alternative to Mozilla's Pocket, enabling cross-platform bookmarking and article saving.",
      work_card_auto_desc:
        "Tech lead for next-generation infotainment systems, focusing on UX design collaboration, theming tokenization, and UI tooling for premium vehicle brands.",
      work_card_security_desc:
        "Identified and helped patch vulnerabilities in production APKs, including insecure IPC, cryptographic flaws, and improper permission handling.",
      work_card_blog_desc:
        "Technical deep dives: Android patterns, tricky bugs, security curiosities, and lessons from the field.",

      contact_title: "Do you have a project in mind?",
      contact_subtitle:
        "Android apps, security reviews, coaching, business websites, Telegram bots, and NFC campaigns. I’ll answer honestly about fit and scope—no overselling.",
      contact_name_label: "Name",
      contact_name_placeholder: "Your name",
      contact_email_label: "Email",
      contact_email_placeholder: "you@domain.com",
      contact_message_label: "Message",
      contact_message_placeholder: "Write your message...",
      contact_send_button: "Send",
      contact_form_success: "Thanks! Your message has been sent.",
      contact_form_error_generic: "Oops! Something went wrong. Please try again.",
      contact_form_error_network: "Network error. Check your connection and try again.",
      contact_form_error_fallback:
        "Could not send your message. Check the fields and try again.",
      footer_back_to_top: "Back to top"
    },
    de: {
      skip_to_content: "Zum Inhalt springen",
      nav_about: "Über mich",
      nav_blog: "Blog",
      nav_work: "Arbeit",
      nav_hire: "Anfragen",
      hero_subheading: "Android-Entwickler",
      hero_enter: "Eintreten",
      hero_read_blog: "Blog lesen",
      hero_chip_mode_label: "Modus",
      hero_chip_mode_value: "Android",
      hero_chip_stack_label: "Stack",
      hero_chip_stack_value: "Mobile",
      hero_chip_status_label: "Status",
      hero_chip_status_value: "Verfügbar für Projekte",
      hero_scroll_hint: "SCROLLEN",

      about_title: "Über mich",
      about_subtitle:
        "Android-Entwicklung, Integrationen und Sicherheit – mit einer klaren Liste, was ich konkret für Sie übernehmen kann.",
      about_p1:
        "Ich bin Android-Entwickler. Ein Großteil meiner Arbeit liegt in produktiven Apps und Integrationen: Smartphones, smarte Accessoires, In‑Vehicle‑Systeme und Drittanbieter‑Dienste – überall dort, wo komplexe Oberflächen im Alltag zuverlässig funktionieren müssen.",
      about_p2:
        "Aktuell arbeite ich viel an Android Automotive: Infotainment‑UX, Themes und Tooling für einen großen internationalen Automobilhersteller. Zusätzlich führe ich Sicherheitsreviews für Android‑Apps durch und dokumentiere meine Erkenntnisse im Blog.",
      about_p3: "Unten sehen Sie, was ich Ihnen ganz konkret anbiete.",
      offer_title: "Was ich anbiete",

      offer_mobile_label: "Mobile Apps",
      offer_mobile_value:
        "Native Android‑Apps oder Multiplattform‑Lösungen (Android + iOS)",
      offer_security_label: "Security Audit",
      offer_security_value:
        "Sicherheitsprüfung Ihrer Android‑App, Risikobewertung und praxisnahe Empfehlungen",
      offer_coaching_label: "Coaching",
      offer_coaching_value:
        "Weiterbildung für Entwickler:innen und Teams, die in Android einsteigen oder umsteigen",
      offer_play_label: "Play-Store-Launch",
      offer_play_value:
        "Der Weg in den Play Store ist oft holprig – ich begleite Ihre App zuverlässig bis zur Veröffentlichung",
      offer_web_label: "Business-Websites",
      offer_web_value:
        "Schnelle, klare Websites, die Ihr Angebot verständlich machen und Kontaktaufnahmen einfach machen",
      offer_telegram_label: "Telegram-Bots",
      offer_telegram_value:
        "Leichter Kundenkanal, wenn ein kompletter Webauftritt noch zu groß ist: Buchungen, FAQs, Speisekarten und Benachrichtigungen direkt in Telegram",
      offer_nfc_label: "NFC für Marketing",
      offer_nfc_value:
        "Tap‑to‑Open‑Kampagnen: Tags, die Ihre Website, App oder ein Angebot starten – ideal für Events, Speisekarten und den Handel",
      offer_ai_label: "KI-Integration",
      offer_ai_value:
        "Sichere Einführung von KI‑Features: Integration, UX‑Konzept und Automatisierung für Entwickler‑Workflows",

      blog_title: "Blog",
      blog_subtitle:
        "Dispatchers, Deep Dives und Android‑Notizen – von einsteigerfreundlich bis sehr nerdig (auf Englisch).",
      blog_browse_btn: "Blog‑Bereich öffnen",

      work_title: "Ausgewählte Arbeiten",
      work_subtitle:
        "Viele aktuelle Projekte unterliegen einer NDA. Hier einige öffentlich sichtbare Highlights.",
      work_card_mysugr_desc:
        "Bluetooth‑fähige Insulinpumpen in die App integriert, damit Bolus‑Daten nahtlos im digitalen Tagebuch landen.",
      work_card_mallya_desc:
        "Ein BLE‑SDK für Insulinpens entwickelt, inklusive kryptografischer Protokolle zur sicheren Übertragung der Dosen an Android‑Apps.",
      work_card_belt_desc:
        "Eine Kotlin‑Multiplattform‑App als moderne Alternative zu Mozillas Pocket – für plattformübergreifendes Speichern von Artikeln und Links.",
      work_card_auto_desc:
        "Tech Lead für die nächste Generation von Infotainment‑Systemen – mit Fokus auf UX‑Zusammenarbeit, Theme‑Token und UI‑Tooling für Premiummarken.",
      work_card_security_desc:
        "Schwachstellen in produktiven APKs identifiziert und deren Behebung begleitet, u. a. bei unsicherem IPC, Kryptofehlern und fehlerhaften Berechtigungen.",
      work_card_blog_desc:
        "Technische Deep Dives: Android‑Patterns, knifflige Bugs, Security‑Kuriositäten und Erfahrungsberichte aus Projekten.",

      contact_title: "Haben Sie ein Projekt im Kopf?",
      contact_subtitle:
        "Android‑Apps, Sicherheitsreviews, Coaching, Business‑Websites, Telegram‑Bots und NFC‑Kampagnen. Ich gebe Ihnen eine ehrliche Einschätzung zu Passung und Umfang – ohne Verkaufsdruck.",
      contact_name_label: "Name",
      contact_name_placeholder: "Ihr Name",
      contact_email_label: "E‑Mail",
      contact_email_placeholder: "sie@unternehmen.de",
      contact_message_label: "Nachricht",
      contact_message_placeholder: "Ihre Nachricht …",
      contact_send_button: "Senden",
      contact_form_success: "Danke! Ihre Nachricht wurde verschickt.",
      contact_form_error_generic: "Ups! Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
      contact_form_error_network:
        "Netzwerkfehler. Bitte Verbindung prüfen und erneut versuchen.",
      contact_form_error_fallback:
        "Ihre Nachricht konnte nicht gesendet werden. Prüfen Sie die Felder und versuchen Sie es erneut.",
      footer_back_to_top: "Zurück nach oben"
    }
  };

  const getInitialLang = () => {
    const stored = window.localStorage?.getItem("apksherlock-lang");
    if (stored === "de" || stored === "en") return stored;
    const navLang = navigator.language || navigator.userLanguage || "";
    return navLang.toLowerCase().startsWith("de") ? "de" : "en";
  };

  let currentLang = getInitialLang();

  const t = (key) => {
    const langSet = translations[currentLang] || translations.en;
    return langSet[key] ?? translations.en[key] ?? key;
  };

  const setDocumentLang = (lang) => {
    const code = lang === "de" ? "de" : "en";
    document.documentElement.lang = code;
  };

  const updateLangToggles = () => {
    $$("[data-lang-switch]").forEach((btn) => {
      const val = btn.getAttribute("data-lang-switch");
      btn.classList.toggle("is-active", val === currentLang);
      btn.setAttribute("aria-pressed", val === currentLang ? "true" : "false");
    });
  };

  const applyTranslations = () => {
    setDocumentLang(currentLang);
    updateLangToggles();

    const setText = (sel, key, root) => {
      const el = typeof sel === "string" ? $(sel, root) : sel;
      if (!el) return;
      el.textContent = t(key);
    };

    const setAttr = (sel, attr, key, root) => {
      const el = typeof sel === "string" ? $(sel, root) : sel;
      if (!el) return;
      el.setAttribute(attr, t(key));
    };

    // Top-level / hero
    setText("#skip-link", "skip_to_content");
    setText("#nav-about", "nav_about");
    setText("#nav-blog", "nav_blog");
    setText("#nav-work", "nav_work");
    setText("#nav-hire", "nav_hire");

    setText("#hero-subheading", "hero_subheading");
    setText("#hero-enter", "hero_enter");
    setText("#hero-read-blog", "hero_read_blog");

    setText("#chip-mode-label", "hero_chip_mode_label");
    setText("#chip-mode-value", "hero_chip_mode_value");
    setText("#chip-stack-label", "hero_chip_stack_label");
    setText("#chip-stack-value", "hero_chip_stack_value");
    setText("#chip-status-label", "hero_chip_status_label");
    setText("#chip-status-value", "hero_chip_status_value");

    setText("#hero-scroll-hint", "hero_scroll_hint");

    // About / offer
    setText("#about-title", "about_title");
    setText("#about-subtitle", "about_subtitle");
    setText("#about-p1", "about_p1");
    setText("#about-p2", "about_p2");
    setText("#about-p3", "about_p3");
    setText("#offer-title", "offer_title");

    setText("#offer-mobile-label", "offer_mobile_label");
    setText("#offer-mobile-value", "offer_mobile_value");
    setText("#offer-security-label", "offer_security_label");
    setText("#offer-security-value", "offer_security_value");
    setText("#offer-coaching-label", "offer_coaching_label");
    setText("#offer-coaching-value", "offer_coaching_value");
    setText("#offer-play-label", "offer_play_label");
    setText("#offer-play-value", "offer_play_value");
    setText("#offer-web-label", "offer_web_label");
    setText("#offer-web-value", "offer_web_value");
    setText("#offer-telegram-label", "offer_telegram_label");
    setText("#offer-telegram-value", "offer_telegram_value");
    setText("#offer-nfc-label", "offer_nfc_label");
    setText("#offer-nfc-value", "offer_nfc_value");
    setText("#offer-ai-label", "offer_ai_label");
    setText("#offer-ai-value", "offer_ai_value");

    // Blog (only static shell; actual posts stay EN from Hashnode)
    setText("#blog-title", "blog_title");
    setText("#blog-subtitle", "blog_subtitle");
    setText("#blog-browse-btn", "blog_browse_btn");

    // Work
    setText("#work-title", "work_title");
    setText("#work-subtitle", "work_subtitle");
    setText("#work-mysugr-desc", "work_card_mysugr_desc");
    setText("#work-mallya-desc", "work_card_mallya_desc");
    setText("#work-belt-desc", "work_card_belt_desc");
    setText("#work-auto-desc", "work_card_auto_desc");
    setText("#work-security-desc", "work_card_security_desc");
    setText("#work-blog-desc", "work_card_blog_desc");

    // Contact
    setText("#contact-title", "contact_title");
    setText("#contact-subtitle", "contact_subtitle");

    setText("#contact-name-label", "contact_name_label");
    setAttr("#contact-name-input", "placeholder", "contact_name_placeholder");
    setText("#contact-email-label", "contact_email_label");
    setAttr("#contact-email-input", "placeholder", "contact_email_placeholder");
    setText("#contact-message-label", "contact_message_label");
    setAttr("#contact-message-input", "placeholder", "contact_message_placeholder");
    setText("#contact-send-btn-label", "contact_send_button");

    setText("#form-msg-success-text", "contact_form_success");
    setText("#form-msg-error-text", "contact_form_error_generic");

    // Footer
    setText("#footer-back-to-top", "footer_back_to_top");
  };

  const setLanguage = (lang) => {
    const next = lang === "de" ? "de" : "en";
    if (next === currentLang) return;
    currentLang = next;
    try {
      window.localStorage?.setItem("apksherlock-lang", currentLang);
    } catch {
      // ignore
    }
    applyTranslations();
  };

  document.addEventListener("DOMContentLoaded", () => {
    $$("[data-lang-switch]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const val = btn.getAttribute("data-lang-switch");
        if (!val) return;
        setLanguage(val);
      });
    });

    applyTranslations();
  });

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

  // Blog: load latest posts from Hashnode (GraphQL). Always English per blog settings.
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
        // Use i18n-aware message if available
        showError(t("contact_form_error_network"));
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }
})();

