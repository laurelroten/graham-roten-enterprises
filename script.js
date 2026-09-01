function toggleMenu() {
  const nav = document.getElementById('nav');
  nav.classList.toggle('active');
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
          behavior: 'smooth'
        });
        
        const nav = document.getElementById('nav');
        nav.classList.remove('active');
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
