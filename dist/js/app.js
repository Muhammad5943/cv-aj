/**
 * Muhammad Aji Putra - Portfolio JavaScript
 * Main Entry Point - All functions combined (no ES6 modules)
 */

// ============================================================
// UTILS.JS FUNCTIONS
// ============================================================

/**
 * Debounce function for performance
 */
function debounce(func, wait) {
    var timeout;
    return function executedFunction() {
        var args = arguments;
        var later = function() {
            clearTimeout(timeout);
            func.apply(null, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for scroll events
 */
function throttle(func, limit) {
    var inThrottle;
    return function() {
        var args = arguments;
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(function() { inThrottle = false; }, limit);
        }
    };
}

/**
 * Copy email to clipboard
 */
function copyEmail() {
    var email = 'muhammad.aji.putra.mp98@gmail.com';
    navigator.clipboard.writeText(email).then(function() {
        showToast('Email copied to clipboard!', 'success');
    }).catch(function() {
        showToast('Failed to copy email', 'error');
    });
}

/**
 * Show toast notification
 */
function showToast(message, type) {
    type = type || 'info';
    var toastContainer = document.createElement('div');
    toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
    toastContainer.style.zIndex = '9999';
    
    var bgClass = type === 'success' ? 'bg-success' : type === 'error' ? 'bg-danger' : 'bg-primary';
    
    toastContainer.innerHTML = 
        '<div class="toast align-items-center text-white ' + bgClass + ' border-0" role="alert">' +
            '<div class="d-flex">' +
                '<div class="toast-body">' + message + '</div>' +
                '<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>' +
            '</div>' +
        '</div>';
    
    document.body.appendChild(toastContainer);
    
    var toast = new bootstrap.Toast(toastContainer.querySelector('.toast'), {
        delay: 3000
    });
    
    toast.show();
    
    toast._element.addEventListener('hidden.bs.toast', function() {
        toastContainer.remove();
    });
}

/**
 * Typing Effect
 */
function initTypingEffect() {
    var typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        var text = typingElement.getAttribute('data-text');
        var chars = text.split('');
        var i = 0;
        
        typingElement.textContent = '';
        
        function type() {
            if (i < chars.length) {
                typingElement.textContent += chars[i];
                i++;
                setTimeout(type, 100);
            }
        }
        
        type();
    }
}

/**
 * Dark Mode Toggle
 */
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    var isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

/**
 * Check for saved dark mode preference
 */
function checkDarkMode() {
    var savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
    }
}

/**
 * Lazy Load Images
 */
function initLazyLoad() {
    var lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length === 0) return;
    
    var imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(function(img) { imageObserver.observe(img); });
}

/**
 * Contact Form Handler
 */
function handleContactForm(e) {
    e.preventDefault();
    
    var form = e.target;
    var formData = new FormData(form);
    
    var submitBtn = form.querySelector('button[type="submit"]');
    var originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
    
    setTimeout(function() {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        form.reset();
        showToast('Message sent successfully!', 'success');
    }, 2000);
}

/**
 * Console Easter Egg
 */
function consoleEasterEgg() {
    console.log('%c👋 Hey there, curious developer!', 'font-size: 20px; font-weight: bold; color: #2563eb;');
    console.log('%cLooking for a software engineer? Let\'s talk!', 'font-size: 14px; color: #64748b;');
    console.log('%c📧 muhammad.aji.putra.mp98@gmail.com', 'font-size: 14px; color: #2563eb;');
    console.log('%c🔗 https://linkedin.com/in/muhammad-aji-putra-a53348139', 'font-size: 12px; color: #64748b;');
}

// ============================================================
// LOADER.JS FUNCTIONS
// ============================================================

function initLoader() {
    var loader = document.getElementById('pageLoader');
    if (loader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                loader.classList.add('hidden');
            }, 500);
        });
    }
}

// ============================================================
// NAVIGATION.JS FUNCTIONS
// ============================================================

function initNavigation() {
    var navbar = document.querySelector('.navbar');
    var navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Active link on scroll
    var sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        var current = '';
        
        sections.forEach(function(section) {
            var sectionTop = section.offsetTop;
            var sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ============================================================
// SMOOTH-SCROLL.JS FUNCTIONS
// ============================================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            var targetId = this.getAttribute('href');
            var targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                var navHeight = document.querySelector('.navbar').offsetHeight;
                var offsetTop = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                var mobileMenu = document.getElementById('mobileMenu');
                var bsCollapse = bootstrap.Collapse.getInstance(mobileMenu);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    });
}

// ============================================================
// SCROLL-ANIMATIONS.JS FUNCTIONS
// ============================================================

function initScrollAnimations() {
    var animatedElements = document.querySelectorAll('.experience-card, .edu-card, .skill-category, .cert-card, .feature-card, .project-card');
    
    var observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function initFadeInAnimations() {
    document.querySelectorAll('.fade-in-up').forEach(function(el) {
        el.classList.add('visible');
    });
}

// ============================================================
// SCROLL-TO-TOP.JS FUNCTIONS
// ============================================================

function initScrollToTop() {
    var scrollTopBtn = document.getElementById('scrollTop');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ============================================================
// COUNTERS.JS FUNCTIONS
// ============================================================

function initCounters() {
    var counters = document.querySelectorAll('.counter');
    
    if (counters.length === 0) return;
    
    var counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var counter = entry.target;
                var target = parseInt(counter.getAttribute('data-target'));
                var duration = 2000; // 2 seconds
                var increment = target / (duration / 16); // 60fps
                
                var current = 0;
                function updateCounter() {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                }
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(function(counter) {
        counterObserver.observe(counter);
    });
}

// ============================================================
// TOOLTIPS.JS FUNCTIONS
// ============================================================

function initTooltips() {
    var tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    var tooltipList = [].slice.call(tooltipTriggerList).map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// ============================================================
// MOBILE-MENU.JS FUNCTIONS
// ============================================================

function initMobileMenu() {
    var navbarToggler = document.querySelector('.navbar-toggler');
    var mobileMenu = document.getElementById('mobileMenu');
    
    if (navbarToggler && mobileMenu) {
        document.addEventListener('click', function(e) {
            if (!navbarToggler.contains(e.target) && !mobileMenu.contains(e.target)) {
                var bsCollapse = bootstrap.Collapse.getInstance(mobileMenu);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    }
}

// ============================================================
// COMPONENT-LOADER.JS FUNCTIONS
// ============================================================

function loadComponent(element) {
    var filePath = element.getAttribute('data-include');
    
    if (!filePath) return Promise.resolve();
    
    return fetch(filePath).then(function(response) {
        if (!response.ok) {
            throw new Error('Failed to load ' + filePath + ': ' + response.status + ' ' + response.statusText);
        }
        return response.text();
    }).then(function(html) {
        element.innerHTML = html;
        element.removeAttribute('data-include');
        
        element.dispatchEvent(new CustomEvent('componentLoaded', { 
            detail: { path: filePath },
            bubbles: true 
        }));
    }).catch(function(error) {
        console.error('Component loader error:', error);
        element.innerHTML = '<!-- Failed to load component: ' + filePath + ' -->';
    });
}

function loadAllComponents() {
    var elements = document.querySelectorAll('[data-include]');
    
    if (elements.length === 0) return Promise.resolve();
    
    var promises = Array.from(elements).map(loadComponent);
    
    return Promise.all(promises);
}

function initComponentLoader() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            loadAllComponents().then(function() {
                document.dispatchEvent(new CustomEvent('allComponentsLoaded'));
            });
        });
    } else {
        loadAllComponents().then(function() {
            document.dispatchEvent(new CustomEvent('allComponentsLoaded'));
        });
    }
}

// ============================================================
// MAIN INITIALIZATION
// ============================================================

function initApp() {
    console.log('Initializing app...');
    initLoader();
    initNavigation();
    initSmoothScroll();
    initScrollAnimations();
    initFadeInAnimations();
    initScrollToTop();
    initCounters();
    initTooltips();
    initMobileMenu();
    checkDarkMode();
    initLazyLoad();
    consoleEasterEgg();
}

// Wait for components to load
document.addEventListener('allComponentsLoaded', function() {
    console.log('All components loaded, starting app...');
    initApp();
});

// Fallback: if no component loader events
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        var remaining = document.querySelectorAll('[data-include]').length;
        if (remaining === 0) {
            console.log('No pending components, starting app...');
            initApp();
        }
    }, 500);
    
    setTimeout(function() {
        if (!window.appInitialized) {
            window.appInitialized = true;
            console.log('Fallback init...');
            initApp();
        }
    }, 2000);
});

// Initialize component loader
initComponentLoader();

// Make utility functions available globally
window.copyEmail = copyEmail;
window.showToast = showToast;
window.handleContactForm = handleContactForm;
window.toggleDarkMode = toggleDarkMode;
