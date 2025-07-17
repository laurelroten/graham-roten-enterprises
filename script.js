function toggleMenu() {
  const nav = document.getElementById('nav');
  nav.classList.toggle('active');
}

// Stripe configuration
const stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY_HERE'); // Replace with your actual publishable key
const elements = stripe.elements();

// Create card element
const cardElement = elements.create('card', {
  style: {
    base: {
      fontSize: '16px',
      color: '#333',
      fontFamily: 'Inter, sans-serif',
      '::placeholder': {
        color: '#666',
      },
    },
  },
});

document.addEventListener('DOMContentLoaded', function() {
  // Mount Stripe card element
  const cardElementDiv = document.getElementById('card-element');
  if (cardElementDiv) {
    cardElement.mount('#card-element');
    
    // Handle real-time validation errors from the card Element
    cardElement.on('change', function(event) {
      const displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
        displayError.classList.add('show');
      } else {
        displayError.textContent = '';
        displayError.classList.remove('show');
      }
    });
  }

  // Handle payment form submission
  const paymentForm = document.getElementById('payment-form');
  if (paymentForm) {
    paymentForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      
      const submitButton = document.getElementById('submit-payment');
      const buttonText = document.getElementById('button-text');
      const spinner = document.getElementById('spinner');
      
      // Disable button and show loading
      submitButton.disabled = true;
      buttonText.textContent = 'Processing...';
      spinner.classList.remove('hidden');
      
      // Get form data
      const formData = new FormData(paymentForm);
      const amount = parseFloat(formData.get('amount'));
      const invoiceNumber = formData.get('invoice-number');
      const customerName = formData.get('customer-name');
      const customerEmail = formData.get('customer-email');
      
      // Validate form
      if (!amount || amount <= 0) {
        showError('Please enter a valid amount');
        resetButton();
        return;
      }
      
      if (!invoiceNumber || !customerName || !customerEmail) {
        showError('Please fill in all required fields');
        resetButton();
        return;
      }
      
      try {
        // In a real implementation, you would call your backend API here
        // to create a payment intent and get the client secret
        
        // For demo purposes, we'll simulate the payment process
        setTimeout(() => {
          alert(`Payment simulation: $${amount.toFixed(2)} for invoice ${invoiceNumber}\\n\\nIn production, this would process through Stripe and send confirmation to ${customerEmail}`);
          
          // Reset form
          paymentForm.reset();
          cardElement.clear();
          resetButton();
        }, 2000);
        
      } catch (error) {
        console.error('Payment error:', error);
        showError('Payment failed. Please try again.');
        resetButton();
      }
      
      function resetButton() {
        submitButton.disabled = false;
        buttonText.textContent = 'Pay Now';
        spinner.classList.add('hidden');
      }
      
      function showError(message) {
        const errorDiv = document.getElementById('card-errors');
        errorDiv.textContent = message;
        errorDiv.classList.add('show');
      }
    });
  }

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
