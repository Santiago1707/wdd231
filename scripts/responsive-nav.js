document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menu-button');
    const primaryNav = document.getElementById('primary-nav');
    
    menuButton.addEventListener('click', function() {
        primaryNav.classList.toggle('show');
        const isExpanded = primaryNav.classList.contains('show');
        this.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close menu when clicking on a nav item (for mobile)
    document.querySelectorAll('#primary-nav a').forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                primaryNav.classList.remove('show');
                menuButton.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Update aria-expanded on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            primaryNav.classList.remove('show');
            menuButton.setAttribute('aria-expanded', 'false');
        }
    });
});