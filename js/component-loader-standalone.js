/**
 * Component Loader - Standalone Version (No ES6 Modules)
 * Works with file:// protocol using XMLHttpRequest instead of fetch
 */

(function() {
    'use strict';

    // Detect if we're running from file:// protocol
    const isFileProtocol = window.location.protocol === 'file:';

    /**
     * Load a single component using XMLHttpRequest (works with file://)
     */
    function loadComponentXHR(element, filePath) {
        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 0) { // 0 = file:// success
                    element.innerHTML = xhr.responseText;
                    element.removeAttribute('data-include');
                    
                    // Dispatch custom event
                    var event = new CustomEvent('componentLoaded', {
                        detail: { path: filePath },
                        bubbles: true
                    });
                    element.dispatchEvent(event);
                } else {
                    console.error('Failed to load component:', filePath, 'Status:', xhr.status);
                    element.innerHTML = '<!-- Failed to load: ' + filePath + ' -->';
                }
            }
        };
        
        xhr.open('GET', filePath, true);
        xhr.send();
    }

    /**
     * Load a single component using fetch (for http://)
     */
    function loadComponentFetch(element, filePath) {
        fetch(filePath)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('HTTP ' + response.status);
                }
                return response.text();
            })
            .then(function(html) {
                element.innerHTML = html;
                element.removeAttribute('data-include');
                
                var event = new CustomEvent('componentLoaded', {
                    detail: { path: filePath },
                    bubbles: true
                });
                element.dispatchEvent(event);
            })
            .catch(function(error) {
                console.error('Component loader error:', error);
                element.innerHTML = '<!-- Failed to load: ' + filePath + ' -->';
            });
    }

    /**
     * Load all components
     */
    window.loadAllComponents = function() {
        var elements = document.querySelectorAll('[data-include]');
        
        elements.forEach(function(element) {
            var filePath = element.getAttribute('data-include');
            if (!filePath) return;
            
            if (isFileProtocol) {
                loadComponentXHR(element, filePath);
            } else {
                loadComponentFetch(element, filePath);
            }
        });
    };

    // Auto-load on DOM ready
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                loadAllComponents();
            });
        } else {
            loadAllComponents();
        }
    }

    init();
    
    // Dispatch event when all components finish loading
    document.addEventListener('componentLoaded', function checkAllLoaded() {
        var remaining = document.querySelectorAll('[data-include]').length;
        if (remaining === 0) {
            document.removeEventListener('componentLoaded', checkAllLoaded);
            setTimeout(function() {
                document.dispatchEvent(new CustomEvent('allComponentsLoaded'));
            }, 100);
        }
    });
})();
