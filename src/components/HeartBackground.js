import React, { useEffect, useCallback } from 'react';
import './HeartBackground.css';

const HeartBackground = () => {
    // Usamos useCallback para otimizar a função e evitar que seja recriada a cada renderização
    const criarCoracao = useCallback((e) => {
        const heart = document.createElement('div');
        heart.className = 'heart';

        // Posiciona o elemento no local do cursor
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        
        // Duração da animação e ícone aleatórios para dar mais vida
        heart.style.animationDuration = (1 + Math.random()) + 's'; // Duração entre 1-2s
        const icones = ['🌻', '❤️', '✨', '🦊'];
        heart.innerText = icones[Math.floor(Math.random() * icones.length)];

        document.body.appendChild(heart);

        // Remove o elemento do DOM depois que a animação terminar
        setTimeout(() => {
            heart.remove();
        }, 2000); // O tempo deve ser igual ou maior que a duração máxima da animação
    }, []);

    useEffect(() => {
        // Adiciona o "ouvinte" de cliques quando o componente é montado
        window.addEventListener('click', criarCoracao);

        // Função de limpeza: remove o "ouvinte" quando o componente é desmontado
        return () => {
            window.removeEventListener('click', criarCoracao);
        };
    }, [criarCoracao]);

    return null; // O componente em si não renderiza nada visível
};

export default HeartBackground;

