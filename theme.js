/* theme.js — Optimized for CSS Variables */

const THEME_KEY = 'theme';

/**
 * Applies the theme by toggling the class and updating UI
 */
function setTheme(theme) {
  const isLight = theme === 'light';
  
  // 1. Toggle the class on the body (this triggers all our CSS variables)
  document.body.classList.toggle('light-mode', isLight);
  
  // 2. Persist choice
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    console.error("LocalStorage blocked", e);
  }
  
  updateActiveLink(theme);
}

/**
 * UI visual feedback for the switcher links
 */
function updateActiveLink(theme) {
  const darkLink = document.getElementById('theme-dark-footer');
  const lightLink = document.getElementById('theme-light-footer');
  
  if (darkLink && lightLink) {
    darkLink.classList.toggle('active', theme === 'dark');
    lightLink.classList.toggle('active', theme === 'light');
    
    // Accessibility: tell screen readers which one is selected
    darkLink.setAttribute('aria-pressed', theme === 'dark');
    lightLink.setAttribute('aria-pressed', theme === 'light');
  }
}

/**
 * Initialize listeners without cloning nodes
 */
function initThemeSwitcher() {
  const footer = document.querySelector('.theme-switcher-footer');
  if (!footer) return;

  // Event Delegation: Listen once on the parent container
  footer.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    if (link.id === 'theme-dark-footer') {
      e.preventDefault();
      setTheme('dark');
    } else if (link.id === 'theme-light-footer') {
      e.preventDefault();
      setTheme('light');
    }
  });
}

/**
 * Determine and apply the saved theme
 */
function applyStoredTheme() {
  let saved = 'dark';
  try {
    // Bonus: Check system preference if no manual choice is saved
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    saved = localStorage.getItem(THEME_KEY) || (systemPrefersLight ? 'light' : 'dark');
  } catch (e) {}
  
  setTheme(saved);
}

/* --- Execution --- */

// Handle InstantClick or standard load
if (typeof InstantClick !== 'undefined') {
  InstantClick.on('change', () => {
    initThemeSwitcher();
    applyStoredTheme();
  });
} else {
  // Standard load fallback
  document.addEventListener('DOMContentLoaded', () => {
    initThemeSwitcher();
    applyStoredTheme();
  });
}

// Immediate execution to prevent flickering (Optional: place this tiny line in your <head>)
applyStoredTheme();
