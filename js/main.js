// main.js - Código JavaScript optimizado

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const menuToggle = document.getElementById('mobile-menu');
  const mainNav = document.getElementById('main-nav');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      const icon = this.querySelector('i');
      icon.classList.toggle('fa-times');
      icon.classList.toggle('fa-bars');
      
      // Cerrar menú al hacer clic en un enlace
      if (mainNav.classList.contains('active')) {
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
          link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            icon.classList.replace('fa-times', 'fa-bars');
          });
        });
      }
    });
  }
  
  // Lazy loading para imágenes
  if ('loading' in HTMLImageElement.prototype) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
      img.loading = 'lazy';
    });
  } else {
    // Polyfill para lazy loading en navegadores antiguos
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
  
  // Smooth scrolling para anchor links
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
        
        // Cerrar menú móvil si está abierto
        if (mainNav && mainNav.classList.contains('active')) {
          mainNav.classList.remove('active');
          const icon = menuToggle.querySelector('i');
          if (icon) icon.classList.replace('fa-times', 'fa-bars');
        }
      }
    });
  });
  
  // Animaciones con IntersectionObserver
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
  
  // Iniciar animaciones
  animateOnScroll();
  
  // Eventos de conversión (para analytics)
  const trackConversion = function(event) {
    // Aquí iría tu código de seguimiento (Google Analytics, Facebook Pixel, etc.)
    console.log('Evento de conversión: ' + event.target.textContent.trim());
  };
  
  document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta').forEach(button => {
    button.addEventListener('click', trackConversion);
  });
  
  // Actualizar año actual en el footer
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
});