import { useEffect } from 'react';
import Lenis from 'lenis';

export default function useLenisScroll() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true,

            // Prevent Lenis from hijacking nested scroll containers
            prevent: (node) => {
                return node.closest('[data-lenis-prevent]');
            },
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);
}
