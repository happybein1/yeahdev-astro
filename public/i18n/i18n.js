// YeahDev — i18n Runtime v1.6
import { translations } from '/i18n/translations.js';

const STORAGE_KEY = 'yd_lang';
const SUPPORTED = ['en', 'fr'];

function getLang() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED.includes(stored)) return stored;
  const browser = navigator.language?.slice(0, 2).toLowerCase();
  return SUPPORTED.includes(browser) ? browser : 'en';
}

function mergeExtras() {
  // Merge the extra keys appended by translations.js into the main translations object
  if (window.__yd_extra_en) Object.assign(translations.en, window.__yd_extra_en);
  if (window.__yd_extra_fr) Object.assign(translations.fr, window.__yd_extra_fr);
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
    if (t[key] !== undefined) el.textContent = t[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });
}

function updateToggle(lang) {
  document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
    const isActive = btn.dataset.lang === lang;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  mergeExtras();
  const lang = getLang();
  applyLang(lang);
  updateToggle(lang);
  document.documentElement.lang = lang;

  document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
});
