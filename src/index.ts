/**
 * rtstic-marquee TypeScript Implementation
 * Initializes infinite marquee with error checking and warnings
 */

interface MarqueeConfig {
    multiplier: number;
    duration: number;
    selector: string;
}

const DEFAULT_CONFIG: MarqueeConfig = {
    multiplier: 4,
    duration: 100,
    selector: "[rtstic-marquee='list']"
};

/**
 * Initialize the marquee component
 * @param config - Configuration object for marquee
 * @returns boolean - Success status
 */
function initializeMarquee(config: MarqueeConfig = DEFAULT_CONFIG): boolean {
    try {
        // Validate config
        if (!config.multiplier || config.multiplier < 2) {
            console.warn('[rtstic-marquee] Warning: multiplier should be at least 2, using default of 4');
            config.multiplier = DEFAULT_CONFIG.multiplier;
        }

        if (!config.duration || config.duration <= 0) {
            console.warn('[rtstic-marquee] Warning: duration should be greater than 0, using default of 20');
            config.duration = DEFAULT_CONFIG.duration;
        }

        // Find marquee element
        const marquee: HTMLElement | null = document.querySelector(config.selector);

        if (!marquee) {
            console.error(`[rtstic-marquee] Error: Element with selector "${config.selector}" not found`);
            return false;
        }

        // Check if marquee has content
        const originalHTML: string = marquee.innerHTML;
        if (!originalHTML.trim()) {
            console.warn('[rtstic-marquee] Warning: Marquee element is empty');
            return false;
        }

        // Create duplicated content
        let duplicatedHTML: string = '';
        for (let i = 0; i < config.multiplier; i++) {
            duplicatedHTML += originalHTML;
        }

        marquee.innerHTML = duplicatedHTML;

        // Set CSS variables
        marquee.style.setProperty('--multiplier', config.multiplier.toString());
        marquee.style.setProperty('--duration', `${config.duration / config.multiplier}s`);

        console.log(`[rtstic-marquee] Successfully initialized with multiplier: ${config.multiplier}, duration: ${config.duration}s`);
        return true;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`[rtstic-marquee] Error: ${error.message}`);
        } else {
            console.error('[rtstic-marquee] Error: An unknown error occurred');
        }
        return false;
    }
}

/**
 * Initialize on DOM load
 */
function onDOMReady(): void {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initializeMarquee();
        });
    } else {
        // DOM is already ready
        initializeMarquee();
    }
}

// Start initialization
onDOMReady();

// Export for use in other modules if needed
export { initializeMarquee, DEFAULT_CONFIG };
export type { MarqueeConfig };