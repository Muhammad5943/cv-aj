/**
 * Mobile Menu Module
 */

export function initMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (navbarToggler && mobileMenu) {
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbarToggler.contains(e.target) && !mobileMenu.contains(e.target)) {
                const bsCollapse = bootstrap.Collapse.getInstance(mobileMenu);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    }
}
