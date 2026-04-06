interface MarqueeConfig {
    multiplier: number;
    duration: number;
    selector: string;
}

declare global {
    interface Window {
        rtsticDebug?: boolean;
    }
}

const DEFAULT_CONFIG: MarqueeConfig = {
    multiplier: 4,
    duration: 100,
    selector: "[rtstic-marquee='list']"
};

function log(level: 'warn' | 'error' | 'log', message: string): void {
    if (!window.rtsticDebug) return;
    console[level](`[rtstic-marquee] ${message}`);
}

function initializeMarquee(config: MarqueeConfig = DEFAULT_CONFIG): boolean {
    try {
        if (!config.multiplier || config.multiplier < 2) {
            log('warn', 'multiplier should be at least 2, using default of 4');
            config.multiplier = DEFAULT_CONFIG.multiplier;
        }

        if (!config.duration || config.duration <= 0) {
            log('warn', 'duration should be greater than 0, using default of 100');
            config.duration = DEFAULT_CONFIG.duration;
        }

        const marquee: HTMLElement | null = document.querySelector(config.selector);

        if (!marquee) {
            log('error', `Element with selector "${config.selector}" not found`);
            return false;
        }

        const originalHTML: string = marquee.innerHTML;
        if (!originalHTML.trim()) {
            log('warn', 'Marquee element is empty');
            return false;
        }

        let duplicatedHTML: string = '';
        for (let i = 0; i < config.multiplier; i++) {
            duplicatedHTML += originalHTML;
        }

        marquee.innerHTML = duplicatedHTML;

        const translateEnd = -100 / config.multiplier;
        marquee.style.setProperty('--translate-end', `${translateEnd}%`);
        marquee.style.setProperty('--duration', `${config.duration / config.multiplier}s`);

        log('log', `Successfully initialized with multiplier: ${config.multiplier}, duration: ${config.duration}s`);
        return true;
    } catch (error: unknown) {
        if (error instanceof Error) {
            log('error', error.message);
        } else {
            log('error', 'An unknown error occurred');
        }
        return false;
    }
}

function onDOMReady(): void {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => initializeMarquee());
    } else {
        initializeMarquee();
    }
}

onDOMReady();

export { initializeMarquee, DEFAULT_CONFIG };
export type { MarqueeConfig };