document.addEventListener('DOMContentLoaded', function () {
  // Menú móvil
  const menuToggle = document.getElementById('mobile-menu');
  const nav = document.getElementById('main-nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }

  // Lazy loading manual fallback (para navegadores antiguos)
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      img.loading = 'lazy';
    });
  }

  // Scroll suave
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Carrito de compras (productos.html)
  if (document.querySelector('.products-grid')) {
    const cart = [];

    document.querySelectorAll('.product .btn').forEach(button => {
      button.addEventListener('click', function () {
        const product = this.closest('.product');
        const name = product.querySelector('h3')?.textContent.trim();
        alert(`Has añadido ${name} a tu carrito`);
        cart.push(name);
        localStorage.setItem('carrito', JSON.stringify(cart));
      });
    });
  }

  // Animaciones con IntersectionObserver
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-observe').forEach(el => observer.observe(el));
});