/**
 * Component Loader Module
 * Automatically includes HTML components using data-include attribute
 * Usage: <div data-include="./components/nav.html"></div>
 */

/**
 * Load a single component into an element
 * @param {HTMLElement} element - Element with data-include attribute
 */
async function loadComponent(element) {
    const filePath = element.getAttribute('data-include');
    
    if (!filePath) return;
    
    try {
        const response = await fetch(filePath);
        
        if (!response.ok) {
            throw new Error(`Failed to load ${filePath}: ${response.status} ${response.statusText}`);
        }
        
        const html = await response.text();
        element.innerHTML = html;
        
        // Remove data-include attribute to prevent double loading
        element.removeAttribute('data-include');
        
        // Dispatch custom event when component is loaded
        element.dispatchEvent(new CustomEvent('componentLoaded', { 
            detail: { path: filePath },
            bubbles: true 
        }));
        
    } catch (error) {
        console.error('Component loader error:', error);
        element.innerHTML = `<!-- Failed to load component: ${filePath} -->`;
    }
}

/**
 * Load all components with data-include attribute
 * @returns {Promise} - Resolves when all components are loaded
 */
export async function loadAllComponents() {
    const elements = document.querySelectorAll('[data-include]');
    
    if (elements.length === 0) return Promise.resolve();
    
    const promises = Array.from(elements).map(loadComponent);
    
    return Promise.all(promises);
}

/**
 * Initialize component loader
 * Automatically loads all components on DOMContentLoaded
 */
export function initComponentLoader() {
    // Load components immediately if DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadAllComponents);
    } else {
        loadAllComponents();
    }
}

// Auto-initialize if script is loaded directly
if (typeof window !== 'undefined') {
    initComponentLoader();
}
