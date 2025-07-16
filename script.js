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

  const form = document.querySelector('.contact-form form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const name = formData.get('name') || this.querySelector('input[placeholder="Your Name"]').value;
      const email = formData.get('email') || this.querySelector('input[placeholder="Your Email"]').value;
      const subject = formData.get('subject') || this.querySelector('input[placeholder="Subject"]').value;
      const message = formData.get('message') || this.querySelector('textarea').value;
      
      if (name && email && subject && message) {
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
      } else {
        alert('Please fill in all fields.');
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
