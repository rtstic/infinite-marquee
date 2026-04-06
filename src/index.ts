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
    duration: 150,
    selector: "[rtstic-marquee='list']"
};

function log(level: 'warn' | 'error' | 'log', message: string): void {
    if (!window.rtsticDebug) return;
    console[level](`[rtstic-marquee] ${message}`);
}

function initializeSingleMarquee(marquee: HTMLElement, config: MarqueeConfig): boolean {
    const originalHTML: string = marquee.innerHTML;
    if (!originalHTML.trim()) {
        log('warn', 'Marquee element is empty, skipping');
        return false;
    }

    // First copy is visible to screen readers, rest are hidden
    let duplicatedHTML: string = originalHTML;
    for (let i = 1; i < config.multiplier; i++) {
        duplicatedHTML += `<div aria-hidden="true" style="display:contents">${originalHTML}</div>`;
    }

    marquee.innerHTML = duplicatedHTML;

    const translateEnd = -100 / config.multiplier;
    marquee.style.setProperty('--translate-end', `${translateEnd}%`);
    marquee.style.setProperty('--duration', `${config.duration / config.multiplier}s`);

    return true;
}

function initializeMarquee(config: MarqueeConfig = DEFAULT_CONFIG): boolean {
    try {
        if (!config.multiplier || config.multiplier < 2) {
            log('warn', 'multiplier should be at least 2, using default of 4');
            config.multiplier = DEFAULT_CONFIG.multiplier;
        }

        if (!config.duration || config.duration <= 0) {
            log('warn', 'duration should be greater than 0, using default of 150');
            config.duration = DEFAULT_CONFIG.duration;
        }

        const marquees = document.querySelectorAll<HTMLElement>(config.selector);

        if (!marquees.length) {
            log('error', `No elements found with selector "${config.selector}"`);
            return false;
        }

        let successCount = 0;
        marquees.forEach((marquee, index) => {
            const instanceConfig = { ...config };
            const dataMultiplier = marquee.dataset.multiplier;
            const dataDuration = marquee.dataset.duration;

            if (dataMultiplier) instanceConfig.multiplier = parseInt(dataMultiplier, 10);
            if (dataDuration) instanceConfig.duration = parseInt(dataDuration, 10);

            if (initializeSingleMarquee(marquee, instanceConfig)) {
                successCount++;
                log('log', `Instance ${index + 1} initialized`);
            }
        });

        log('log', `${successCount}/${marquees.length} instances initialized`);
        return successCount > 0;
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