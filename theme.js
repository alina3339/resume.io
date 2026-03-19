/* theme.js — shared across all pages, loaded after InstantClick */

const backgrounds = {
  dark:  'linear-gradient(145deg, #0b1a2e 0%, #030712 100%)',
  light: 'linear-gradient(145deg, #f0f4fa 0%, #e2e8f0 100%)'
};

function setTheme(theme) {
  document.body.style.background = backgrounds[theme];
  document.body.classList.toggle('light-mode', theme === 'light');
  try { localStorage.setItem('theme', theme); } catch (e) {}
}

function initThemeSwitcher() {
  const darkLink  = document.getElementById('theme-dark-footer');
  const lightLink = document.getElementById('theme-light-footer');
  if (!darkLink || !lightLink) return;

  /* Replace nodes to safely remove any stale listeners */
  const newDark  = darkLink.cloneNode(true);
  const newLight = lightLink.cloneNode(true);
  darkLink.parentNode.replaceChild(newDark,  darkLink);
  lightLink.parentNode.replaceChild(newLight, lightLink);

  document.getElementById('theme-dark-footer').addEventListener('click', function (e) {
    e.preventDefault();
    setTheme('dark');
  });
  document.getElementById('theme-light-footer').addEventListener('click', function (e) {
    e.preventDefault();
    setTheme('light');
  });
}

function applyStoredTheme() {
  var saved = 'dark';
  try { saved = localStorage.getItem('theme') || 'dark'; } catch (e) {}
  setTheme(saved);
}

if (typeof InstantClick !== 'undefined') {
  InstantClick.on('change', function () {
    initThemeSwitcher();
    applyStoredTheme();
  });
  InstantClick.init();
} else {
  console.warn('InstantClick not loaded — theme switcher will still work without preloading.');
}

/* Initial page load */
initThemeSwitcher();
applyStoredTheme();
