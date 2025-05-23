// main.js - Versión corregida y optimizada
document.addEventListener('DOMContentLoaded', function() {
  // =============================================
 // Menú móvil corregido
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('mobile-menu');
  const mainNav = document.getElementById('main-nav');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
      // Alternar clases
      this.classList.toggle('active');
      mainNav.classList.toggle('active');
      document.body.classList.toggle('menu-open');
      
      // Prevenir el comportamiento por defecto
      return false;
    });
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
      if (!mainNav.contains(e.target) && !menuToggle.contains(e.target) {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  }
});

  // =============================================
  // LAZY LOADING PARA IMÁGENES
  // =============================================
  if ('loading' in HTMLImageElement.prototype) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
      img.loading = 'lazy';
    });
  } else {
    const lazyLoad = function() {
      const lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
      
      if ('IntersectionObserver' in window) {
        const lazyImageObserver = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              const lazyImage = entry.target;
              lazyImage.src = lazyImage.dataset.src;
              lazyImage.classList.remove('lazy');
              lazyImageObserver.unobserve(lazyImage);
            }
          });
        });
        
        lazyImages.forEach(function(lazyImage) {
          lazyImageObserver.observe(lazyImage);
        });
      }
    };
    
    document.addEventListener('DOMContentLoaded', lazyLoad);
    window.addEventListener('load', lazyLoad);
    window.addEventListener('resize', lazyLoad);
    window.addEventListener('scroll', lazyLoad);
  }

  // =============================================
  // SCROLL SUAVE PARA ENLACES
  // =============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });

  // =============================================
  // ANIMACIONES CON INTERSECTION OBSERVER
  // =============================================
  const animateOnScroll = function() {
    const elementsToAnimate = document.querySelectorAll('.fade-in, .feature, .testimonial');
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          }
        });
      }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      });
      
      elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
      });
    } else {
      // Fallback para navegadores sin IntersectionObserver
      elementsToAnimate.forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      });
    }
  };
  
  animateOnScroll();

  // =============================================
  // TESTIMONIOS - VERSIÓN CORREGIDA
  // =============================================
  const testimonios = document.querySelectorAll('.testimonial');
  
  if (testimonios.length > 0) {
    testimonios.forEach(testimonio => {
      testimonio.style.opacity = '1';
      testimonio.style.transform = 'translateY(0)';
    });

    // Slider táctil mejorado
    const slider = document.querySelector('.testimonial-slider');
    if (slider) {
      let isDown = false;
      let startX;
      let scrollLeft;

      slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });

      slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'grab';
      });

      slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab';
      });

      slider.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
      });

      // Estilo inicial
      slider.style.cursor = 'grab';
    }
  }

  // =============================================
  // ACTUALIZACIÓN DE PRECIOS (opcional)
  // =============================================
  function actualizarPrecios() {
    const tipoCambio = localStorage.getItem('tipoCambio') || 3.7;
    const simboloSol = 'S/';
    const simboloDolar = '$';
    
    document.querySelectorAll('.price[data-price-usd]').forEach(priceEl => {
      const precioUSD = parseFloat(priceEl.dataset.priceUsd);
      const precioSOL = precioUSD * tipoCambio;
      
      const formatoUSD = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      }).format(precioUSD).replace('$', simboloDolar);
      
      const formatoSOL = new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN',
        minimumFractionDigits: 2
      }).format(precioSOL).replace('PEN', simboloSol);
      
      if (priceEl.querySelector('.price-sol')) {
        priceEl.querySelector('.price-sol').textContent = formatoSOL;
      }
      if (priceEl.querySelector('.price-usd')) {
        priceEl.querySelector('.price-usd').textContent = formatoUSD;
      }
      
      const noteEl = priceEl.closest('.price-container').querySelector('.price-note');
      if (noteEl) {
        noteEl.textContent = `*Precio en dólares convertido a soles (Tipo de cambio: ${tipoCambio})`;
      }
    });
  }

  // Ejecutar al cargar la página
  actualizarPrecios();
  
  // Añadir botón de toggle (opcional)
  const toggleHTML = `
    <div class="currency-toggle" id="toggleCurrency">
      Mostrar en: <span id="currentCurrency">Soles</span>
    </div>
  `;
  document.querySelector('main').insertAdjacentHTML('afterbegin', toggleHTML);
  
  // Toggle entre monedas
  document.getElementById('toggleCurrency')?.addEventListener('click', function() {
    const prices = document.querySelectorAll('.price-sol, .price-usd');
    const current = document.getElementById('currentCurrency');
    
    prices.forEach(price => {
      price.style.display = price.style.display === 'none' ? 'inline-block' : 'none';
    });
    
    if (current) {
      current.textContent = current.textContent === 'Soles' ? 'Dólares' : 'Soles';
    }
  });

  // =============================================
  // AÑO ACTUAL EN EL FOOTER
  // =============================================
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
});