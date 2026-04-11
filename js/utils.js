/**
 * Utility Functions Module
 */

/**
 * Debounce function for performance
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for scroll events
 */
export function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Copy email to clipboard
 */
export function copyEmail() {
    const email = 'muhammad.aji.putra.mp98@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard!', 'success');
    }).catch(() => {
        showToast('Failed to copy email', 'error');
    });
}

/**
 * Show toast notification
 */
export function showToast(message, type = 'info') {
    const toastContainer = document.createElement('div');
    toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
    toastContainer.style.zIndex = '9999';
    
    const bgClass = type === 'success' ? 'bg-success' : type === 'error' ? 'bg-danger' : 'bg-primary';
    
    toastContainer.innerHTML = `
        <div class="toast align-items-center text-white ${bgClass} border-0" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    
    document.body.appendChild(toastContainer);
    
    const toast = new bootstrap.Toast(toastContainer.querySelector('.toast'), {
        delay: 3000
    });
    
    toast.show();
    
    toast._element.addEventListener('hidden.bs.toast', () => {
        toastContainer.remove();
    });
}

/**
 * Typing Effect
 */
export function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const text = typingElement.getAttribute('data-text');
        const chars = text.split('');
        let i = 0;
        
        typingElement.textContent = '';
        
        const type = () => {
            if (i < chars.length) {
                typingElement.textContent += chars[i];
                i++;
                setTimeout(type, 100);
            }
        };
        
        type();
    }
}

/**
 * Dark Mode Toggle
 */
export function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

/**
 * Check for saved dark mode preference
 */
export function checkDarkMode() {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
    }
}

/**
 * Lazy Load Images
 */
export function initLazyLoad() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length === 0) return;
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

/**
 * Contact Form Handler
 */
export function handleContactForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Simulate form submission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
    
    setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        form.reset();
        showToast('Message sent successfully!', 'success');
    }, 2000);
}

/**
 * Console Easter Egg
 */
export function consoleEasterEgg() {
    console.log('%c👋 Hey there, curious developer!', 'font-size: 20px; font-weight: bold; color: #2563eb;');
    console.log('%cLooking for a software engineer? Let\'s talk!', 'font-size: 14px; color: #64748b;');
    console.log('%c📧 muhammad.aji.putra.mp98@gmail.com', 'font-size: 14px; color: #2563eb;');
    console.log('%c🔗 https://linkedin.com/in/muhammad-aji-putra-a53348139', 'font-size: 12px; color: #64748b;');
}
