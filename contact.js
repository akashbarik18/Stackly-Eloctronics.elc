document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

  

    // Form submission
    const contactForm = document.getElementById('contactForm');
const notifyBox = document.getElementById('form-notification');

function showNotification(message, type = 'success') {
  notifyBox.textContent = message;
  notifyBox.className = `notification ${type} show`;

  setTimeout(() => {
    notifyBox.classList.remove('show');
  }, 3000);
}

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  const namePattern = /^[A-Za-z\s]{3,}$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  if (!namePattern.test(name)) {
    showNotification("❌ Please enter a valid name (min 3 letters).", "error");
    return;
  }

  if (!emailPattern.test(email)) {
    showNotification("❌ Please enter a valid Gmail address.", "error");
    return;
  }

  if (subject.length < 3) {
    showNotification("❌ Subject should be at least 3 characters.", "error");
    return;
  }

  if (message.length < 10) {
    showNotification("❌ Message should be at least 10 characters.", "error");
    return;
  }

  showNotification("✅ Thank you! Your message has been sent.", "success");
  contactForm.reset();
});


    // Add animation to elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.contact-info, .contact-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state
    document.querySelectorAll('.contact-info, .contact-form').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
    });
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Check on load
    animateOnScroll();
});