// YeahDev — i18n Runtime
// Loads translations, applies them to data-i18n elements, persists lang choice

import { translations } from '/i18n/translations.js';

const STORAGE_KEY = 'yd_lang';
const SUPPORTED = ['en', 'fr'];

function getLang() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED.includes(stored)) return stored;
  const browser = navigator.language?.slice(0, 2).toLowerCase();
  return SUPPORTED.includes(browser) ? browser : 'en';
}

function setLang(lang) {
  localStorage.setItem(STORAGE_KEY, lang);
  applyLang(lang);
  updateToggle(lang);
  document.documentElement.lang = lang;
}

function applyLang(lang) {
  const t = translations[lang] || translations.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) {
      if (el.dataset.i18nHtml !== undefined) {
        el.innerHTML = t[key];
      } else {
        el.textContent = t[key];
      }
    }
  });
  // data-i18n-href: swap hrefs for localised article links
  document.querySelectorAll('[data-i18n-href-fr]').forEach(el => {
    el.href = lang === 'fr' ? el.dataset.i18nHrefFr : el.dataset.i18nHrefEn;
  });
}

function updateToggle(lang) {
  document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
    const isActive = btn.dataset.lang === lang;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive);
  });
}

// Init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const lang = getLang();
  applyLang(lang);
  updateToggle(lang);
  document.documentElement.lang = lang;

  // Wire up toggle buttons
  document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
});
