/**
 * Scroll Animations Module
 */

export function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.experience-card, .edu-card, .skill-category, .cert-card, .feature-card, .project-card');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * Init fade-in animations on page load
 */
export function initFadeInAnimations() {
    document.querySelectorAll('.fade-in-up').forEach(el => {
        el.classList.add('visible');
    });
}
