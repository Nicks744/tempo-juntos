import React, { useEffect, useRef } from 'react';

/*
 * Confete leve em canvas, sem dependências externas.
 * Dispara quando `ativo` vira true e para sozinho após `duracao` ms.
 */
const CORES = ['#f5e6a1', '#e91e63', '#ffffff', '#ffd1dc', '#f39c12'];

const Confetti = ({ ativo, duracao = 5000 }) => {
    const canvasRef = useRef(null);
    const animRef = useRef(null);

    useEffect(() => {
        if (!ativo) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const ajustarTamanho = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        ajustarTamanho();
        window.addEventListener('resize', ajustarTamanho);

        // Cria as partículas com valores pseudo-aleatórios
        const total = 160;
        const particulas = Array.from({ length: total }, (_, i) => ({
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height,
            r: 4 + Math.random() * 6,
            cor: CORES[i % CORES.length],
            velY: 2 + Math.random() * 4,
            velX: -2 + Math.random() * 4,
            rot: Math.random() * Math.PI,
            velRot: -0.1 + Math.random() * 0.2,
        }));

        const inicio = performance.now();

        const desenhar = (agora) => {
            const decorrido = agora - inicio;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particulas.forEach((p) => {
                p.y += p.velY;
                p.x += p.velX;
                p.rot += p.velRot;
                if (p.y > canvas.height + 20) {
                    p.y = -20;
                    p.x = Math.random() * canvas.width;
                }
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rot);
                // Some suavemente no final
                ctx.globalAlpha =
                    decorrido > duracao - 1000
                        ? Math.max(0, (duracao - decorrido) / 1000)
                        : 1;
                ctx.fillStyle = p.cor;
                ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6);
                ctx.restore();
            });

            if (decorrido < duracao) {
                animRef.current = requestAnimationFrame(desenhar);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        };

        animRef.current = requestAnimationFrame(desenhar);

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener('resize', ajustarTamanho);
        };
    }, [ativo, duracao]);

    if (!ativo) return null;

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9998,
            }}
        />
    );
};

export default Confetti;
