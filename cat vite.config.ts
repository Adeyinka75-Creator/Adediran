/**
 * ==========================================================================
 * PORTFOLIO CLIENT JAVASCRIPT - ADEDIRAN ADEYINKA
 * Frontend Developer Portfolio
 * Vanilla JavaScript (ES6+) - Accessible, Production-Ready
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- 1. Theme Management (Dark / Light Mode) ---
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themePillLabel = document.getElementById('themePillLabel');
  const floatingThemeToggle = document.getElementById('floatingThemeToggle');
  const floatingThemeIcon = document.getElementById('floatingThemeIcon');
  const floatingThemeText = document.getElementById('floatingThemeText');
  const mobileThemeDarkBtn = document.getElementById('mobileThemeDarkBtn');
  const mobileThemeLightBtn = document.getElementById('mobileThemeLightBtn');

  function applyTheme(theme) {
    const isLight = theme === 'light';

    if (isLight) {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('portfolio-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('portfolio-theme', 'dark');
    }

    // Update Desktop Navbar Pill
    if (themePillLabel) {
      themePillLabel.textContent = isLight ? 'Light' : 'Dark';
    }
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    }

    // Update Floating Quick Toggle Button
    if (floatingThemeIcon) {
      floatingThemeIcon.className = isLight ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    }
    if (floatingThemeText) {
      floatingThemeText.textContent = isLight ? 'Dark Mode' : 'Light Mode';
    }

    // Update Mobile Segmented Control Buttons
    if (mobileThemeDarkBtn && mobileThemeLightBtn) {
      if (isLight) {
        mobileThemeDarkBtn.classList.remove('active');
        mobileThemeLightBtn.classList.add('active');
      } else {
        mobileThemeLightBtn.classList.remove('active');
        mobileThemeDarkBtn.classList.add('active');
      }
    }
  }

  function initTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme');
    const systemPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
      applyTheme('light');
    } else {
      applyTheme('dark');
    }
  }

  // Desktop Navbar Pill click listener
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      applyTheme(isLight ? 'dark' : 'light');
    });
  }

  // Floating Quick Theme Switcher click listener
  if (floatingThemeToggle) {
    floatingThemeToggle.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      applyTheme(isLight ? 'dark' : 'light');
    });
  }

  // Mobile Drawer Segmented Buttons click listeners
  if (mobileThemeDarkBtn) {
    mobileThemeDarkBtn.addEventListener('click', () => applyTheme('dark'));
  }
  if (mobileThemeLightBtn) {
    mobileThemeLightBtn.addEventListener('click', () => applyTheme('light'));
  }

  // Real-time system theme change listener
  try {
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: light)');
    colorSchemeQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem('portfolio-theme')) {
        applyTheme(e.matches ? 'light' : 'dark');
      }
    });
  } catch (err) {}

  initTheme();

  // --- 2. Sticky Navbar & Back-to-Top Button Visibility ---
  const siteHeader = document.getElementById('siteHeader');
  const backToTopBtn = document.getElementById('backToTopBtn');

  function handleScroll() {
    const scrollY = window.scrollY;

    // Header scroll style
    if (siteHeader) {
      if (scrollY > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 500) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'auto';
      } else {
        backToTopBtn.style.opacity = '0.4';
        backToTopBtn.style.pointerEvents = 'auto';
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- 3. Mobile Navigation Drawer ---
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileBackdrop = document.getElementById('mobileNavBackdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav .nav-link');

  function openMobileNav() {
    if (mobileNav && mobileBackdrop) {
      mobileNav.classList.add('open');
      mobileBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (mobileCloseBtn) mobileCloseBtn.focus();
    }
  }

  function closeMobileNav() {
    if (mobileNav && mobileBackdrop) {
      mobileNav.classList.remove('open');
      mobileBackdrop.classList.remove('open');
      document.body.style.overflow = '';
      if (mobileMenuBtn) mobileMenuBtn.focus();
    }
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileNav);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileNav);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileNav);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // --- 4. Active Navigation Indicator on Scroll ---
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-menu .nav-link');

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // --- 5. Project Filtering (All, Web Apps, Landing Pages, UI/UX) ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue || category.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // --- 6. Comprehensive Case Study Modal Data & Handlers ---
  const caseStudiesData = {
    dynasty: {
      title: 'Dynasty Fashion Closet',
      badge: 'E-Commerce & Minimalist Fashion Showcase',
      image: '/images/project-dynasty.jpg',
      liveUrl: 'https://dynasty-fashion-designer.vercel.ap