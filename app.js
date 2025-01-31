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

  // Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // GSAP animation for form submission
    gsap.to(contactForm, {
      scale: 0.9,
      duration: 0.2,
      onComplete: () => {
        // Send email using EmailJS
        emailjs.send("service_xxxxxxxxxx", "template_yyyyyyyyy", {
          from_name: name,
          from_email: email,
          message: message,
          to_email: "estevao.cursi@adv.oabsp.org.br"
        }).then(
          function(response) {
            console.log("SUCCESS", response);
            alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
            contactForm.reset();
          },
          function(error) {
            console.log("FAILED", error);
            alert('Erro ao enviar a mensagem. Por favor, tente novamente.');
          }
        );

        // Restore form scale
        gsap.to(contactForm, { scale: 1, duration: 0.2 });
      }
    });
  });

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