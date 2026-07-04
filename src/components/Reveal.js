import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

/**
 * Envolve qualquer conteúdo e o anima suavemente quando entra na tela.
 * - delay: atraso opcional em ms (para efeito escalonado)
 * - direction: 'up' (padrão) | 'left' | 'right' | 'zoom'
 */
const Reveal = ({ children, delay = 0, direction = 'up', className = '' }) => {
    const [ref, visivel] = useScrollReveal();

    return (
        <div
            ref={ref}
            className={`reveal reveal-${direction} ${visivel ? 'is-visible' : ''} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default Reveal;
