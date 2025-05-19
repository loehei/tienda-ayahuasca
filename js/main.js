// Funcionalidad básica del carrito
document.addEventListener('DOMContentLoaded', function() {
    // Aquí puedes añadir funcionalidad para el carrito de compras
    console.log('Tienda de Ayahuasca cargada');
    
    // Ejemplo: Añadir producto al carrito
    const addToCartButtons = document.querySelectorAll('.product .btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.closest('.product');
            const productName = product.querySelector('h3').textContent;
            alert(`Has añadido ${productName} a tu carrito`);
            // Aquí iría la lógica real para añadir al carrito
        });
    });
});
// Mobile Menu
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('mobile-menu');
    const nav = document.getElementById('main-nav');
    
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Lazy loading para imágenes
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.loading = 'lazy';
        });
    }
});
