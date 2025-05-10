document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menu-button');
    const primaryNav = document.getElementById('primary-nav');
    
    // Crear overlay dinámicamente
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    // Función para alternar el menú
    function toggleMenu() {
        primaryNav.classList.toggle('show');
        overlay.classList.toggle('active');
        menuButton.setAttribute('aria-expanded', primaryNav.classList.contains('show'));
        
        // Bloquear/desbloquear scroll del body
        document.body.style.overflow = primaryNav.classList.contains('show') ? 'hidden' : '';
    }

    // Evento para el botón del menú
    menuButton.addEventListener('click', toggleMenu);

    // Evento para cerrar al hacer clic en overlay
    overlay.addEventListener('click', toggleMenu);

    // Evento para cerrar al hacer clic en un enlace (solo móvil)
    document.querySelectorAll('#primary-nav a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });

    // Evento para redimensionamiento de pantalla
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            primaryNav.classList.remove('show');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            menuButton.setAttribute('aria-expanded', 'false');
        }
    });
});