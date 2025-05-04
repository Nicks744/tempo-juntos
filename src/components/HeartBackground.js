import React, { useEffect } from 'react';
import './HeartBackground.css';

const HeartBackground = () => {
    useEffect(() => {
        const interval = setInterval(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = 3 + Math.random() * 2 + 's'; // Duração aleatória entre 3-5s

            heart.innerText = '🌻';
            document.body.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 5000); // Remove após a animação
        }, 300); // Frequência de surgimento

        return () => clearInterval(interval);
    }, []);

    return null; // Não renderiza nada diretamente
};

export default HeartBackground;
