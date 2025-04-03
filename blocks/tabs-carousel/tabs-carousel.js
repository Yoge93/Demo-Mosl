import { createOptimizedPicture } from '../../scripts/lib-franklin.js';
import { decorateCarousel } from '../carousel/carousel.js';
import { decorateTabs } from '../tabs/tabs.js';
/**
 * Initialize Tabs with Carousel inside AEM Edge Delivery System
 * @param {Element} block - The parent block containing tabs and carousel
 */
export default async function decorate(block) {
    // Decorate Tabs
    decorateTabs(block);
    // Find all tab panels
    const tabPanels = block.querySelectorAll('.tabs-panel');
    tabPanels.forEach((panel) => {
        const carousel = panel.querySelector('.carousel');
        if (carousel) {
            // Initialize the Carousel inside each tab
            decorateCarousel(carousel);
            // Add click event listener for image redirection
            carousel.querySelectorAll('.carousel-image').forEach((img) => {
                img.addEventListener('click', () => {
                    const url = img.dataset.url;
                    if (url) {
                        window.location.href = url;
                    }
                });
            });
        }
    });
}
