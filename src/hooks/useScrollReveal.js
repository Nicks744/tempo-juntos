import { useEffect, useRef, useState } from 'react';

/**
 * Revela um elemento com animação quando ele entra na viewport.
 * Uso:
 *   const [ref, visivel] = useScrollReveal();
 *   <section ref={ref} className={`reveal ${visivel ? 'is-visible' : ''}`}>
 */
const useScrollReveal = (options = {}) => {
    const ref = useRef(null);
    const [visivel, setVisivel] = useState(false);

    useEffect(() => {
        const elemento = ref.current;
        if (!elemento) return;

        // Fallback caso o navegador não suporte IntersectionObserver
        if (typeof IntersectionObserver === 'undefined') {
            setVisivel(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisivel(true);
                        observer.unobserve(entry.target); // Anima só uma vez
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px', ...options }
        );

        observer.observe(elemento);
        return () => observer.disconnect();
    }, [options]);

    return [ref, visivel];
};

export default useScrollReveal;
