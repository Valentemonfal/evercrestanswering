/**
 * Evercrest Answering - Landing Page Scripts
 * Modern SaaS landing page with smooth animations and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initContactForm();
  initSmoothScroll();
  initHeaderScroll();
  initScrollReveal();
});

/**
 * Mobile navigation toggle
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (!menuToggle || !nav) return;

  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/**
 * Contact / Lead form handling
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    setTimeout(() => {
      submitBtn.textContent = 'Message Sent!';
      submitBtn.style.background = '#22c55e';

      form.reset();

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
      }, 3000);
    }, 800);
  });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;

    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 88;
        const elementPosition = target.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    });
  });
}

/**
 * Header background on scroll
 */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();
}

/**
 * Scroll reveal animation
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.service-card, .industry-card, .benefit-card, .step, .pricing-card, .testimonial-card, .faq__item, .section__title, .section__intro'
  );

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.style.transitionDelay = `${Math.min(index * 0.05, 0.3)}s`;
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}
