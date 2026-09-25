/**
 * SmartLearn 3D Engine & Interaction Controller
 * Project: SmartLearn | Team: HACKSMITH | Theme: Smart Education (SIH 2026)
 * Handles: Reusable 3D Tilt, Hero 3D Card Dynamics, Ambient Cursor Light,
 * Count-Up Statistics, Scroll Reveal, Navbar Shrink, and Student Onboarding.
 */

const SmartLearn3D = (function () {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // --- 1. REUSABLE 3D TILT ENGINE ---
  class TiltInstance {
    constructor(element) {
      this.el = element;
      this.maxTilt = parseFloat(element.getAttribute('data-tilt-max') || 10);
      this.perspective = parseFloat(element.getAttribute('data-tilt-perspective') || 1000);
      this.scale = parseFloat(element.getAttribute('data-tilt-scale') || 1.02);
      this.currentX = 0;
      this.currentY = 0;
      this.targetX = 0;
      this.targetY = 0;
      this.isHovered = false;
      this.rafId = null;

      this.onMouseMove = this.onMouseMove.bind(this);
      this.onMouseEnter = this.onMouseEnter.bind(this);
      this.onMouseLeave = this.onMouseLeave.bind(this);
      this.update = this.update.bind(this);

      this.init();
    }

    init() {
      if (isReducedMotion || isTouchDevice) return;
      this.el.style.transformStyle = 'preserve-3d';
      this.el.addEventListener('mousemove', this.onMouseMove, { passive: true });
      this.el.addEventListener('mouseenter', this.onMouseEnter, { passive: true });
      this.el.addEventListener('mouseleave', this.onMouseLeave, { passive: true });
    }

    onMouseEnter() {
      this.isHovered = true;
      if (!this.rafId) {
        this.rafId = requestAnimationFrame(this.update);
      }
    }

    onMouseMove(e) {
      const rect = this.el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0 to 1
      const y = (e.clientY - rect.top) / rect.height; // 0 to 1

      this.targetX = (y - 0.5) * -this.maxTilt * 2;
      this.targetY = (x - 0.5) * this.maxTilt * 2;

      // Update spotlight position if element has spotlight
      this.el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      this.el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    }

    onMouseLeave() {
      this.isHovered = false;
      this.targetX = 0;
      this.targetY = 0;
    }

    update() {
      const lerp = 0.12;
      this.currentX += (this.targetX - this.currentX) * lerp;
      this.currentY += (this.targetY - this.currentY) * lerp;

      const currentScale = this.isHovered ? this.scale : 1 + (this.scale - 1) * (Math.abs(this.currentX) + Math.abs(this.currentY)) / 10;
      this.el.style.transform = `perspective(${this.perspective}px) rotateX(${this.currentX.toFixed(2)}deg) rotateY(${this.currentY.toFixed(2)}deg) scale3d(${currentScale.toFixed(3)}, ${currentScale.toFixed(3)}, 1)`;

      if (this.isHovered || Math.abs(this.currentX) > 0.05 || Math.abs(this.currentY) > 0.05) {
        this.rafId = requestAnimationFrame(this.update);
      } else {
        this.el.style.transform = '';
        this.rafId = null;
      }
    }

    destroy() {
      this.el.removeEventListener('mousemove', this.onMouseMove);
      this.el.removeEventListener('mouseenter', this.onMouseEnter);
      this.el.removeEventListener('mouseleave', this.onMouseLeave);
      if (this.rafId) cancelAnimationFrame(this.rafId);
    }
  }

  function initTiltSystem() {
    if (isReducedMotion || isTouchDevice) return;
    document.querySelectorAll('[data-tilt]').forEach(el => {
      if (!el._tiltInstance) {
        el._tiltInstance = new TiltInstance(el);
      }
    });
  }

  // --- 2. HERO 3D DASHBOARD CURSOR TRACKING ---
  function initHero3DDashboard() {
    const heroCard = document.getElementById('hero-3d-dashboard');
    const heroContainer = document.getElementById('hero-interactive-container');
    if (!heroCard || !heroContainer || isReducedMotion || isTouchDevice) return;

    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let rafId = null;

    function renderHero3D() {
      const lerp = 0.08;
      currentRotX += (targetRotX - currentRotX) * lerp;
      currentRotY += (targetRotY - currentRotY) * lerp;

      heroCard.style.transform = `rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg)`;

      if (Math.abs(targetRotX - currentRotX) > 0.01 || Math.abs(targetRotY - currentRotY) > 0.01) {
        rafId = requestAnimationFrame(renderHero3D);
      } else {
        rafId = null;
      }
    }

    heroContainer.addEventListener('mousemove', (e) => {
      const rect = heroContainer.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0 to 1
      const y = (e.clientY - rect.top) / rect.height; // 0 to 1

      // Subtle tilt: max ±8 deg for realistic physical feel
      targetRotX = (y - 0.5) * -12;
      targetRotY = (x - 0.5) * 14;

      if (!rafId) {
        rafId = requestAnimationFrame(renderHero3D);
      }
    }, { passive: true });

    heroContainer.addEventListener('mouseleave', () => {
      targetRotX = 0;
      targetRotY = 0;
      if (!rafId) {
        rafId = requestAnimationFrame(renderHero3D);
      }
    }, { passive: true });
  }

  // --- 3. AMBIENT CURSOR GLOW ---
  function initAmbientCursorGlow() {
    const glow = document.getElementById('ambient-cursor-glow');
    if (!glow || isReducedMotion || isTouchDevice) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let rafId = null;

    function updateGlow() {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      glow.style.left = `${currentX.toFixed(1)}px`;
      glow.style.top = `${currentY.toFixed(1)}px`;

      if (Math.abs(targetX - currentX) > 0.2 || Math.abs(targetY - currentY) > 0.2) {
        rafId = requestAnimationFrame(updateGlow);
      } else {
        rafId = null;
      }
    }

    window.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(updateGlow);
      }
    }, { passive: true });
  }

  // --- 4. COUNT-UP ANIMATION FOR IMPACT STATISTICS ---
  function animateValue(obj, start, end, duration, formatFn) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * easeProgress;
      obj.textContent = formatFn(current);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        obj.textContent = formatFn(end);
      }
    };
    window.requestAnimationFrame(step);
  }

  function initCountUpStats() {
    const countElements = document.querySelectorAll('[data-countup]');
    if (!countElements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-countup'));
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';
          const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);

          animateValue(el, 0, target, 1800, (val) => {
            const numStr = decimals > 0 
              ? val.toFixed(decimals) 
              : Math.floor(val).toLocaleString();
            return `${prefix}${numStr}${suffix}`;
          });

          obs.unobserve(el);
        }
      });
    }, { threshold: 0.25 });

    countElements.forEach(el => observer.observe(el));
  }

  // --- 5. SCROLL REVEAL & STAGGER ---
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!revealElements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => observer.observe(el));
  }

  // --- 6. NAVBAR SCROLL DYNAMICS & ACTIVE INDICATOR ---
  function initNavbarScroll() {
    const header = document.querySelector('header.sticky');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 25) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });

    // Active Section Tracking
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link-3d');

    if (sections.length && navLinks.length) {
      window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120;

        sections.forEach(sec => {
          const top = sec.offsetTop;
          const height = sec.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSectionId = sec.getAttribute('id');
          }
        });

        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
          }
        });
      }, { passive: true });
    }
  }

  // --- 7. BUTTON RIPPLE EFFECT ---
  function initButtonRipples() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.uiverse-btn-3d, .uiverse-btn-secondary-3d');
      if (!btn) return;

      const circle = document.createElement('span');
      const diameter = Math.max(btn.clientWidth, btn.clientHeight);
      const radius = diameter / 2;

      const rect = btn.getBoundingClientRect();
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('click-ripple');

      const existingRipple = btn.querySelector('.click-ripple');
      if (existingRipple) existingRipple.remove();

      btn.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  }

  // --- 8. PRELOADER DISMISSAL ---
  function dismissPreloader() {
    const preloader = document.getElementById('smartlearn-preloader');
    if (!preloader) return;

    const progressFill = document.getElementById('preloader-progress-bar');
    const percentText = document.getElementById('preloader-percent');

    let p = 0;
    const interval = setInterval(() => {
      p += Math.floor(Math.random() * 25) + 15;
      if (p > 100) p = 100;
      if (progressFill) progressFill.style.width = `${p}%`;
      if (percentText) percentText.textContent = `${p}%`;

      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          preloader.classList.add('fade-out');
          setTimeout(() => preloader.remove(), 500);
        }, 200);
      }
    }, 60);
  }

  // --- 9. STUDENT ONBOARDING INTERACTION ---
  function openStudentOnboarding() {
    const modal = document.getElementById('modal-student-onboarding');
    if (modal) {
      modal.classList.remove('hidden');
      const nameInput = document.getElementById('onboard-student-name');
      if (nameInput) setTimeout(() => nameInput.focus(), 100);
    }
  }

  function handleOnboardingSubmit(e) {
    if (e) e.preventDefault();
    const name = document.getElementById('onboard-student-name')?.value || 'Alex Rivera';
    const year = document.getElementById('onboard-student-year')?.value || '2nd Year B.Tech (CSE)';
    const skill = document.getElementById('onboard-student-skill')?.value || 'Intermediate';

    // Collect selected subject chips
    const selectedSubjects = [];
    document.querySelectorAll('.onboard-subject-checkbox:checked').forEach(cb => {
      selectedSubjects.push(cb.value);
    });

    const studentProfile = {
      name,
      year,
      skill,
      subjects: selectedSubjects.length ? selectedSubjects : ['DSA', 'Pointers in C', 'DBMS'],
      createdAt: new Date().toISOString()
    };

    localStorage.setItem('smartlearn_custom_student', JSON.stringify(studentProfile));

    // Close modal
    const modal = document.getElementById('modal-student-onboarding');
    if (modal) modal.classList.add('hidden');

    // Notify & launch student dashboard
    if (window.SmartLearnApp) {
      window.SmartLearnApp.showMainView('student-dashboard');
      const headerTitle = document.getElementById('student-header-crumb');
      if (headerTitle) headerTitle.textContent = `Welcome, ${name.split(' ')[0]}!`;
    }
  }

  // --- INITIALIZE ALL 3D MODULES ---
  function init() {
    console.log("Initializing SmartLearn 3D Engine & Modern Interactions...");
    dismissPreloader();
    initTiltSystem();
    initHero3DDashboard();
    initAmbientCursorGlow();
    initCountUpStats();
    initScrollReveal();
    initNavbarScroll();
    initButtonRipples();
  }

  // Auto-init on DOMContentLoaded or immediate if already ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return {
    init,
    initTiltSystem,
    openStudentOnboarding,
    handleOnboardingSubmit
  };
})();

window.SmartLearn3D = SmartLearn3D;
