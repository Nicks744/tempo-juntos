import React, { useState, useEffect } from 'react';
import './Splash.css';

/*
 * Tela de abertura: mostra os nomes com um coração pulsando e some suavemente.
 * Aparece só uma vez por sessão para não cansar.
 */
const Splash = () => {
    const [visivel, setVisivel] = useState(() => {
        try {
            return !sessionStorage.getItem('splash-visto');
        } catch {
            return true;
        }
    });
    const [saindo, setSaindo] = useState(false);

    useEffect(() => {
        if (!visivel) return;

        try {
            sessionStorage.setItem('splash-visto', '1');
        } catch {
            /* ignora ambientes sem storage */
        }

        const inicioSaida = setTimeout(() => setSaindo(true), 1900);
        const remover = setTimeout(() => setVisivel(false), 2700);
        return () => {
            clearTimeout(inicioSaida);
            clearTimeout(remover);
        };
    }, [visivel]);

    if (!visivel) return null;

    return (
        <div className={`splash ${saindo ? 'splash-saindo' : ''}`} aria-hidden="true">
            <div className="splash-conteudo">
                <div className="splash-coracao">❤️</div>
                <h1 className="splash-nomes">Lucas &amp; Cecília</h1>
                <p className="splash-sub">nossa história...</p>
            </div>
        </div>
    );
};

export default Splash;
