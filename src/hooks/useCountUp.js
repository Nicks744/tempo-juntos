import { useState, useRef, useEffect } from 'react';

/*
 * Anima um número de onde estava até o valor alvo (efeito "contagem").
 * Reanima só quando o alvo realmente muda de valor.
 */
const useCountUp = (target, duration = 1400) => {
    const [valor, setValor] = useState(0);
    const deRef = useRef(0);

    useEffect(() => {
        // Respeita preferência por menos movimento
        const prefereMenos =
            typeof window !== 'undefined' &&
            window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefereMenos) {
            setValor(target);
            deRef.current = target;
            return;
        }

        const de = deRef.current;
        const inicio = performance.now();
        let raf;

        const passo = (agora) => {
            const t = Math.min(1, (agora - inicio) / duration);
            const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
            setValor(Math.round(de + (target - de) * eased));
            if (t < 1) {
                raf = requestAnimationFrame(passo);
            } else {
                deRef.current = target;
            }
        };

        raf = requestAnimationFrame(passo);
        return () => cancelAnimationFrame(raf);
    }, [target, duration]);

    return valor;
};

export default useCountUp;
