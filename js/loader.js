/**
 * Page Loader Module
 */

export function initLoader() {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 500);
        });
    }
}
