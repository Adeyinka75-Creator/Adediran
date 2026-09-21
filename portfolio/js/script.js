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
      image: 'images/project-dynasty.jpg',
      liveUrl: 'https://dynasty-fashion-designer.vercel.app/',
      githubUrl: 'https://github.com/Adeyinka75-Creator/dynasty-fashion-designer',
      role: 'Frontend Developer & UI Designer',
      timeline: '2 Weeks • Personal & Client Brand Concept',
      technologies: ['HTML5', 'CSS3 Flexbox/Grid', 'Vanilla JavaScript', 'Responsive Media Queries', 'CSS Custom Properties'],
      overview: 'Dynasty Fashion Closet is a high-fashion, editorial digital showcase built for a bespoke fashion atelier. The project focuses on translating haute couture simplicity, minimalist aesthetics, and effortless garment exploration into a responsive web interface.',
      problem: 'Fashion brands frequently suffer from slow, bloated e-commerce templates that distract from garment photography and load sluggishly on mobile devices. The objective was to design a clean, responsive site with lightning-fast load times and editorial visual rhythm.',
      features: [
        'Curated seasonal collections showcase with interactive category filtering',
        'High-resolution responsive product cards with hover micro-interactions',
        'Mobile-first responsive drawer menu and smooth navigation flow',
        'Clean, accessible color palette highlighting garment textures and details',
        'Sub-1.2s First Contentful Paint without third-party frameworks'
      ],
      challenges: 'Creating an editorial, magazine-style layout that fluidly adjusts across smartphones (360px) to ultra-wide displays without awkward text wrapping or broken aspect ratios. Solved using CSS aspect-ratio and responsive clamp() calculations.',
      learnings: 'Mastered mathematical typography scaling, advanced responsive image strategies, and organizing modular CSS without relying on heavy styling frameworks.'
    },
    bank: {
      title: 'Digital Bank Landing Page',
      badge: 'Fintech Landing Page & Interactive Dashboard',
      image: 'images/project-bank.jpg',
      liveUrl: 'https://digital-landing-page-two.vercel.app/',
      githubUrl: 'https://github.com/Adeyinka75-Creator/digital-bank-landing',
      role: 'Frontend Developer',
      timeline: '10 Days • Fintech Web Showcase',
      technologies: ['HTML5 Semantic Markup', 'Modern CSS3 Variables', 'Vanilla JavaScript (ES6+)', 'IntersectionObserver API'],
      overview: 'A conversion-focused landing page and interactive portal preview for a modern digital bank. Built to showcase user accounts, real-time spending insights, multi-tier savings plans, and zero-fee global transfers.',
      problem: 'Fintech platforms require an immediate sense of trust, institutional security, and effortless visual hierarchy. Cluttered interfaces lower conversion rates for new account sign-ups.',
      features: [
        'Interactive credit card preview with real-time gradient tilt and chip detailing',
        'Weekly cash flow sparkline visualizer and dynamic recent transfer stream',
        'Feature comparison cards with high-contrast accessibility compliance',
        'Mobile-friendly account tier comparison matrix',
        'Fast page performance and full keyboard navigation support'
      ],
      challenges: 'Aligning complex visual elements (interactive card, statistical graphs, and multi-tier pricing) while preventing horizontal overflow on smaller screens. Addressed by crafting strict responsive grid templates and container queries.',
      learnings: 'Deepened knowledge of semantic HTML structure, CSS custom properties for theming, and designing for user trust and financial clarity.'
    },
    gadgetsorb: {
      title: 'Gadgetsorb — Device Repair & Accessories',
      badge: 'Electronics Repair Services & E-Store',
      image: 'images/project-gadgetsorb.svg',
      liveUrl: 'https://gadgetsorb-showcase.vercel.app/',
      githubUrl: 'https://github.com/Adeyinka75-Creator/gadgetsorb',
      role: 'Frontend Developer & UI Prototyper',
      timeline: '2 Weeks • Client Web Prototype',
      technologies: ['HTML5', 'CSS3', 'Vanilla JavaScript', 'LocalStorage API', 'Client-side Validation'],
      overview: 'A full-featured landing page and quote generator for an iPhone and gadget repair specialist. Customers can browse common repair solutions (OLED replacement, battery swaps, camera repair) and discover authentic accessories.',
      problem: 'Repair shops often lose customers who cannot easily find transparent service pricing or have trouble requesting a quote quickly from their phone.',
      features: [
        'Interactive device selector (iPhone models, iPads, Android flagships)',
        'Transparent service pricing matrix with estimated turnaround times',
        'Quick quote booking modal with client-side form validation',
        'Accessories catalog showcasing chargers, MagSafe cases, and screen protectors',
        'Sticky mobile call-to-action for immediate walk-in inquiries'
      ],
      challenges: 'Handling dynamic service cost calculations in pure vanilla JavaScript without introducing state synchronization bugs or unnecessary page reloads.',
      learnings: 'Strengthened DOM event delegation patterns, accessible form validation states, and structuring clean reusable JavaScript modules.'
    },
    calculator: {
      title: 'Interactive Calculator & Currency Converter',
      badge: 'Web Utility & Arithmetic State Machine',
      image: 'images/project-calculator.svg',
      liveUrl: 'https://adeyinka-calculator.vercel.app/',
      githubUrl: 'https://github.com/Adeyinka75-Creator/calculator-app',
      role: 'Frontend Developer',
      timeline: '1 Week • JavaScript Architecture Focus',
      technologies: ['HTML5', 'CSS Grid', 'Vanilla JavaScript', 'Keyboard Event Listeners', 'LocalStorage'],
      overview: 'A modern, precision web calculator and currency conversion utility designed with mathematical precedence parsing, audit history tape, and ergonomic keyboard shortcuts.',
      problem: 'Standard web calculator tutorials frequently fail when handling decimal precision, operator chaining, backspace edits, or keyboard input integration.',
      features: [
        'Complete keyboard support (NumPad, numbers, operators, Enter to evaluate, Escape to clear)',
        'Floating-point precision handling avoiding standard JS rounding pitfalls',
        'Calculation history tape with one-click recall of previous answers',
        'Quick exchange rate preview with support for USD, EUR, GBP, and NGN',
        'Tactile visual active states and responsive CSS Grid keypad'
      ],
      challenges: 'Managing edge-case arithmetic sequences (consecutive operator taps, divide-by-zero, leading decimals) without causing script crashes. Implemented a finite state machine pattern.',
      learnings: 'Mastered JavaScript keyboard event handling, string expression tokenization, and strict input sanitization.'
    }
  };

  const caseStudyModal = document.getElementById('caseStudyModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const openCaseStudyBtns = document.querySelectorAll('[data-case-study]');

  function openModal(projectId) {
    const data = caseStudiesData[projectId];
    if (!data || !caseStudyModal) return;

    document.getElementById('modalProjectBadge').textContent = data.badge;
    document.getElementById('modalProjectTitle').textContent = data.title;
    document.getElementById('modalProjectImage').src = data.image;
    document.getElementById('modalProjectImage').alt = data.title + ' preview';
    document.getElementById('modalProjectRole').textContent = data.role;
    document.getElementById('modalProjectTimeline').textContent = data.timeline;
    document.getElementById('modalProjectOverview').textContent = data.overview;
    document.getElementById('modalProjectProblem').textContent = data.problem;
    document.getElementById('modalProjectChallenges').textContent = data.challenges;
    document.getElementById('modalProjectLearnings').textContent = data.learnings;

    // Tech Stack List
    const techContainer = document.getElementById('modalProjectTech');
    techContainer.innerHTML = '';
    data.technologies.forEach(tech => {
      const span = document.createElement('span');
      span.className = 'tech-tag';
      span.textContent = tech;
      techContainer.appendChild(span);
    });

    // Key Features List
    const featuresContainer = document.getElementById('modalProjectFeatures');
    featuresContainer.innerHTML = '';
    data.features.forEach(feat => {
      const li = document.createElement('li');
      li.innerHTML = `<i class="fa-solid fa-check"></i> <span>${feat}</span>`;
      featuresContainer.appendChild(li);
    });

    // Action links
    const liveLink = document.getElementById('modalLiveLink');
    const githubLink = document.getElementById('modalGithubLink');
    liveLink.href = data.liveUrl;
    githubLink.href = data.githubUrl;

    caseStudyModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (modalCloseBtn) modalCloseBtn.focus();
  }

  function closeModal() {
    if (caseStudyModal) {
      caseStudyModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  openCaseStudyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-case-study');
      openModal(projectId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  if (caseStudyModal) {
    caseStudyModal.addEventListener('click', (e) => {
      if (e.target === caseStudyModal) {
        closeModal();
      }
    });
  }

  // Keyboard accessibility (Escape to close any modal / mobile nav)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeMobileNav();
    }
  });

  // --- 7. Contact Form Client-side Validation & Mailto Fallback ---
  const contactForm = document.getElementById('portfolioContactForm');
  const formFeedback = document.getElementById('formFeedbackAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const messageInput = document.getElementById('contactMessage');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        showFieldError(nameInput, 'Please enter your name (at least 2 characters).');
        isValid = false;
      } else {
        clearFieldError(nameInput);
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        showFieldError(emailInput, 'Please enter a valid email address.');
        isValid = false;
      } else {
        clearFieldError(emailInput);
      }

      // Validate Message
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        showFieldError(messageInput, 'Please write a message with at least 10 characters.');
        isValid = false;
      } else {
        clearFieldError(messageInput);
      }

      if (isValid) {
        const name = encodeURIComponent(nameInput.value.trim());
        const email = encodeURIComponent(emailInput.value.trim());
        const message = encodeURIComponent(messageInput.value.trim());

        const recipient = 'adediranadeyinkaabdulquyum@gmail.com';
        const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(`Portfolio Inquiry from ${nameInput.value.trim()}`)}&body=${encodeURIComponent(`Hi Adeyinka,\n\nName: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${messageInput.value.trim()}\n`)}`;

        if (formFeedback) {
          formFeedback.className = 'form-feedback-alert success';
          formFeedback.innerHTML = `
            <strong><i class="fa-solid fa-circle-check"></i> Message Prepared!</strong>
            <p style="margin-top: 6px; font-size: 0.875rem;">Opening your email client to send directly to <strong>${recipient}</strong>. You can also click the button below:</p>
            <a href="${mailtoUrl}" class="btn btn-primary btn-sm" style="margin-top: 10px; display: inline-flex;">Send via Email App</a>
          `;
        }

        // Trigger mailto client
        setTimeout(() => {
          window.location.href = mailtoUrl;
        }, 500);

        contactForm.reset();
      }
    });
  }

  function showFieldError(inputElement, message) {
    inputElement.classList.add('error');
    const errorSpan = inputElement.parentElement.querySelector('.field-error-msg');
    if (errorSpan) {
      errorSpan.textContent = message;
      errorSpan.classList.add('visible');
    }
  }

  function clearFieldError(inputElement) {
    inputElement.classList.remove('error');
    const errorSpan = inputElement.parentElement.querySelector('.field-error-msg');
    if (errorSpan) {
      errorSpan.textContent = '';
      errorSpan.classList.remove('visible');
    }
  }

  // --- 8. Copy Email to Clipboard ---
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'adediranadeyinkaabdulquyum@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalText = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        copyEmailBtn.style.borderColor = 'var(--success)';
        copyEmailBtn.style.color = 'var(--success)';

        setTimeout(() => {
          copyEmailBtn.innerHTML = originalText;
          copyEmailBtn.style.borderColor = '';
          copyEmailBtn.style.color = '';
        }, 2200);
      }).catch(() => {
        // Fallback if clipboard API fails
        alert('Email: ' + email);
      });
    });
  }

  // --- 9. Scroll Reveal Animations (IntersectionObserver) ---
  const revealElements = document.querySelectorAll('.reveal-fade-up');
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver not available
    revealElements.forEach(el => el.classList.add('active'));
  }
});
