// ===== MOBILE NAVIGATION =====

const navbarToggle = document.querySelector(".navbar-toggle");
const navbarMenu = document.querySelector(".navbar-menu");
const navbarLinks = document.querySelectorAll(".navbar-menu a");

function closeNavbar() {
  if (!navbarToggle || !navbarMenu) return;

  navbarMenu.classList.remove("is-open");
  navbarToggle.setAttribute("aria-expanded", "false");

  const currentLanguage = localStorage.getItem("apnLanguage") || "en";

  navbarToggle.setAttribute("aria-label", translations[currentLanguage].openNavigation);
}

if (navbarToggle && navbarMenu) {
  navbarToggle.addEventListener("click", () => {
    const isOpen = navbarMenu.classList.toggle("is-open");

    navbarToggle.setAttribute("aria-expanded", isOpen);

    const currentLanguage = localStorage.getItem("apnLanguage") || "en";

    navbarToggle.setAttribute("aria-label", isOpen ? translations[currentLanguage].closeNavigation : translations[currentLanguage].openNavigation);
  });

  navbarLinks.forEach((link) => {
    link.addEventListener("click", closeNavbar);
  });

  document.addEventListener("click", (event) => {
    const clickedInsideMenu = navbarMenu.contains(event.target);
    const clickedToggle = navbarToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      closeNavbar();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNavbar();
    }
  });
}

// ===== LANGUAGE SWITCHER =====

const languageToggle = document.querySelector(".language-toggle");
const languageText = languageToggle?.querySelector("span");
const metaDescription = document.querySelector('meta[name="description"]');

function setLanguage(language) {
  const selectedLanguage = translations[language];

  if (!selectedLanguage) return;

  document.documentElement.lang = language;
  document.title = selectedLanguage.documentTitle;

  if (metaDescription) {
    metaDescription.setAttribute("content", selectedLanguage.metaDescription);
  }

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;

    if (selectedLanguage[key]) {
      element.textContent = selectedLanguage[key];
    }
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const key = element.dataset.i18nAria;

    if (selectedLanguage[key]) {
      element.setAttribute("aria-label", selectedLanguage[key]);
    }
  });

  if (navbarToggle) {
    const isOpen = navbarToggle.getAttribute("aria-expanded") === "true";

    navbarToggle.setAttribute("aria-label", isOpen ? selectedLanguage.closeNavigation : selectedLanguage.openNavigation);
  }

  if (languageToggle && languageText) {
    languageText.textContent = language === "en" ? "ID" : "EN";

    languageToggle.setAttribute("aria-label", selectedLanguage.switchLanguage);
  }

  localStorage.setItem("apnLanguage", language);
}

if (languageToggle) {
  languageToggle.addEventListener("click", () => {
    const currentLanguage = document.documentElement.lang === "id" ? "id" : "en";

    const nextLanguage = currentLanguage === "en" ? "id" : "en";

    setLanguage(nextLanguage);
    closeNavbar();
  });
}

const savedLanguage = localStorage.getItem("apnLanguage") || "en";

setLanguage(savedLanguage);
