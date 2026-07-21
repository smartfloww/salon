/* ==========================================================================
   LUMIÈRE — main.js
   Vanilla JS, no dependencies. Works on touch and mouse.
   Modules: Reveal · Nav · Lightbox · FAQ · Counters · Filters · Form · Year
   ========================================================================== */
(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;

  /* --------------------------------------------------------------------
     1. Reveal on scroll — IntersectionObserver
     -------------------------------------------------------------------- */
  function initReveal() {
    const els = document.querySelectorAll('.reveal, .reveal-clip, .reveal-img, .hero__media');
    if (!els.length) return;

    if (prefersReduced || !('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-in'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px'
    });

    els.forEach(el => io.observe(el));
  }

  /* --------------------------------------------------------------------
     2. Nav — scroll state + mobile drawer
     -------------------------------------------------------------------- */
  function initNav() {
    const nav = document.querySelector('.nav');
    const toggle = document.querySelector('.nav__toggle');
    const panel = document.querySelector('.mobile-panel');

    if (nav) {
      let ticking = false;
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          nav.classList.toggle('scrolled', window.scrollY > 12);
          ticking = false;
        });
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    if (toggle && panel) {
      const setOpen = (open) => {
        toggle.classList.toggle('active', open);
        panel.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        panel.setAttribute('aria-hidden', open ? 'false' : 'true');
        document.body.classList.toggle('no-scroll', open);
      };

      toggle.addEventListener('click', () => {
        setOpen(!panel.classList.contains('open'));
      });

      // Close panel on link click
      panel.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => setOpen(false));
      });

      // Close on Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && panel.classList.contains('open')) {
          setOpen(false);
          toggle.focus();
        }
      });

      // Close on resize to desktop
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 880 && panel.classList.contains('open')) {
          setOpen(false);
        }
      });
    }
  }

  /* --------------------------------------------------------------------
     3. Lightbox (gallery page)
     -------------------------------------------------------------------- */
  function initLightbox() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightboxImg');
    const lbCap = document.getElementById('lightboxCaption');
    const lbClose = document.getElementById('lightboxClose');
    if (!lightbox || !lbImg) return;

    let lastFocused = null;

    const open = (imgSrc, caption, trigger) => {
      lastFocused = trigger;
      lbImg.src = imgSrc;
      lbImg.alt = caption || '';
      lbCap.textContent = caption || '';
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('no-scroll');
      if (lbClose) lbClose.focus();
    };

    const close = () => {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('no-scroll');
      lbImg.src = '';
      if (lastFocused) lastFocused.focus();
    };

    grid.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const src = item.dataset.full;
        const cap = item.dataset.caption;
        if (src) open(src, cap, item);
      });
    });

    if (lbClose) lbClose.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) close();
    });
  }

  /* --------------------------------------------------------------------
     4. FAQ accordion (services page)
     -------------------------------------------------------------------- */
  function initFAQ() {
    const items = document.querySelectorAll('.faq__item');
    if (!items.length) return;

    items.forEach(item => {
      const q = item.querySelector('.faq__q');
      const a = item.querySelector('.faq__a');
      if (!q || !a) return;

      q.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close all others
        items.forEach(other => {
          if (other !== item) {
            other.classList.remove('open');
            other.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
            other.querySelector('.faq__a').style.maxHeight = '0';
          }
        });
        // Toggle this
        if (isOpen) {
          item.classList.remove('open');
          q.setAttribute('aria-expanded', 'false');
          a.style.maxHeight = '0';
        } else {
          item.classList.add('open');
          q.setAttribute('aria-expanded', 'true');
          a.style.maxHeight = a.scrollHeight + 'px';
        }
      });
    });
  }

  /* --------------------------------------------------------------------
     5. Number counters (home stats)
     -------------------------------------------------------------------- */
  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    if (prefersReduced || !('IntersectionObserver' in window)) {
      counters.forEach(el => {
        el.textContent = el.dataset.counter + (el.dataset.suffix || '');
      });
      return;
    }

    const animate = (el) => {
      const target = parseFloat(el.dataset.counter);
      const suffix = el.dataset.suffix || '';
      const dur = 1200;
      const start = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        const val = Math.round(target * eased);
        el.textContent = val + suffix;
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => io.observe(c));
  }

  /* --------------------------------------------------------------------
     6. Gallery filters
     -------------------------------------------------------------------- */
  function initFilters() {
    const chips = document.querySelectorAll('.filter-chip');
    const items = document.querySelectorAll('.gallery-item');
    if (!chips.length || !items.length) return;

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const filter = chip.dataset.filter;
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        items.forEach(item => {
          const cat = item.dataset.category;
          if (filter === 'all' || cat === filter) {
            item.style.display = '';
            // Re-trigger reveal
            requestAnimationFrame(() => {
              item.style.opacity = '1';
              item.style.transform = 'none';
            });
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  /* --------------------------------------------------------------------
     7. Booking form (contact page) — fake submit + toast
     -------------------------------------------------------------------- */
  function initForm() {
    const form = document.getElementById('bookingForm');
    if (!form) return;

    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }

    const showToast = (msg) => {
      toast.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3500);
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Basic validation
      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = 'var(--rose-deep)';
        } else {
          field.style.borderColor = '';
        }
      });

      if (!valid) {
        showToast('Please fill in the required fields.');
        return;
      }

      const name = form.querySelector('#name')?.value || 'there';
      showToast(`Thank you, ${name.split(' ')[0]} — we'll be in touch within one business day.`);
      form.reset();
    });

    // Clear error styling on input
    form.querySelectorAll('[required]').forEach(field => {
      field.addEventListener('input', () => {
        field.style.borderColor = '';
      });
    });
  }

  /* --------------------------------------------------------------------
     8. Footer year
     -------------------------------------------------------------------- */
  function initYear() {
    const els = document.querySelectorAll('[data-year]');
    const year = new Date().getFullYear();
    els.forEach(el => { el.textContent = year; });
  }

  /* --------------------------------------------------------------------
     9. Hide sticky CTA when contact form is in view
     -------------------------------------------------------------------- */
  function initStickyCtaVisibility() {
    const cta = document.querySelector('.sticky-cta');
    const form = document.getElementById('booking-form');
    if (!cta || !form || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        cta.style.opacity = entry.isIntersecting ? '0' : '';
        cta.style.pointerEvents = entry.isIntersecting ? 'none' : '';
      });
    }, { threshold: 0.3 });

    io.observe(form);
  }

  /* --------------------------------------------------------------------
     Init on DOM ready
     -------------------------------------------------------------------- */
  function init() {
    initReveal();
    initNav();
    initLightbox();
    initFAQ();
    initCounters();
    initFilters();
    initForm();
    initYear();
    initStickyCtaVisibility();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
