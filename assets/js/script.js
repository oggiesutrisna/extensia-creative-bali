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
        heading: ["'Clash Display'", "sans-serif"],
        body: ["'Plus Jakarta Sans'", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
        "headline-lg": ["'Clash Display'"],
        "label-md": ["'Plus Jakarta Sans'"],
        "headline-xs": ["'Clash Display'"],
        "code-mono": ["'Space Mono'"],
        "body-sm": ["'Plus Jakarta Sans'"],
        "headline-sm": ["'Clash Display'"],
        "display-hero": ["'Clash Display'"],
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

  // --- Active Navigation Link Switcher & Smooth Scroll ---
  const navContainer = document.querySelector("nav[data-active-classes]");
  if (navContainer) {
    const links = navContainer.querySelectorAll("a[data-path]");
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#") && href.length > 1) {
          const targetEl = document.querySelector(href);
          if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: "smooth" });
          }
        } else if (href === "#") {
          e.preventDefault();
        }

        // Reset all links
        links.forEach((l) => {
          l.removeAttribute("aria-current");
          l.classList.remove("bg-[#D4FF00]");
          l.classList.add("bg-[#FFFDF0]");
        });

        // Activate clicked link
        link.setAttribute("aria-current", "page");
        link.classList.remove("bg-[#FFFDF0]");
        link.classList.add("bg-[#D4FF00]");
      });
    });
  }

  // --- Interactive Project Filtering ---
  const filterContainer = document.getElementById("project-filters");
  const projectCards = document.querySelectorAll(".project-card");
  if (filterContainer && projectCards.length > 0) {
    const filterButtons = filterContainer.querySelectorAll(".project-filter-btn");
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const selectedCategory = btn.getAttribute("data-category");

        // Update button states
        filterButtons.forEach((b) => {
          b.classList.remove("bg-[#D4FF00]");
          b.classList.add("bg-[#FFFDF0]");
        });
        btn.classList.remove("bg-[#FFFDF0]");
        btn.classList.add("bg-[#D4FF00]");

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
        localStorage.setItem("zivopos_preferred_lang", lang);
      } catch (e) {}

      if (lang === "en") {
        btnEn.classList.add("bg-[#D4FF00]", "border", "border-[#111118]");
        btnEn.classList.remove("bg-transparent");
        btnId.classList.remove("bg-[#D4FF00]", "border", "border-[#111118]");
        btnId.classList.add("bg-transparent");
      } else {
        btnId.classList.add("bg-[#D4FF00]", "border", "border-[#111118]");
        btnId.classList.remove("bg-transparent");
        btnEn.classList.remove("bg-[#D4FF00]", "border", "border-[#111118]");
        btnEn.classList.add("bg-transparent");
      }
    };

    btnId.addEventListener("click", () => setLanguage("id"));
    btnEn.addEventListener("click", () => setLanguage("en"));

    // Check saved preference
    try {
      const savedLang = localStorage.getItem("extensia_lang") || localStorage.getItem("zivopos_preferred_lang");
      if (savedLang === "en" || savedLang === "id") {
        setLanguage(savedLang);
      }
    } catch (e) {}
  };

  initLanguageSwitcher();
});
