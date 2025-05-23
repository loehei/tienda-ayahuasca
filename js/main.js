document.addEventListener('DOMContentLoaded', function() {
  // Lazy loading para imágenes
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

  // Scroll suave
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

  // Animaciones
  const animateOnScroll = function() {
    const elementsToAnimate = document.querySelectorAll('.fade-in');
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      elementsToAnimate.forEach(element => {
        observer.observe(element);
      });
    } else {
      elementsToAnimate.forEach(element => {
        element.classList.add('animate');
      });
    }
  };
  
  animateOnScroll();

  // Actualizar año en footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
});