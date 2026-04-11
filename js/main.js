/**
 * Muhammad Aji Putra - Portfolio JavaScript
 * Main Entry Point - Initialize after components loaded
 */

import { initLoader } from './loader.js';
import { initNavigation } from './navigation.js';
import { initSmoothScroll } from './smooth-scroll.js';
import { initScrollAnimations, initFadeInAnimations } from './scroll-animations.js';
import { initScrollToTop } from './scroll-to-top.js';
import { initCounters } from './counters.js';
import { initTooltips } from './tooltips.js';
import { initMobileMenu } from './mobile-menu.js';
import { checkDarkMode, initLazyLoad, consoleEasterEgg } from './utils.js';

/**
 * Initialize all application modules
 */
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

// Wait for standalone component loader to finish
// component-loader-standalone.js dispatches 'allComponentsLoaded' when done
document.addEventListener('allComponentsLoaded', function() {
    console.log('All components loaded, starting app...');
    initApp();
});

// Fallback: if no standalone loader, wait for DOM ready
document.addEventListener('DOMContentLoaded', function() {
    // Give component loader time to work (if present)
    setTimeout(function() {
        // Check if components still need loading
        var remaining = document.querySelectorAll('[data-include]').length;
        if (remaining === 0) {
            // Components already loaded or no components
            console.log('No pending components, starting app...');
            initApp();
        }
    }, 500);
    
    // Ultimate fallback - start anyway after 2 seconds
    setTimeout(function() {
        if (!window.appInitialized) {
            window.appInitialized = true;
            console.log('Fallback init...');
            initApp();
        }
    }, 2000);
});

// Make utility functions available globally
import { copyEmail, showToast, handleContactForm, toggleDarkMode } from './utils.js';
window.copyEmail = copyEmail;
window.showToast = showToast;
window.handleContactForm = handleContactForm;
window.toggleDarkMode = toggleDarkMode;
