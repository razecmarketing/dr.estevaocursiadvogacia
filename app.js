document.addEventListener('DOMContentLoaded', () => {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // EmailJS initialization
  (function() {
    emailjs.init("hDh__QOdLSm_CmWM-");  // Replace with your actual EmailJS user ID
  })();

  // Hero Content Animation
  gsap.fromTo('.hero h1', 
    { opacity: 0, y: 50 }, 
    { opacity: 1, y: 0, duration: 1, delay: 0.5 }
  );
  gsap.fromTo('.hero p', 
    { opacity: 0, y: 50 }, 
    { opacity: 1, y: 0, duration: 1, delay: 0.7 }
  );

  // Value Cards Animation with ScrollTrigger
  gsap.fromTo('.value-card', 
    { opacity: 0, y: 50 }, 
    { 
      opacity: 1, 
      y: 0, 
      duration: 0.8, 
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.values-grid',
        start: 'top 70%'
      }
    }
  );

  // Navigation behavior (updated to handle different scenarios)
  const navHome = document.getElementById('nav-home');
  const navAbout = document.getElementById('nav-about');
  const navValues = document.getElementById('nav-values');
  const navContact = document.getElementById('nav-contact');
  const whatsappLink = 'https://wa.me/5511985773185?text=Olá%20Dr.%20eu%20gostaria%20de%20agendar%20uma%20consulta%20com%20o%20sr.';

  // Ensure elements exist before adding event listeners
  if (navHome) {
    navHome.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.pageYOffset === 0) {
        // If already at the top, reload the page
        window.location.reload();
      } else {
        // Scroll to the top
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: 0 },
          ease: 'power2.inOut'
        });
      }
    });
  }

  if (navAbout) {
    navAbout.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(whatsappLink, '_blank');
    });
  }

  if (navValues) {
    navValues.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(whatsappLink, '_blank');
    });
  }

  if (navContact) {
    navContact.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(whatsappLink, '_blank');
    });
  }

  // Mobile Navigation Tabs
  const mobileNavTabs = document.querySelectorAll('.mobile-nav-tab');
  const mobileSections = document.querySelectorAll('.mobile-section');
  const whatsappLinkMobile = 'https://wa.me/5511985773185?text=Olá%20Dr.%20eu%20gostaria%20de%20agendar%20uma%20consulta%20com%20o%20sr.';

  mobileNavTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active state from all tabs and sections
      mobileNavTabs.forEach(t => t.classList.remove('active'));
      mobileSections.forEach(s => s.classList.remove('active-section'));

      // Add active state to clicked tab
      tab.classList.add('active');

      const targetSection = tab.dataset.target;

      switch(targetSection) {
        case 'home':
          document.getElementById('home').classList.add('active-section');
          break;
        case 'about':
          document.getElementById('about').classList.add('active-section');
          break;
        case 'contact':
          document.getElementById('contact').classList.add('active-section');
          break;
        case 'whatsapp':
          window.open(whatsappLinkMobile, '_blank');
          break;
      }
    });
  });

  // Contact Form Submission and Validation
  const contactForm = document.getElementById('contact-form');
  const nameInput = contactForm.querySelector('input[name="name"]');
  const emailInput = contactForm.querySelector('input[name="email"]');
  const messageInput = contactForm.querySelector('textarea[name="message"]');

  // Custom validation functions
  function validateName(name) {
    const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;
    return nameRegex.test(name);
  }

  function validateEmail(email) {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return emailRegex.test(email);
  }

  function validateMessage(message) {
    return message.trim().length >= 20;
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate inputs
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!validateName(name)) {
      alert('Por favor, insira um nome válido (apenas letras).');
      return;
    }

    if (!validateEmail(email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }

    if (!validateMessage(message)) {
      alert('A mensagem deve ter pelo menos 20 caracteres.');
      return;
    }

    // Prepare WhatsApp message
    const whatsappMessage = `Consulta Jurídica\n\nNome: ${name}\nE-mail: ${email}\n\nMensagem: ${message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/5511985773185?text=${encodedMessage}`;

    // GSAP animation for form submission
    gsap.to(contactForm, {
      scale: 0.9,
      duration: 0.2,
      onComplete: () => {
        // Open WhatsApp with pre-filled message
        window.open(whatsappUrl, '_blank');

        // Reset form and scale
        contactForm.reset();
        gsap.to(contactForm, { scale: 1, duration: 0.2 });
      }
    });
  });

  // Prevent form resubmission on page reload
  if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
  }

  // Smooth Scrolling
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: targetSection, offsetY: 70 },
        ease: 'power2.inOut'
      });
    });
  });

  // WhatsApp Button Pulse Animation
  const whatsappButton = document.querySelector('#whatsapp-button a');
  gsap.to(whatsappButton, {
    scale: 1.1,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  });
});