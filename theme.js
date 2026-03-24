/* theme.js — shared across all pages */

var backgrounds = {
  dark:  'linear-gradient(145deg, #0b1a2e 0%, #030712 100%)',
  light: 'linear-gradient(145deg, #f0f4fa 0%, #e2e8f0 100%)'
};

/* Apply theme to document and persist choice */
function setTheme(theme) {
  document.body.style.background = backgrounds[theme];
  document.body.classList.toggle('light-mode', theme === 'light');
  try { localStorage.setItem('theme', theme); } catch (e) {}
  updateActiveLink(theme);
}

/* Mark the correct switcher link as active */
function updateActiveLink(theme) {
  var darkLink  = document.getElementById('theme-dark-footer');
  var lightLink = document.getElementById('theme-light-footer');
  if (!darkLink || !lightLink) return;

  if (theme === 'dark') {
    darkLink.classList.add('active');
    lightLink.classList.remove('active');
  } else {
    lightLink.classList.add('active');
    darkLink.classList.remove('active');
  }
}

/* Attach click listeners, replacing nodes to clear any stale handlers */
function initThemeSwitcher() {
  var darkLink  = document.getElementById('theme-dark-footer');
  var lightLink = document.getElementById('theme-light-footer');
  if (!darkLink || !lightLink) return;

  var newDark  = darkLink.cloneNode(true);
  var newLight = lightLink.cloneNode(true);
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

/* Read localStorage and apply — called on every page load/navigation */
function applyStoredTheme() {
  var saved = 'dark';
  try { saved = localStorage.getItem('theme') || 'dark'; } catch (e) {}
  setTheme(saved);
}

/* Wire up InstantClick if available, otherwise run directly */
if (typeof InstantClick !== 'undefined') {
  InstantClick.on('change', function () {
    initThemeSwitcher();
    applyStoredTheme();
  });
  InstantClick.init();
} else {
  console.warn('InstantClick not loaded — theme switcher will work without page preloading.');
}

/* Initial page load */
initThemeSwitcher();
applyStoredTheme();
