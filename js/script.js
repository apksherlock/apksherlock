/* Vanilla JS: i18n (EN/DE/SQ), smooth anchor scroll, contact form */

(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // --- i18n ---
  // English lives in the HTML. Elements opt in with data-i18n (text),
  // data-i18n-placeholder or data-i18n-aria-label; other languages are listed here.
  // `en` only holds strings that never appear in the HTML (form errors set from JS).
  const translations = {
    en: {
      contact_form_error_network: "Network error. Check your connection and try again.",
      contact_form_error_fallback: "Could not send your message. Check the fields and try again.",
      contact_form_error_captcha: "Please complete the security check and try again.",
      contact_error_name: "Please enter your name.",
      contact_error_email: "Please enter a valid email address, e.g. name@company.com.",
      contact_error_message: "Please write a short message.",
      theme_to_light: "Switch to light mode",
      theme_to_dark: "Switch to dark mode"
    },
    de: {
      skip_to_content: "Zum Inhalt springen",
      nav_services: "Leistungen",
      nav_work: "Projekte",
      nav_about: "Über mich",
      nav_contact: "Kontakt",

      hero_headline: "Mobile Apps, App-Sicherheit und Automatisierung für Unternehmen.",
      hero_sub:
        "Seit 9 Jahren entwickle ich Android-Apps, unter anderem Software für die Bildschirme in BMW-Fahrzeugen und eine Gesundheits-App, die Millionen Menschen nutzen.",
      hero_cta: "Projekt anfragen",
      hero_cta2: "Meine Arbeit ansehen",
      hero_status: "Offen für neue Projekte",
      trust_label: "Ich habe an Software gearbeitet für",

      services_title: "Was ich für Sie tun kann",
      services_intro:
        "Nicht sicher, was Sie brauchen? Beschreiben Sie Ihr Problem, und ich sage Ihnen ehrlich, was sinnvoll ist und was nicht.",
      svc_apps_t: "Komplette mobile Apps",
      svc_apps_d:
        "Neue Apps für Android und iPhone, inklusive des Servers dahinter: Benutzerkonten, Daten, Zahlungen, Benachrichtigungen und Admin-Bereiche. Sie haben einen Ansprechpartner für alles, von der einfachen Kunden-App bis zur großen Unternehmenssoftware.",
      svc_maintain_t: "Apps reparieren, pflegen und veröffentlichen",
      svc_maintain_d:
        "Ihre App stürzt ab, ist langsam oder der ursprüngliche Entwickler ist weg? Ich übernehme, behebe die Probleme und halte sie aktuell. Außerdem veröffentliche ich Apps in Google Play und im App Store und kümmere mich um Ablehnungen, Richtlinien-Warnungen und gesperrte Einträge.",
      svc_security_t: "Sicherheitscheck für Apps",
      svc_security_d:
        "Ich schaue mir Ihre Android-App so an, wie es ein Angreifer tun würde, und finde die Schwachstellen, bevor es jemand anderes tut. Ihre Entwickler bekommen einen detaillierten Bericht: was gefährdet ist, wie ernst es ist und wie genau es sich beheben lässt.",
      svc_malware_t: "Ist dieses Handy oder diese App infiziert?",
      svc_malware_d:
        "Sie vermuten, dass ein Android-Handy oder eine App Sie ausspioniert oder sich seltsam verhält? Ob Firmen- oder Privatgerät: Ich prüfe es auf Schadsoftware und sage Ihnen, was ich gefunden habe und was zu tun ist. Nur Android.",
      svc_automation_t: "Automatisierung und KI",
      svc_automation_d:
        "Lassen Sie Software die Routinearbeit erledigen: Chatbots für Telegram oder WhatsApp, KI-Assistenten, die Kundenfragen beantworten, automatische Berichte und Erinnerungen sowie Verbindungen zwischen den Tools, die Sie schon nutzen.",
      svc_web_t: "Websites",
      svc_web_d:
        "Klare, schnelle Websites, die erklären, was Sie anbieten, und es Kunden leicht machen, Kontakt aufzunehmen.",
      svc_partner_t: "Technischer Partner für Gründer",
      svc_partner_d:
        "Ich helfe Ihnen, das Produkt zu planen, die richtige Technologie zu wählen und teure Fehler zu vermeiden, bevor die erste Zeile Code geschrieben wird.",
      svc_training_t: "Schulungen für Entwicklerteams",
      svc_training_d: "Praxisnahes Coaching für Teams, die in Android oder moderne App-Entwicklung einsteigen.",

      work_title: "Ausgewählte Projekte",
      work_intro: "Vieles aus meiner Kundenarbeit unterliegt einer NDA. Hier ist, was ich zeigen kann.",
      tag_cars: "Auto · seit 2022",
      tag_health: "Gesundheit",
      tag_security: "Sicherheit",
      tag_oss: "Open Source",
      tag_albania: "Albanien · 2017–2019",
      work_bmw_t: "Software im Auto für BMW, MINI, Rolls-Royce und Mercedes-Benz",
      work_bmw_d:
        "Über die Agentur Appsfactory arbeite ich seit vier Jahren als Senior Engineer und Teamleiter an der Software für die Bildschirme in neuen Autos. Dazu gehören das Beifahrer-Entertainment und der Theatre Screen im Fond der BMW-Modelle 2026 sowie das Erscheinungsbild der Oberflächen von BMW M, MINI und Rolls-Royce. Davor habe ich mit Mercedes-Benz an einer Gesundheits- und Auto-App gearbeitet.",
      work_bmw_l1: "BMW-Video zum Theatre Screen ↗",
      work_bmw_l2: "Öffentlicher Dank vom BMW-Produktteam ↗",
      work_mysugr_t: "mySugr Diabetes-App",
      work_mysugr_d:
        "Eine App, die Millionen Menschen mit Diabetes in über 80 Ländern nutzen. Ich habe Insulinpumpen per Bluetooth angebunden, sodass jede Dosis automatisch erfasst wird, statt von Hand eingetippt zu werden.",
      work_mallya_t: "Mallya, der smarte Insulinpen",
      work_mallya_d:
        "Ich habe die sichere Verbindung gebaut, die Dosisdaten vom Pen aufs Handy überträgt. Sie ist verschlüsselt, denn medizinische Daten müssen privat bleiben.",
      work_security_t: "Sicherheitsprüfungen für Android-Apps",
      work_security_d:
        "Echte, veröffentlichte Android-Apps auf Schwachstellen wie Datenlecks, unsichere Verbindungen zwischen Apps oder fehlerhafte Verschlüsselung geprüft und den Teams geholfen, sie zu beheben.",
      work_belt_d: "Meine eigene Read-it-later-App, einmal geschrieben und lauffähig auf Android und iPhone.",
      work_albania_t: "Wo alles begann",
      work_albania_d:
        "Apps für albanische Unternehmen: Shëndeti (lokale Krankenhäuser finden), WebFlex (verbindet Läden und Restaurants mit den Marken, die sie verkaufen) und Baboon (Essenslieferung).",

      reviews_title: "Was Kollegen über mich sagen",
      reviews_note: "Empfehlungen von meinem LinkedIn-Profil (im englischen Original).",

      media_title: "Im Fernsehen und auf der Bühne",
      kind_talk: "Vortrag",
      kind_article: "Artikel",
      media_a2: "Interview bei A2 CNN (Albanien) zu Datenschutz, DSGVO und Metas App Threads.",
      media_premium: "Gast in der Morgensendung von Premium Channel (auf Albanisch).",
      media_meetup: "Speaker beim Android Meetup in München (Juni 2024) zu Kotlin Multiplatform.",
      media_gdg: "Speaker bei der Google Developer Group Tirana seit 2019.",
      media_qb: "Fachartikel für QuickBird Studios über Android-Apps mit Kotlin.",
      media_blog: "Auf meinem Blog Dispatcher’s Playground schreibe ich über Android und mobile Sicherheit.",

      about_title: "Über mich",
      about_p1:
        "Ich bin Stavro, Softwareentwickler. Seit 9 Jahren baue ich Android-Apps, von kleinen albanischen Start-ups bis zu den Bildschirmen in BMW-Fahrzeugen. Dabei habe ich Teams geleitet, eng mit Designern und Product Ownern zusammengearbeitet und gesehen, woran Softwareprojekte gelingen oder scheitern.",
      about_p2:
        "Mein Zuhause ist natives Android, aber ich baue das ganze Produkt, also die App und den Server dahinter. Auf ein Werkzeug bin ich dabei nicht festgelegt: Ich wähle, was zu Ihrem Projekt, Ihrem Budget und Ihren Plänen passt. In meiner Freizeit beschäftige ich mich mit mobiler Sicherheit. Deshalb sind die Apps, die ich baue, von Anfang an sicherer.",
      about_p3: "Ich arbeite remote mit Kunden weltweit, auf Englisch, Deutsch oder Albanisch.",

      process_title: "So läuft die Zusammenarbeit",
      step1_t: "Sie erzählen mir, was Sie brauchen",
      step1_d: "Ein paar Sätze im Formular unten genügen. Technisches Wissen ist nicht nötig.",
      step2_t: "Wir sprechen darüber",
      step2_d:
        "Ein kurzes Gespräch, in dem ich Fragen stelle, Optionen vorschlage und ehrlich sage, ob ich der Richtige dafür bin.",
      step3_t: "Sie bekommen einen klaren Plan",
      step3_d: "Was ich baue, wie lange es dauert und was es kostet. Sie bekommen das schriftlich, bevor die Arbeit beginnt.",
      step4_t: "Ich baue, Sie sind dabei",
      step4_d: "Regelmäßige Updates und frühe Versionen zum Ausprobieren, damit es am Ende keine Überraschungen gibt.",

      contact_title: "Erzählen Sie mir von Ihrem Projekt",
      contact_sub:
        "Beschreiben Sie in ein paar Sätzen, was Sie brauchen. Technisches Wissen ist nicht nötig. Ich antworte mit einer ehrlichen Einschätzung, ob und wie ich helfen kann.",
      contact_name_label: "Name",
      contact_name_placeholder: "Ihr Name",
      contact_email_label: "E-Mail",
      contact_email_placeholder: "sie@unternehmen.de",
      contact_message_label: "Nachricht",
      contact_message_placeholder: "Was möchten Sie bauen oder reparieren lassen?",
      contact_send_button: "Nachricht senden",
      contact_form_success: "Danke! Ihre Nachricht wurde verschickt.",
      contact_form_error_generic: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
      contact_form_error_network: "Netzwerkfehler. Bitte Verbindung prüfen und erneut versuchen.",
      contact_form_error_fallback:
        "Ihre Nachricht konnte nicht gesendet werden. Prüfen Sie die Felder und versuchen Sie es erneut.",
      contact_form_error_captcha: "Bitte schließen Sie die Sicherheitsprüfung ab und versuchen Sie es erneut.",
      contact_error_name: "Bitte geben Sie Ihren Namen ein.",
      contact_error_email: "Bitte geben Sie eine gültige E-Mail-Adresse ein, z. B. name@firma.de.",
      contact_error_message: "Bitte schreiben Sie eine kurze Nachricht.",
      theme_to_light: "Zum hellen Modus wechseln",
      theme_to_dark: "Zum dunklen Modus wechseln",
      links_title: "Auch zu finden auf",

      footer_back_to_top: "Nach oben",
      footer_note:
        "Die Arbeit für BMW, MINI, Rolls-Royce und Mercedes-Benz habe ich als Angestellter der Appsfactory GmbH geleistet. Markennamen gehören ihren Inhabern und bedeuten keine Empfehlung."
    },
    sq: {
      skip_to_content: "Kalo te përmbajtja",
      nav_services: "Shërbimet",
      nav_work: "Punët",
      nav_about: "Rreth meje",
      nav_contact: "Kontakt",

      hero_headline: "Aplikacione mobile, siguri aplikacionesh dhe automatizim për biznese.",
      hero_sub:
        "Prej 9 vitesh ndërtoj aplikacione Android, ndër to softuer për ekranet e makinave BMW dhe një aplikacion shëndetësor që e përdorin miliona njerëz.",
      hero_cta: "Më tregoni për projektin tuaj",
      hero_cta2: "Shikoni punën time",
      hero_status: "I disponueshëm për projekte të reja",
      trust_label: "Kam punuar në softuer për",

      services_title: "Çfarë mund të bëj për ju",
      services_intro:
        "Nuk e dini se çfarë ju duhet? Më shpjegoni problemin dhe do t’ju them sinqerisht çfarë ia vlen dhe çfarë jo.",
      svc_apps_t: "Aplikacione mobile të plota",
      svc_apps_d:
        "Aplikacione të reja për Android dhe iPhone, bashkë me serverin që i mban në punë: llogari përdoruesish, të dhëna, pagesa, njoftime dhe panele administrimi. Keni një person të vetëm përgjegjës për gjithçka, qoftë për një aplikacion të thjeshtë për klientët apo për softuer të madh kompanie.",
      svc_maintain_t: "Rregullim, mirëmbajtje dhe publikim aplikacionesh",
      svc_maintain_d:
        "Aplikacioni juaj ka probleme, punon ngadalë, ose zhvilluesi që e bëri nuk është më? E marr përsipër, rregulloj problemet dhe e mbaj të përditësuar. Gjithashtu publikoj aplikacione në Google Play dhe App Store, dhe zgjidh refuzimet, paralajmërimet për rregullat dhe aplikacionet e pezulluara.",
      svc_security_t: "Kontroll sigurie për aplikacione",
      svc_security_d:
        "E shqyrtoj aplikacionin tuaj Android ashtu siç do ta bënte një sulmues dhe gjej pikat e dobëta para se t’i gjejë dikush tjetër. Zhvilluesit tuaj marrin një raport të detajuar: çfarë është në rrezik, sa serioze është dhe si saktësisht rregullohet.",
      svc_malware_t: "A është i infektuar ky telefon apo aplikacion?",
      svc_malware_d:
        "Dyshoni se një telefon apo aplikacion Android ju spiunon ose sillet çuditshëm? Qoftë telefon pune apo personal, e kontrolloj për malware dhe ju them çfarë gjeta dhe çfarë duhet bërë. Vetëm për Android.",
      svc_automation_t: "Automatizim dhe AI",
      svc_automation_d:
        "Lërini punët e përsëritura në dorë të softuerit: chatbot-e për Telegram ose WhatsApp, asistentë AI që u përgjigjen pyetjeve të klientëve, raporte dhe kujtesa automatike, si dhe lidhje mes mjeteve që përdorni tashmë.",
      svc_web_t: "Faqe interneti",
      svc_web_d:
        "Faqe të qarta dhe të shpejta që shpjegojnë çfarë ofroni dhe i bëjnë klientët t’ju kontaktojnë lehtë.",
      svc_partner_t: "Partner teknik për themeluesit",
      svc_partner_d:
        "Ju ndihmoj të planifikoni produktin, të zgjidhni teknologjinë e duhur dhe të shmangni gabime që kushtojnë shtrenjtë, para se të shkruhet qoftë edhe një rresht kodi.",
      svc_training_t: "Trajnime për ekipe zhvilluesish",
      svc_training_d: "Coaching praktik për ekipet që po kalojnë në Android ose në zhvillimin modern të aplikacioneve.",

      work_title: "Punë të përzgjedhura",
      work_intro: "Shumë nga puna ime për klientët është nën NDA, ndaj ja çfarë mund të tregoj.",
      tag_cars: "Makina · që nga 2022",
      tag_health: "Shëndetësi",
      tag_security: "Siguri",
      tag_oss: "Open source",
      tag_albania: "Shqipëri · 2017–2019",
      work_bmw_t: "Softuer në makinë për BMW, MINI, Rolls-Royce dhe Mercedes-Benz",
      work_bmw_d:
        "Përmes agjencisë Appsfactory, prej katër vitesh punoj si inxhinier senior dhe drejtues ekipi për softuerin e ekraneve brenda makinave të reja. Kjo përfshin ekranin e argëtimit për pasagjerin dhe Theatre Screen për ndenjëset e pasme në modelet BMW 2026, si dhe pamjen e ndërfaqeve të BMW M, MINI dhe Rolls-Royce. Më parë kam punuar me Mercedes-Benz për një aplikacion shëndeti dhe makine.",
      work_bmw_l1: "Videoja e BMW për Theatre Screen ↗",
      work_bmw_l2: "Falënderim publik nga ekipi i produktit në BMW ↗",
      work_mysugr_t: "Aplikacioni mySugr për diabetin",
      work_mysugr_d:
        "Një aplikacion që përdoret nga miliona njerëz me diabet në mbi 80 vende. Lidha pompat e insulinës me aplikacionin përmes Bluetooth, që çdo dozë të regjistrohet automatikisht në vend që të shkruhet me dorë.",
      work_mallya_t: "Mallya, stilolapsi inteligjent i insulinës",
      work_mallya_d:
        "Ndërtova lidhjen e sigurt që dërgon të dhënat e dozave nga stilolapsi te telefoni. Të dhënat enkriptohen, sepse informacioni mjekësor duhet të mbetet privat.",
      work_security_t: "Kontrolle sigurie për aplikacione Android",
      work_security_d:
        "Kam kontrolluar aplikacione Android të publikuara për dobësi si rrjedhje të dhënash, lidhje të pasigurta mes aplikacioneve dhe enkriptim të gabuar, dhe i kam ndihmuar ekipet t’i rregullojnë.",
      work_belt_d:
        "Aplikacioni im për të ruajtur artikuj për t’i lexuar më vonë, i shkruar një herë dhe që punon si në Android ashtu edhe në iPhone.",
      work_albania_t: "Ku fillova",
      work_albania_d:
        "Aplikacione për biznese shqiptare: Shëndeti (për të gjetur spitalet lokale), WebFlex (lidh dyqanet dhe restorantet me markat që shesin) dhe Baboon (shpërndarje ushqimi).",

      reviews_title: "Çfarë thonë njerëzit me të cilët kam punuar",
      reviews_note: "Rekomandime nga profili im në LinkedIn (në origjinal në anglisht).",

      media_title: "Në televizion dhe në skenë",
      kind_talk: "Prezantim",
      kind_article: "Artikull",
      media_a2: "Intervistë në A2 CNN për privatësinë e të dhënave, GDPR-në dhe aplikacionin Threads të Meta-s.",
      media_premium: "I ftuar në emisionin e mëngjesit të Premium Channel.",
      media_meetup: "Folës në Android Meetup në Mynih (qershor 2024) për Kotlin Multiplatform.",
      media_gdg: "Folës në Google Developer Group Tirana që nga viti 2019.",
      media_qb: "Artikull për QuickBird Studios mbi ndërtimin e aplikacioneve Android me Kotlin.",
      media_blog: "Shkruaj për Android-in dhe sigurinë mobile në blogun tim, Dispatcher’s Playground.",

      about_title: "Rreth meje",
      about_p1:
        "Jam Stavro, inxhinier softueri. Prej 9 vitesh ndërtoj aplikacione Android, nga start-up të vogla shqiptare deri te ekranet brenda makinave BMW. Gjatë kësaj kohe kam drejtuar ekipe, kam punuar ngushtë me dizajnerë dhe product owner-a, dhe kam parë nga afër pse disa projekte softuerike kanë sukses e të tjera dështojnë.",
      about_p2:
        "Specialiteti im është Android-i nativ, por ndërtoj të gjithë produktin: aplikacionin dhe serverin pas tij. Nuk jam i lidhur pas një mjeti të vetëm. Zgjedh atë që i përshtatet projektit, buxhetit dhe planeve tuaja. Në kohën e lirë merrem me sigurinë e aplikacioneve mobile, prandaj aplikacionet që ndërtoj janë më të sigurta që në fillim.",
      about_p3: "Punoj në distancë me klientë nga e gjithë bota, në anglisht, gjermanisht ose shqip.",

      process_title: "Si funksionon bashkëpunimi",
      step1_t: "Më tregoni çfarë ju duhet",
      step1_d: "Mjaftojnë disa fjali në formularin më poshtë. Nuk nevojiten njohuri teknike.",
      step2_t: "E diskutojmë bashkë",
      step2_d:
        "Një bisedë e shkurtër ku bëj pyetje, propozoj opsione dhe ju them sinqerisht nëse jam personi i duhur.",
      step3_t: "Merrni një plan të qartë",
      step3_d: "Çfarë do të ndërtoj, sa kohë do të zgjasë dhe sa do të kushtojë. Të gjitha me shkrim, para se të fillojë puna.",
      step4_t: "Unë ndërtoj, ju ndiqni ecurinë",
      step4_d: "Përditësime të rregullta dhe versione të hershme për t’i provuar, që të mos ketë surpriza në fund.",

      contact_title: "Më tregoni për projektin tuaj",
      contact_sub:
        "Më shkruani me pak fjalë çfarë ju duhet. Nuk nevojiten njohuri teknike. Do t’ju përgjigjem sinqerisht nëse dhe si mund t’ju ndihmoj.",
      contact_name_label: "Emri",
      contact_name_placeholder: "Emri juaj",
      contact_email_label: "Email",
      contact_email_placeholder: "ju@kompania.al",
      contact_message_label: "Mesazhi",
      contact_message_placeholder: "Çfarë doni të ndërtoni ose të rregulloni?",
      contact_send_button: "Dërgo mesazhin",
      contact_form_success: "Faleminderit! Mesazhi juaj u dërgua.",
      contact_form_error_generic: "Diçka shkoi keq. Ju lutem provoni përsëri.",
      contact_form_error_network: "Gabim në rrjet. Kontrolloni lidhjen dhe provoni përsëri.",
      contact_form_error_fallback: "Mesazhi nuk u dërgua. Kontrolloni fushat dhe provoni përsëri.",
      contact_form_error_captcha: "Ju lutem plotësoni kontrollin e sigurisë dhe provoni përsëri.",
      contact_error_name: "Ju lutem shkruani emrin tuaj.",
      contact_error_email: "Ju lutem shkruani një adresë email të vlefshme, p.sh. emri@kompania.al.",
      contact_error_message: "Ju lutem shkruani një mesazh të shkurtër.",
      theme_to_light: "Kalo në modalitetin e çelët",
      theme_to_dark: "Kalo në modalitetin e errët",
      links_title: "Më gjeni edhe në",

      footer_back_to_top: "Kthehu lart",
      footer_note:
        "Punën për BMW, MINI, Rolls-Royce dhe Mercedes-Benz e kam kryer si punonjës i Appsfactory GmbH. Emrat e markave u përkasin pronarëve të tyre dhe nuk nënkuptojnë mbështetje."
    }
  };

  const LANGS = ["en", "de", "sq"];
  const STORAGE_KEY = "apksherlock-lang";

  // English defaults, read once from the HTML
  const bindings = [
    ["data-i18n", (el, v) => (el.textContent = v), (el) => el.textContent.trim().replace(/\s+/g, " ")],
    ["data-i18n-placeholder", (el, v) => el.setAttribute("placeholder", v), (el) => el.getAttribute("placeholder")],
    ["data-i18n-aria-label", (el, v) => el.setAttribute("aria-label", v), (el) => el.getAttribute("aria-label")]
  ];
  const defaults = {};
  for (const [attr, , read] of bindings) {
    $$(`[${attr}]`).forEach((el) => {
      defaults[el.getAttribute(attr)] ??= read(el);
    });
  }

  const getInitialLang = () => {
    const stored = window.localStorage?.getItem(STORAGE_KEY);
    if (LANGS.includes(stored)) return stored;
    const navLang = (navigator.language || "").toLowerCase().slice(0, 2);
    return LANGS.includes(navLang) ? navLang : "en";
  };

  let currentLang = getInitialLang();

  const t = (key) => translations[currentLang]?.[key] ?? defaults[key] ?? translations.en[key] ?? key;

  const applyTranslations = () => {
    document.documentElement.lang = currentLang;

    $$("[data-lang-switch]").forEach((btn) => {
      const active = btn.getAttribute("data-lang-switch") === currentLang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    for (const [attr, write] of bindings) {
      $$(`[${attr}]`).forEach((el) => write(el, t(el.getAttribute(attr))));
    }
    updateThemeToggle();
  };

  // --- Light / dark theme (initial value is set by the inline script in <head>) ---
  const themeToggle = $("#theme-toggle");
  const themeMeta = $('meta[name="theme-color"]');
  const currentTheme = () => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

  function updateThemeToggle() {
    const theme = currentTheme();
    themeToggle?.setAttribute("aria-label", t(theme === "light" ? "theme_to_dark" : "theme_to_light"));
    themeMeta?.setAttribute("content", theme === "light" ? "#f6f7f4" : "#0b0d0c");
  }

  const systemTheme = () =>
    window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";

  const setTheme = (theme, save) => {
    document.documentElement.dataset.theme = theme;
    try {
      if (save) {
        window.localStorage?.setItem("theme", theme);
        window.localStorage?.setItem("theme-system", systemTheme());
      } else {
        window.localStorage?.removeItem("theme");
        window.localStorage?.removeItem("theme-system");
      }
    } catch {
      // ignore
    }
    updateThemeToggle();
  };

  themeToggle?.addEventListener("click", () => setTheme(currentTheme() === "light" ? "dark" : "light", true));

  // Latest action wins: switching the device theme overrides an earlier toggle click
  window.matchMedia?.("(prefers-color-scheme: light)").addEventListener?.("change", (e) => {
    setTheme(e.matches ? "light" : "dark", false);
  });

  const setLanguage = (lang) => {
    if (!LANGS.includes(lang) || lang === currentLang) return;
    currentLang = lang;
    try {
      window.localStorage?.setItem(STORAGE_KEY, currentLang);
    } catch {
      // ignore
    }
    applyTranslations();
  };

  $$("[data-lang-switch]").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.getAttribute("data-lang-switch")));
  });
  applyTranslations();

  // Footer year
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Smooth scroll for internal links (respects prefers-reduced-motion)
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  $$("a[data-scroll]").forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href") || "";
      const el = href.startsWith("#") && document.getElementById(href.slice(1));
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", href);
    });
  });

  // Contact form → relay (Cloudflare Worker → Telegram); Formspree also works as an endpoint
  const hireForm = $("#my-form");
  if (hireForm) {
    const endpoint = hireForm.getAttribute("data-endpoint") || hireForm.getAttribute("action");
    const sitekey = hireForm.getAttribute("data-turnstile-sitekey");
    const msgSuccess = $("#form-msg-success", hireForm);
    const msgError = $("#form-msg-error", hireForm);
    const msgErrorText = $("#form-msg-error-text", hireForm);
    const submitBtn = $("#form-submit-btn", hireForm);
    const turnstileBox = $(".turnstile", hireForm);

    // Cloudflare Turnstile bot check, only once a site key is configured
    if (sitekey && turnstileBox) {
      window.onTurnstileLoad = () => {
        turnstileBox.hidden = false;
        window.turnstile.render(turnstileBox, { sitekey, theme: currentTheme() });
      };
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad";
      script.async = true;
      document.head.appendChild(script);
    }

    const fieldInput = (key) => hireForm.elements.namedItem(key);

    const clearFieldError = (key) => {
      const el = $(`[data-field-error="${key}"]`, hireForm);
      if (el) {
        el.textContent = "";
        el.hidden = true;
      }
      fieldInput(key)?.removeAttribute("aria-invalid");
    };

    const clearFieldErrors = () => ["name", "email", "message"].forEach(clearFieldError);

    // Shows a message under each invalid field and moves focus to the first one
    const showFieldErrors = (fields) => {
      for (const key of fields) {
        const el = $(`[data-field-error="${key}"]`, hireForm);
        if (!el) continue;
        el.textContent = t(`contact_error_${key}`);
        el.hidden = false;
        fieldInput(key)?.setAttribute("aria-invalid", "true");
      }
      fieldInput(fields[0])?.focus();
    };

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidFields = (body) =>
      [
        !body.name && "name",
        !EMAIL_RE.test(body.email) && "email",
        !body.message && "message"
      ].filter(Boolean);

    // Errors disappear as soon as the visitor fixes the field
    ["name", "email", "message"].forEach((key) => {
      fieldInput(key)?.addEventListener("input", () => clearFieldError(key));
    });

    const hideMessages = () => {
      if (msgSuccess) msgSuccess.hidden = true;
      if (msgError) msgError.hidden = true;
    };

    const showSuccess = () => {
      hideMessages();
      clearFieldErrors();
      if (msgSuccess) msgSuccess.hidden = false;
      hireForm.reset();
      window.setTimeout(() => {
        if (msgSuccess) msgSuccess.hidden = true;
      }, 6000);
    };

    const showError = (text) => {
      hideMessages();
      if (msgErrorText) msgErrorText.textContent = text;
      if (msgError) msgError.hidden = false;
    };

    hireForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!endpoint) return;

      hideMessages();
      clearFieldErrors();

      const fd = new FormData(hireForm);
      const body = {
        name: String(fd.get("name") || "").trim(),
        email: String(fd.get("email") || "").trim(),
        message: String(fd.get("message") || "").trim(),
        _gotcha: String(fd.get("_gotcha") || ""),
        "cf-turnstile-response": String(fd.get("cf-turnstile-response") || "")
      };

      const invalid = invalidFields(body);
      if (invalid.length) {
        showFieldErrors(invalid);
        return;
      }

      if (submitBtn) submitBtn.disabled = true;

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
        const payload = await res.json().catch(() => ({}));

        if (res.ok && payload?.ok !== false && !payload?.error) {
          showSuccess();
        } else if (Array.isArray(payload?.invalid)) {
          showFieldErrors(payload.invalid);
        } else if (payload?.captcha) {
          showError(t("contact_form_error_captcha"));
        } else {
          showError(t("contact_form_error_generic"));
        }
      } catch {
        showError(t("contact_form_error_network"));
      } finally {
        if (submitBtn) submitBtn.disabled = false;
        window.turnstile?.reset();
      }
    });
  }
})();
