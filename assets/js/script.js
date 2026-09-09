/**
 * Extensia Creative Bali — Main Script & Tailwind Configuration (CDN fallback only)
 * Production uses assets/css/compiled.css. This config is ignored when CDN is removed.
 */

// ==========================================================================
// 1. Tailwind CSS Configuration (guarded for compiled.css production mode)
// ==========================================================================
if (typeof tailwind !== "undefined") {
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "brand-obsidian": "#0F1117",
        "brand-midnight": "#171923",
        "brand-cream": "#FFF9D5",
        "brand-ivory": "#FFFDF5",
        "brand-cream-light": "#FFFDF0",
        "brand-blue": "#2563EB",
        "brand-blue-tech": "#3B82F6",
        "brand-lime": "#D4FF00",
        "brand-orange": "#FF9D50",
        "brand-amber": "#D97706",
        "brand-dark": "#111118",
        "brand-green": "#10B981",
        "brand-emerald": "#059669",
        tertiary: "#006D31",
        "on-surface-variant": "#544338",
        "on-primary-container": "#703700",
        background: "#FFFFFF",
        "on-background": "#111118",
        "secondary-container": "#FFFDF0",
        surface: "#FFF9D5",
        "primary-container": "#D4FF00",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
        heading: ["'Plus Jakarta Sans'", "sans-serif"],
        body: ["'Plus Jakarta Sans'", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
        "headline-lg": ["'Plus Jakarta Sans'"],
        "label-md": ["'Plus Jakarta Sans'"],
        "headline-xs": ["'Plus Jakarta Sans'"],
        "code-mono": ["'Space Mono'"],
        "body-sm": ["'Plus Jakarta Sans'"],
        "headline-sm": ["'Plus Jakarta Sans'"],
        "display-hero": ["'Plus Jakarta Sans'"],
        "body-lg": ["'Plus Jakarta Sans'"],
        "body-md": ["'Plus Jakarta Sans'"],
      },
      boxShadow: {
        "brutal-sm": "3px 3px 0 0 #111118",
        brutal: "5px 5px 0 0 #111118",
        "brutal-lg": "7px 7px 0 0 #111118",
        "brutal-xl": "10px 10px 0 0 #111118",
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "4px",
        md: "6px",
        lg: "8px",
        xl: "12px",
        "2xl": "14px",
      },
    },
  },
};
} // end CDN guard

// ==========================================================================
// 2. Interactive Features
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // --- Live Bali WITA Clock (UTC+8) ---
  const updateBaliTime = () => {
    const timeDisplay = document.getElementById("bali-time");
    if (!timeDisplay) return;

    try {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Makassar",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      timeDisplay.textContent = `BALI TIME (WITA): ${timeStr}`;
    } catch {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      timeDisplay.textContent = `BALI TIME (WITA): ${hours}:${minutes}`;
    }
  };

  updateBaliTime();
  setInterval(updateBaliTime, 10000); // update every 10s

  // --- Shared anchor navigation (desktop, mobile, CTAs, and back to top) ---
  const navContainer = document.querySelector("nav[data-active-classes]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const updateScrollOffset = () => {
    if (!navContainer) return;
    const inset = parseFloat(getComputedStyle(navContainer).top) || 0;
    document.documentElement.style.setProperty(
      "--nav-scroll-offset",
      `${Math.ceil(navContainer.getBoundingClientRect().height + inset + 16)}px`
    );
  };

  updateScrollOffset();
  if (navContainer) {
    if (typeof ResizeObserver !== "undefined") {
      new ResizeObserver(updateScrollOffset).observe(navContainer);
    }
    window.addEventListener("resize", updateScrollOffset, { passive: true });

    const links = navContainer.querySelectorAll("a[data-path]");
    const activeClasses = navContainer.dataset.activeClasses.split(/\s+/);
    const inactiveClasses = Array.from(links).map((link) =>
      Array.from(link.classList).filter((name) =>
        name.startsWith("bg-") && !activeClasses.includes(name)
      )
    );
    const defaultInactive = inactiveClasses.find((classes) => classes.length) || [];
    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        links.forEach((l, index) => {
          l.removeAttribute("aria-current");
          l.classList.remove(...activeClasses);
          l.classList.add(...(inactiveClasses[index].length ? inactiveClasses[index] : defaultInactive));
        });
        link.setAttribute("aria-current", "location");
        link.classList.remove(...defaultInactive);
        link.classList.add(...activeClasses);
      });
    });
  }

  // Delegation runs after the mobile menu's close handler, so layout is final.
  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href^="#"]');
    if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
    const hash = link.getAttribute("href");
    let target;
    try {
      target = hash === "#" ? document.documentElement : document.getElementById(decodeURIComponent(hash.slice(1)));
    } catch {
      return;
    }
    if (!target) return;

    event.preventDefault();
    updateScrollOffset();
    const behavior = reducedMotion.matches ? "instant" : "smooth";
    if (hash === "#") {
      window.scrollTo({ top: 0, behavior });
    } else {
      target.scrollIntoView({ behavior, block: "start" });
    }
    // pushState preserves anchor history without starting a second scroll.
    if (window.location.hash !== hash) window.history.pushState(null, "", hash);
  });

  // --- Interactive Project Filtering ---
  const filterContainer = document.getElementById("project-filters");
  const projectCards = document.querySelectorAll(".project-card");
  if (filterContainer && projectCards.length > 0) {
    const filterButtons = filterContainer.querySelectorAll(".project-filter-btn");
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const selectedCategory = btn.getAttribute("data-category");

        // Update button states with modern cobalt blue active pill
        filterButtons.forEach((b) => {
          b.classList.remove("bg-[#2563EB]", "text-white", "shadow-sm");
          b.classList.add("bg-white", "text-slate-600", "border-slate-200/80");
        });
        btn.classList.remove("bg-white", "text-slate-600", "border-slate-200/80");
        btn.classList.add("bg-[#2563EB]", "text-white", "shadow-sm");

        // Filter cards with smooth opacity transition
        projectCards.forEach((card) => {
          const cardCategory = card.getAttribute("data-category");
          if (selectedCategory === "all" || cardCategory === selectedCategory) {
            card.style.display = "flex";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  // --- Language Switcher (ID / EN) ---
  const initLanguageSwitcher = () => {
    const btnId = document.getElementById("btn-lang-id");
    const btnEn = document.getElementById("btn-lang-en");
    if (!btnId || !btnEn) return;

    const setLanguage = (lang) => {
      document.documentElement.lang = lang;
      try {
        localStorage.setItem("extensia_lang", lang);
        localStorage.setItem("vexapos_preferred_lang", lang);
      } catch (e) {}

      if (lang === "en") {
        btnEn.classList.add("bg-white", "text-slate-900", "shadow-sm");
        btnEn.classList.remove("bg-transparent", "text-slate-600");
        btnId.classList.remove("bg-white", "text-slate-900", "shadow-sm");
        btnId.classList.add("bg-transparent", "text-slate-600");
      } else {
        btnId.classList.add("bg-white", "text-slate-900", "shadow-sm");
        btnId.classList.remove("bg-transparent", "text-slate-600");
        btnEn.classList.remove("bg-white", "text-slate-900", "shadow-sm");
        btnEn.classList.add("bg-transparent", "text-slate-600");
      }
    };

    btnId.addEventListener("click", () => setLanguage("id"));
    btnEn.addEventListener("click", () => setLanguage("en"));

    // Check saved preference
    try {
      const savedLang = localStorage.getItem("extensia_lang") || localStorage.getItem("vexapos_preferred_lang") || localStorage.getItem("zivopos_preferred_lang");
      if (savedLang === "en" || savedLang === "id") {
        setLanguage(savedLang);
      }
    } catch (e) {}
  };

  initLanguageSwitcher();

  // Native radios support Tab and arrow keys, with software as the no-JS default.
  const pricingSwitch = document.querySelector("[data-pricing-switch]");
  if (pricingSwitch) {
    const pricing = pricingSwitch.closest("section");
    const options = pricingSwitch.querySelectorAll('input[name="pricing-mode"]');
    const panels = pricing.querySelectorAll("[data-pricing-panel]");
    const updatePricing = () => {
      const selected = pricingSwitch.querySelector('input[name="pricing-mode"]:checked');
      panels.forEach((panel) => {
        panel.hidden = panel.dataset.pricingPanel !== selected.value;
      });
    };
    options.forEach((option) => option.addEventListener("change", updatePricing));
    updatePricing();
    pricingSwitch.hidden = false;
  }

  // --- vexaPOS: FAQ Accordion (single-open, scoped, additive only) ---
  const initVexaFaq = () => {
    const list = document.getElementById("vexa-faq-list") || document.getElementById("zivo-faq-list");
    const items = list.querySelectorAll(".faq-item");
    if (!items || items.length === 0) return;

    items.forEach((item) => {
      const trigger = item.querySelector(".faq-trigger");
      const panel = item.querySelector(".faq-collapse");
      if (!trigger || !panel) return;

      trigger.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");
        items.forEach((other) => {
          if (other !== item && other.classList.contains("active")) {
            other.classList.remove("active");
            const otherTrigger = other.querySelector(".faq-trigger");
            if (otherTrigger) otherTrigger.setAttribute("aria-expanded", "false");
          }
        });
        item.classList.toggle("active", !isOpen);
        trigger.setAttribute("aria-expanded", String(!isOpen));
      });
    });
  };

  // --- vexaPOS: Hero Bill Self-Verification (math check + auto-correct) ---
  const initVexaBillCalc = () => {
    const bill = document.querySelector("[data-bill]");
    if (!bill) return;

    const subtotalEl = bill.querySelector("[data-bill-subtotal]");
    const serviceEl = bill.querySelector("[data-bill-service]");
    const pb1El = bill.querySelector("[data-bill-pb1]");
    const totalEl = bill.querySelector("[data-bill-total]");
    const statusEl = bill.querySelector("[data-bill-status]");
    if (!subtotalEl || !serviceEl || !pb1El || !totalEl) return;

    const rawSubtotal = Number(bill.getAttribute("data-subtotal"));
    const serviceRate = Number(bill.getAttribute("data-service-rate"));
    const pb1Rate = Number(bill.getAttribute("data-pb1-rate"));
    if (!Number.isFinite(rawSubtotal) || rawSubtotal <= 0) return;
    if (!Number.isFinite(serviceRate) || !Number.isFinite(pb1Rate)) return;

    const fmt = (n) => "Rp" + Math.round(n).toLocaleString("id-ID");

    const service = Math.round(rawSubtotal * serviceRate);
    const pb1 = Math.round((rawSubtotal + service) * pb1Rate);
    const total = rawSubtotal + service + pb1;

    const expected = new Map([
      [subtotalEl, fmt(rawSubtotal)],
      [serviceEl, fmt(service)],
      [pb1El, fmt(pb1)],
      [totalEl, fmt(total)],
    ]);

    let corrected = false;
    expected.forEach((value, el) => {
      if (el.textContent.trim() !== value) {
        el.textContent = value;
        corrected = true;
      }
    });

    // Cross-check: sum of line-item data-price must equal subtotal.
    const lines = bill.querySelectorAll("[data-price]");
    let lineSum = 0;
    let linesOk = true;
    if (lines.length > 0) {
      lines.forEach((li) => {
        const p = Number(li.getAttribute("data-price"));
        if (!Number.isFinite(p) || p < 0) {
          linesOk = false;
          return;
        }
        lineSum += p;
      });
      if (linesOk && lineSum !== rawSubtotal) linesOk = false;
    }

    if (statusEl) {
      const lang = document.documentElement.lang === "en" ? "en" : "id";
      if (!linesOk) {
        statusEl.textContent =
          lang === "en"
            ? "Line items do not match the subtotal — check data-price values."
            : "Item baris tidak cocok dengan subtotal — periksa nilai data-price.";
      } else if (corrected) {
        statusEl.textContent =
          lang === "en"
            ? "Calculation auto-corrected to match bill math."
            : "Kalkulasi dikoreksi otomatis agar sesuai matematika struk.";
      } else {
        statusEl.textContent =
          lang === "en"
            ? "Calculation auto-verified: 200,000 + 20,000 + 22,000 = 242,000."
            : "Kalkulasi terverifikasi otomatis: 200.000 + 20.000 + 22.000 = 242.000.";
      }
    }
  };

  // --- vexaPOS: Mobile Nav Toggle (additive only) ---
  const initVexaMobileNav = () => {
    const toggle = document.getElementById("nav-toggle");
    const menu = document.getElementById("mobile-menu");
    if (!toggle || !menu) return;
    const iconOpen = document.getElementById("nav-toggle-icon-open");
    const iconClose = document.getElementById("nav-toggle-icon-close");

    const setOpen = (open) => {
      menu.classList.toggle("hidden", !open);
      menu.classList.toggle("flex", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute(
        "aria-label",
        open ? "Tutup menu navigasi" : "Buka menu navigasi"
      );
      if (iconOpen) iconOpen.classList.toggle("hidden", open);
      if (iconClose) iconClose.classList.toggle("hidden", !open);
    };

    toggle.addEventListener("click", () => {
      setOpen(menu.classList.contains("hidden"));
    });

    menu.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });

    // Mobile language shortcuts reuse the primary switcher buttons.
    menu.querySelectorAll("[data-lang-mobile]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = btn.getAttribute("data-lang-mobile");
        const target =
          lang === "en"
            ? document.getElementById("btn-lang-en")
            : document.getElementById("btn-lang-id");
        if (target) target.click();
      });
    });
  };

  initVexaFaq();
  initVexaBillCalc();
  initVexaMobileNav();
});
