document.addEventListener('DOMContentLoaded', function() {
  // Animaciones de scroll
  const scrollReveals = document.querySelectorAll('.scroll-reveal');
  
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  scrollReveals.forEach(el => scrollObserver.observe(el));

  // Contador de urgencia
  const urgencyCounter = document.createElement('div');
  urgencyCounter.className = 'urgency-counter';
  urgencyCounter.innerHTML = `
    <span class="counter">5</span> kits disponibles - 
    <span id="timer">15:00</span> para reservar
  `;
  document.querySelector('.urgency-banner').appendChild(urgencyCounter);

  // Temporizador psicológico
  let minutes = 15;
  let seconds = 0;
  
  const timer = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(timer);
        return;
      }
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    
    document.getElementById('timer').textContent = 
      `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Cambiar color cuando quedan 5 minutos
    if (minutes < 5) {
      document.querySelector('.urgency-banner').style.background = 
        'linear-gradient(to right, #e74c3c, #922b21)';
    }
  }, 1000);

  // Efecto de seguimiento para imágenes
  const images = document.querySelectorAll('.product-image');
  
  images.forEach(image => {
    image.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      image.style.transform = `perspective(1000px) rotateX(${(y - 0.5) * 10}deg) rotateY(${(x - 0.5) * 10}deg)`;
    });
    
    image.addEventListener('mouseleave', () => {
      image.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });

  // Tracking de conversiones
  const trackConversion = (event, label) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'conversion', {
        'event_category': 'engagement',
        'event_label': label
      });
    }
    console.log('Event tracked:', label);
  };

  document.querySelectorAll('.btn, .nav-cta').forEach(button => {
    button.addEventListener('click', () => {
      trackConversion(event, button.textContent.trim());
    });
  });

  // Mostrar precio dinámico
  function updatePrices() {
    document.querySelectorAll('.price').forEach(priceEl => {
      const originalPrice = parseFloat(priceEl.dataset.price);
      const discount = 0.15; // 15% de descuento
      const finalPrice = originalPrice * (1 - discount);
      
      priceEl.innerHTML = `
        <span class="old-price">$${originalPrice.toFixed(2)}</span>
        <span class="new-price">$${finalPrice.toFixed(2)}</span>
        <span class="discount-badge">15% OFF</span>
      `;
    });
  }
  
  updatePrices();
});