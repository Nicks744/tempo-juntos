import { useEffect, useCallback } from 'react';
import './HeartBackground.css';

const ICONES = ['🌻', '❤️', '✨', '🦊', '🤍'];

const HeartBackground = () => {
    // Coração que sobe a partir do clique (efeito original)
    const criarCoracao = useCallback((e) => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.animationDuration = (1 + Math.random()) + 's';
        heart.innerText = ICONES[Math.floor(Math.random() * ICONES.length)];
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 2000);
    }, []);

    useEffect(() => {
        window.addEventListener('click', criarCoracao);
        return () => window.removeEventListener('click', criarCoracao);
    }, [criarCoracao]);

    // Chuva de corações ambiente: caem suavemente do topo de tempos em tempos
    useEffect(() => {
        // Respeita quem prefere menos animação (acessibilidade / bateria)
        const prefereMenosMovimento =
            typeof window !== 'undefined' &&
            window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefereMenosMovimento) return;

        const criarChuva = () => {
            // Não acumula corações quando a aba está em segundo plano
            if (document.hidden) return;

            const heart = document.createElement('div');
            heart.className = 'heart-ambiente';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.fontSize = 12 + Math.random() * 18 + 'px';
            const duracao = 6 + Math.random() * 6; // 6-12s de queda
            heart.style.animationDuration = duracao + 's';
            heart.style.opacity = 0.25 + Math.random() * 0.4;
            heart.innerText = ICONES[Math.floor(Math.random() * ICONES.length)];
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), duracao * 1000);
        };

        const intervalo = setInterval(criarChuva, 1400);
        return () => clearInterval(intervalo);
    }, []);

    return null;
};

export default HeartBackground;
