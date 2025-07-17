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

// Service modal data
const serviceData = {
  'heavy-hauling': {
    title: 'Heavy Hauling',
    icon: 'fas fa-truck',
    description: 'Graham Roten Enterprises specializes in the safe, reliable transportation of heavy equipment, oversized loads, and construction machinery throughout the High Country region. Our experienced drivers and specialized equipment ensure your valuable assets arrive safely and on schedule.',
    features: [
      'Lowboy and flatbed trailers for heavy equipment',
      'Certified drivers with oversized load experience',
      'Proper permitting and route planning',
      'Secure loading and tie-down procedures',
      'GPS tracking for load monitoring',
      'Insurance coverage for high-value equipment'
    ],
    testimonial: 'Graham Roten moved our entire fleet of excavators to our new site. Professional, careful, and on time. Exactly what we needed for our construction timeline.',
    author: 'Mike Johnson, Johnson Construction LLC'
  },
  'gravel-stone': {
    title: 'Gravel & Stone Delivery',
    icon: 'fas fa-mountain',
    description: 'We provide high-quality aggregates including gravel, crushed stone, sand, and fill dirt delivered directly to your job site. Our materials are sourced from trusted local quarries and delivered with precision timing to keep your project on schedule.',
    features: [
      'Premium graded gravel and crushed stone',
      'Various aggregate sizes and types',
      'Fill dirt and topsoil delivery',
      'Accurate load sizing and measurements',
      'Timely delivery scheduling',
      'Competitive pricing on bulk orders'
    ],
    testimonial: 'The quality of gravel was excellent and the delivery was right on time. Our driveway project went smoothly thanks to their reliable service.',
    author: 'Sarah Mitchell, Homeowner'
  },
  'site-preparation': {
    title: 'Site Preparation',
    icon: 'fas fa-hammer',
    description: 'Complete site preparation services from initial clearing to final grading. We handle excavation, land clearing, foundation preparation, and precise grading to ensure your construction project starts on solid ground.',
    features: [
      'Land clearing and tree removal',
      'Excavation for foundations and utilities',
      'Precise grading and leveling',
      'Drainage planning and installation',
      'Soil compaction and stabilization',
      'Environmental compliance and erosion control'
    ],
    testimonial: 'They transformed our rough hillside lot into a perfect building site. The attention to detail in the grading was impressive.',
    author: 'David Chen, Custom Home Builder'
  },
  'residential': {
    title: 'Residential Services',
    icon: 'fas fa-home',
    description: 'Specialized services for homeowners including driveway installation, landscaping materials delivery, and residential construction support. We understand the unique needs of residential projects and provide personalized service.',
    features: [
      'Driveway design and installation',
      'Decorative stone and mulch delivery',
      'Residential excavation and grading',
      'Septic system installation',
      'Walkway and patio preparation',
      'Small-scale site work'
    ],
    testimonial: 'From start to finish, they made our driveway project easy. Great communication and the final result exceeded our expectations.',
    author: 'Jennifer and Tom Rodriguez, Homeowners'
  },
  'equipment-transport': {
    title: 'Equipment Transport',
    icon: 'fas fa-tools',
    description: 'Safe and secure transportation of construction equipment, farm machinery, and specialized vehicles. Our fleet includes lowboy trailers and equipment haulers designed for various types of machinery transport.',
    features: [
      'Lowboy trailers for heavy equipment',
      'Specialized haulers for different equipment types',
      'Professional loading and securing',
      'Route planning for oversized loads',
      'Experienced operators and drivers',
      'Full insurance coverage during transport'
    ],
    testimonial: 'They handled our excavator transport with complete professionalism. Equipment arrived in perfect condition and exactly when promised.',
    author: 'Rick Patterson, Patterson Excavating'
  },
  'septic': {
    title: 'Septic Services',
    icon: 'fas fa-wrench',
    description: 'Complete septic system services including new installations, repairs, maintenance, and inspections. We work with certified septic designers and provide comprehensive solutions for residential and commercial properties.',
    features: [
      'New septic system installation',
      'System repairs and maintenance',
      'Septic inspections and certifications',
      'Drain field installation and repair',
      'Pump system service',
      'Emergency septic services'
    ],
    testimonial: 'When our septic system failed, they responded quickly and got us back up and running. Professional service and fair pricing.',
    author: 'Carol Williams, Property Manager'
  },
  'welding': {
    title: 'Welding & Fabrication',
    icon: 'fas fa-fire',
    description: 'Custom metal fabrication and welding services for equipment repairs, structural work, and specialized construction needs. Our certified welders provide both field and shop services.',
    features: [
      'Certified welding services',
      'Custom metal fabrication',
      'Equipment repair welding',
      'Structural steel work',
      'Mobile welding services',
      'Emergency repair services'
    ],
    testimonial: 'Their welding work on our equipment trailer was top-notch. Strong, clean welds and reasonable pricing. Will definitely use them again.',
    author: 'Steve Anderson, Anderson Contracting'
  },
  'equipment-services': {
    title: 'Equipment Services',
    icon: 'fas fa-cog',
    description: 'Mobile repair and maintenance services for construction equipment and fleet vehicles. Our service trucks come to your location equipped with tools and parts to minimize downtime.',
    features: [
      'Mobile repair services',
      'Preventive maintenance programs',
      'Emergency breakdown service',
      'Fleet vehicle maintenance',
      'Hydraulic system repairs',
      'Field diagnostic services'
    ],
    testimonial: 'Having them service our equipment on-site saves us time and money. Their mobile service truck is a game-changer for our operation.',
    author: 'Lisa Thompson, Mountain View Construction'
  }
};

document.addEventListener('DOMContentLoaded', function() {
  // Service modal functionality
  const modal = document.getElementById('service-modal');
  const modalClose = document.querySelector('.modal-close');
  const serviceCards = document.querySelectorAll('.service-card');

  // Open modal when service card is clicked
  serviceCards.forEach(card => {
    const learnMoreBtn = card.querySelector('.service-learn-more');
    if (learnMoreBtn) {
      learnMoreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const serviceKey = card.dataset.service;
        const service = serviceData[serviceKey];
        
        console.log('Clicked service:', serviceKey, service); // Debug log
        
        if (service) {
          // Populate modal content
          document.querySelector('.modal-service-icon').className = service.icon;
          document.querySelector('.modal-title').textContent = service.title;
          document.querySelector('.modal-description').textContent = service.description;
          
          // Populate features list
          const featuresList = document.querySelector('.service-features');
          featuresList.innerHTML = '';
          service.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
          });
          
          // Populate testimonial
          document.querySelector('.testimonial-quote').textContent = service.testimonial;
          document.querySelector('.testimonial-author').textContent = service.author;
          
          // Show modal
          modal.style.display = 'block';
          document.body.style.overflow = 'hidden';
        }
      });
    }
  });

  // Close modal functionality
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  modalClose.addEventListener('click', closeModal);
  
  // Close modal when clicking outside content
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    } else if (e.target.classList.contains('modal-contact')) {
      // Modal CTA button functionality
      closeModal();
      // Smooth scroll to contact section will be handled by existing navigation code
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    }
  });

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
