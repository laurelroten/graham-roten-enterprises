function toggleMenu() {
  const nav = document.getElementById('nav');
  const open = nav.classList.toggle('active');
  // Tell screen readers whether the menu is open, not just that a button exists.
  const button = document.querySelector('.menu-toggle');
  if (button) button.setAttribute('aria-expanded', String(open));
}

/** True when the visitor has asked their OS to minimise animation. */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

document.addEventListener('DOMContentLoaded', function() {

  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        
        window.scrollTo({
          top: offsetTop,
          behavior: prefersReducedMotion() ? 'auto' : 'smooth'
        });

        const nav = document.getElementById('nav');
        nav.classList.remove('active');
        const button = document.querySelector('.menu-toggle');
        if (button) button.setAttribute('aria-expanded', 'false');
      }
    });
  });

  const form = document.getElementById('contact-form');
  if (form) {
    const status = document.getElementById('form-status');
    const button = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const original = button.textContent;
      button.disabled = true;
      button.textContent = 'Sending...';
      status.textContent = '';
      status.className = 'form-status';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form)
        });
        const result = await response.json();

        status.textContent = result.message;
        status.className = 'form-status ' + (result.ok ? 'is-ok' : 'is-error');
        if (result.ok) form.reset();
      } catch (err) {
        status.textContent =
          "Sorry — that didn't send. Please call (828) 262-5593 and we'll take the details.";
        status.className = 'form-status is-error';
      } finally {
        button.disabled = false;
        button.textContent = original;
      }
    });
  }

  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      navbar.style.backdropFilter = 'blur(10px)';
    } else {
      navbar.style.backgroundColor = 'var(--white)';
      navbar.style.backdropFilter = 'none';
    }
  });
});
