// ===== Mobile Navigation =====

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

function closeMobileMenu() {
  navLinks.classList.remove("active");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  menuToggle.textContent = "☰";
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("active");

  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navItems.forEach((item) => {
  item.addEventListener("click", closeMobileMenu);
});

document.addEventListener("click", (event) => {
  const clickedInsideNav = navLinks.contains(event.target);
  const clickedMenuToggle = menuToggle.contains(event.target);

  if (!clickedInsideNav && !clickedMenuToggle) {
    closeMobileMenu();
  }
});

document.addEventListener("keydown", (event) => {
  const isMenuOpen = navLinks.classList.contains("active");

  if (event.key === "Escape" && isMenuOpen) {
    closeMobileMenu();
    menuToggle.focus();
  }
});

// ===== Whatsapp =====
const whatsappProjectLink = document.querySelector("#whatsappProjectLink");

const whatsappMessages = {
  default: {
    en: "Hi, I'm interested in APN Services and would like to discuss my website project.",
    id: "Halo, saya tertarik dengan layanan APN Services dan ingin mendiskusikan kebutuhan website saya.",
  },
  landingPage: {
    en: "Hi, I'm interested in your Landing Page Development service and would like to discuss my project.",
    id: "Halo, saya tertarik dengan layanan Landing Page Development dan ingin mendiskusikan proyek saya.",
  },
  companyProfile: {
    en: "Hi, I'm interested in your Company Profile Website service and would like to discuss my project.",
    id: "Halo, saya tertarik dengan layanan Company Profile Website dan ingin mendiskusikan proyek saya.",
  },
};

function updateWhatsAppLink(language) {
  if (!whatsappProjectLink) return;

  const phoneNumber = "6285694775590";
  const service = whatsappProjectLink.dataset.service || "default";
  const message = encodeURIComponent(whatsappMessages[service][language]);

  whatsappProjectLink.href = `https://wa.me/${phoneNumber}?text=${message}`;
}

// ===== Language Switcher =====

const languageToggle = document.querySelector(".language-toggle");
const languageLabel = document.querySelector(".language-label");

let currentLanguage = localStorage.getItem("language") || "en";

function updateLanguage(language) {
  const elements = document.querySelectorAll("[data-i18n]");

  elements.forEach((element) => {
    const key = element.dataset.i18n;

    if (translations[language][key]) {
      element.textContent = translations[language][key];
    }
  });

  document.documentElement.lang = language;

  languageLabel.textContent = language === "en" ? "ID" : "EN";

  updateWhatsAppLink(language);

  localStorage.setItem("language", language);
}

languageToggle.addEventListener("click", () => {
  currentLanguage = currentLanguage === "en" ? "id" : "en";

  updateLanguage(currentLanguage);
});

updateLanguage(currentLanguage);

// ===== PACKAGE ACCORDION =====

document.addEventListener("DOMContentLoaded", () => {
  const packageCards = document.querySelectorAll(".package-card");
  const tabletBreakpoint = window.matchMedia("(max-width: 900px)");

  function setPackageState() {
    packageCards.forEach((card) => {
      const toggle = card.querySelector(".package-toggle");

      if (!toggle) return;

      const isRecommended = card.classList.contains("package-card-featured");

      if (tabletBreakpoint.matches) {
        if (isRecommended) {
          card.classList.add("is-open");
          toggle.setAttribute("aria-expanded", "true");
          toggle.querySelector("span").textContent = "−";
        } else {
          card.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.querySelector("span").textContent = "＋";
        }
      } else {
        card.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
        toggle.querySelector("span").textContent = "−";
      }
    });
  }

  packageCards.forEach((card) => {
    const toggle = card.querySelector(".package-toggle");

    if (!toggle) return;

    toggle.addEventListener("click", () => {
      if (!tabletBreakpoint.matches) return;

      card.classList.toggle("is-open");

      const isOpen = card.classList.contains("is-open");

      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.querySelector("span").textContent = isOpen ? "−" : "＋";
    });
  });

  setPackageState();

  tabletBreakpoint.addEventListener("change", setPackageState);
});
