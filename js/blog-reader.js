/* Hashnode-backed reader: list + full post from gql.hashnode.com */

(() => {
  const BLOG_HOST = "dispatchersdotplayground.hashnode.dev";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const yearEl = $("#reader-year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const listEl = $("#reader-post-list");
  const listStatus = $("#reader-list-status");
  const loadMoreBtn = $("#reader-load-more");
  const articleRoot = $("#article-root");
  const articleEmpty = $("#reader-empty");
  const articleLoading = $("#reader-loading");
  const articleError = $("#reader-error");
  const toolbar = $("#reader-toolbar");
  const hashnodeLink = $("#reader-hashnode-link");
  const searchInput = $("#reader-search");
  const searchClear = $("#reader-search-clear");
  const drawerBackdrop = $("#reader-drawer-backdrop");
  const menuToggle = $("#reader-menu-toggle");
  const mqDrawer = window.matchMedia("(max-width: 900px)");

  let listCursor = null;
  let listHasNext = false;
  let listLoading = false;

  const gql = async (query, variables) => {
    const res = await fetch("https://gql.hashnode.com", {
      method: "POST",
      headers: { "content-type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ query, variables })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join("; "));
    return json.data;
  };

  const postUrlOnHost = (slug) => {
    const path = String(slug || "")
      .replace(/^\/+/, "")
      .split("/")
      .filter(Boolean)
      .map((seg) => encodeURIComponent(seg))
      .join("/");
    return path ? `https://${BLOG_HOST}/${path}` : `https://${BLOG_HOST}/`;
  };

  const slugFromHash = () => {
    const raw = (location.hash || "").replace(/^#/, "").trim();
    if (!raw) return "";
    try {
      return decodeURIComponent(raw);
    } catch {
      return raw;
    }
  };

  const setListStatus = (t) => {
    if (listStatus) listStatus.textContent = t;
  };

  const refreshListStatusCounts = () => {
    if (!listEl) return;
    const items = $$(":scope > li", listEl);
    const total = items.length;
    if (!total) {
      setListStatus("No posts in list.");
      return;
    }
    const q = (searchInput?.value || "").trim().toLowerCase();
    const visible = items.filter((li) => !li.hidden).length;
    if (!q) {
      setListStatus(`${total} post${total === 1 ? "" : "s"} loaded`);
      return;
    }
    if (!visible) setListStatus("No matches — try different words");
    else setListStatus(`${visible} of ${total} match your search`);
  };

  const applySearchFilter = () => {
    if (!listEl) return;
    const q = (searchInput?.value || "").trim().toLowerCase();
    $$(":scope > li", listEl).forEach((li) => {
      const hay = li.dataset.search || "";
      li.hidden = Boolean(q) && !hay.includes(q);
    });
    if (searchClear) searchClear.hidden = !q;
    refreshListStatusCounts();
  };

  const setActiveInList = (slug) => {
    $$(".blog-reader__list a", listEl || document).forEach((a) => {
      const li = a.closest("li");
      if (!li) return;
      li.classList.toggle("is-active", a.dataset.slug === slug);
    });
  };

  const appendPostsToList = (posts) => {
    if (!listEl) return;
    const frag = document.createDocumentFragment();
    for (const p of posts) {
      const slug = p.slug || "";
      if (!slug) continue;
      const li = document.createElement("li");
      li.className = "blog-reader__item";
      const titleText = p.title || "Untitled";
      li.dataset.search = `${String(titleText).toLowerCase()} ${slug.toLowerCase()}`.replace(/\s+/g, " ");
      const a = document.createElement("a");
      a.className = "blog-reader__itemLink";
      a.href = `./blog.html#${encodeURIComponent(slug)}`;
      a.dataset.slug = slug;
      const title = document.createElement("span");
      title.className = "blog-reader__itemTitle";
      title.textContent = titleText;
      const date = document.createElement("span");
      date.className = "blog-reader__itemDate mono";
      const d = p.publishedAt ? new Date(p.publishedAt) : null;
      date.textContent =
        d && !Number.isNaN(d.getTime())
          ? d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" })
          : "";
      a.append(title, date);
      a.addEventListener("click", () => {
        window.setTimeout(() => setActiveInList(slug), 0);
      });
      li.append(a);
      frag.append(li);
    }
    listEl.append(frag);
  };

  const loadPostPage = async (after) => {
    const data = await gql(
      `
      query ReaderPosts($host: String!, $first: Int!, $after: String) {
        publication(host: $host) {
          posts(first: $first, after: $after) {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                title
                slug
                publishedAt
              }
            }
          }
        }
      }
    `,
      { host: BLOG_HOST, first: 15, after: after || null }
    );

    const conn = data?.publication?.posts;
    const edges = conn?.edges ?? [];
    const posts = edges.map((e) => e?.node).filter(Boolean);
    listHasNext = Boolean(conn?.pageInfo?.hasNextPage);
    listCursor = conn?.pageInfo?.endCursor ?? null;
    return posts;
  };

  const loadInitialList = async () => {
    if (!listEl) return;
    listLoading = true;
    setListStatus("Loading posts…");
    loadMoreBtn.hidden = true;
    try {
      listEl.innerHTML = "";
      const first = await loadPostPage(null);
      appendPostsToList(first);
      if (!first.length) setListStatus("No posts found.");
      else applySearchFilter();
      loadMoreBtn.hidden = !listHasNext;
    } catch (e) {
      setListStatus("Could not load the post list.");
      console.error(e);
    } finally {
      listLoading = false;
    }
  };

  if (searchInput) {
    searchInput.addEventListener("input", () => applySearchFilter());
    searchInput.addEventListener("search", () => applySearchFilter());
  }
  if (searchClear) {
    searchClear.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      applySearchFilter();
      searchInput?.focus();
    });
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", async () => {
      if (listLoading || !listHasNext) return;
      listLoading = true;
      loadMoreBtn.disabled = true;
      try {
        const next = await loadPostPage(listCursor);
        appendPostsToList(next);
        applySearchFilter();
        loadMoreBtn.hidden = !listHasNext;
      } catch (e) {
        setListStatus("Could not load more posts.");
        console.error(e);
      } finally {
        loadMoreBtn.disabled = false;
        listLoading = false;
      }
    });
  }

  const wrapProseTables = (root) => {
    if (!root?.querySelectorAll) return;
    root.querySelectorAll("table").forEach((table) => {
      if (table.closest(".blog-prose__tableWrap")) return;
      const tw = document.createElement("div");
      tw.className = "blog-prose__tableWrap";
      table.parentNode.insertBefore(tw, table);
      tw.appendChild(table);
    });
  };

  const renderMarkdown = (markdown) => {
    const md = typeof markdown === "string" ? markdown : "";
    if (typeof marked === "undefined" || typeof DOMPurify === "undefined") {
      const pre = document.createElement("pre");
      pre.className = "mono";
      pre.textContent = md || "(No content)";
      return pre;
    }
    const rawHtml = marked.parse(md, { headerIds: true });
    const clean = DOMPurify.sanitize(rawHtml, {
      USE_PROFILES: { html: true },
      ADD_ATTR: ["target", "rel"]
    });
    const wrap = document.createElement("div");
    wrap.innerHTML = clean;
    wrap.querySelectorAll("a[href]").forEach((a) => {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noreferrer noopener");
    });
    return wrap;
  };

  const showArticleShell = (mode) => {
    articleEmpty.hidden = mode !== "empty";
    articleLoading.hidden = mode !== "loading";
    articleError.hidden = mode !== "error";
    articleRoot.hidden = mode !== "article";
    toolbar.hidden = mode !== "article";
  };

  const loadArticle = async (slug) => {
    if (!slug) {
      showArticleShell("empty");
      articleError.textContent = "";
      articleRoot.innerHTML = "";
      if (hashnodeLink) hashnodeLink.href = `https://${BLOG_HOST}/`;
      setActiveInList("");
      return;
    }

    showArticleShell("loading");
    articleError.textContent = "";
    articleRoot.innerHTML = "";
    setActiveInList(slug);

    try {
      const data = await gql(
        `
        query ReaderPost($host: String!, $slug: String!) {
          publication(host: $host) {
            post(slug: $slug) {
              title
              slug
              publishedAt
              content {
                markdown
                html
              }
            }
          }
        }
      `,
        { host: BLOG_HOST, slug }
      );

      const post = data?.publication?.post;
      if (!post) throw new Error("Post not found.");

      const url = postUrlOnHost(post.slug || slug);
      if (hashnodeLink) {
        hashnodeLink.href = url;
        hashnodeLink.textContent = "View on Hashnode";
      }

      const md = post.content?.markdown;
      const html = post.content?.html;
      let bodyNode;
      if (md && String(md).trim()) {
        bodyNode = renderMarkdown(md);
      } else if (html && String(html).trim()) {
        const clean = DOMPurify.sanitize(html, {
          USE_PROFILES: { html: true },
          ADD_ATTR: ["target", "rel"]
        });
        const wrap = document.createElement("div");
        wrap.innerHTML = clean;
        wrap.querySelectorAll("a[href]").forEach((a) => {
          a.setAttribute("target", "_blank");
          a.setAttribute("rel", "noreferrer noopener");
        });
        bodyNode = wrap;
      } else {
        bodyNode = document.createElement("p");
        bodyNode.className = "mono";
        bodyNode.textContent = "This post has no readable body in the API response.";
      }

      articleRoot.innerHTML = "";
      const header = document.createElement("header");
      header.className = "blog-prose__header";
      const h1 = document.createElement("h1");
      h1.className = "blog-prose__title";
      h1.textContent = post.title || "Untitled";
      header.append(h1);
      const meta = document.createElement("p");
      meta.className = "blog-prose__meta mono";
      const pub = post.publishedAt ? new Date(post.publishedAt) : null;
      const bits = [];
      if (pub && !Number.isNaN(pub.getTime())) {
        bits.push(
          pub.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })
        );
      }
      meta.textContent = bits.join(" · ");
      if (bits.length) header.append(meta);

      wrapProseTables(bodyNode);
      articleRoot.append(header, bodyNode);
      document.title = `${post.title || "Post"} — Reader · apksherlock`;
      showArticleShell("article");
    } catch (e) {
      articleError.textContent = e?.message || "Could not load this post.";
      showArticleShell("error");
      document.title = "Reader — apksherlock";
    }
  };

  const setDrawerOpen = (open) => {
    if (!mqDrawer.matches) {
      document.body.classList.remove("is-drawer-open");
      if (drawerBackdrop) {
        drawerBackdrop.setAttribute("aria-hidden", "true");
      }
      if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open post list");
      }
      return;
    }
    document.body.classList.toggle("is-drawer-open", open);
    if (drawerBackdrop) {
      drawerBackdrop.setAttribute("aria-hidden", open ? "false" : "true");
    }
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
      menuToggle.setAttribute("aria-label", open ? "Close post list" : "Open post list");
    }
  };

  const onRoute = () => {
    const slug = slugFromHash();
    setDrawerOpen(false);
    loadArticle(slug);
  };

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const next = !document.body.classList.contains("is-drawer-open");
      setDrawerOpen(next);
    });
  }
  if (drawerBackdrop) {
    drawerBackdrop.addEventListener("click", () => setDrawerOpen(false));
  }
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setDrawerOpen(false);
  });
  const onMqDrawerChange = () => setDrawerOpen(false);
  if (mqDrawer.addEventListener) mqDrawer.addEventListener("change", onMqDrawerChange);
  else if (mqDrawer.addListener) mqDrawer.addListener(onMqDrawerChange);
  if (listEl) {
    listEl.addEventListener("click", (e) => {
      if (!mqDrawer.matches) return;
      const a = e.target.closest("a");
      if (a && listEl.contains(a)) setDrawerOpen(false);
    });
  }

  window.addEventListener("hashchange", onRoute);

  const readerHeader = document.querySelector(".site-header--reader");
  const syncReaderHeaderHeight = () => {
    if (!readerHeader) return;
    const h = readerHeader.offsetHeight;
    document.body.style.setProperty("--reader-header-h", `${h}px`);
  };
  syncReaderHeaderHeight();
  window.addEventListener("resize", syncReaderHeaderHeight);
  if (window.ResizeObserver && readerHeader) {
    const ro = new ResizeObserver(syncReaderHeaderHeight);
    ro.observe(readerHeader);
  }

  onRoute();
  loadInitialList();
})();
