import React, { useState, useEffect, useCallback, useRef } from 'react';

const GaleriaFotos = ({ fotos }) => {
    const [indiceAtual, setIndiceAtual] = useState(null); // null = modal fechado
    const toqueInicioX = useRef(null);

    const abrirModal = (index) => setIndiceAtual(index);
    const fecharModal = useCallback(() => setIndiceAtual(null), []);

    const irParaAnterior = useCallback(
        (e) => {
            if (e) e.stopPropagation();
            setIndiceAtual((i) => (i - 1 + fotos.length) % fotos.length);
        },
        [fotos.length]
    );

    const irParaProxima = useCallback(
        (e) => {
            if (e) e.stopPropagation();
            setIndiceAtual((i) => (i + 1) % fotos.length);
        },
        [fotos.length]
    );

    // Navegação por teclado: Esc fecha, setas navegam
    useEffect(() => {
        if (indiceAtual === null) return;

        const aoTeclar = (e) => {
            if (e.key === 'Escape') fecharModal();
            else if (e.key === 'ArrowLeft') irParaAnterior();
            else if (e.key === 'ArrowRight') irParaProxima();
        };
        window.addEventListener('keydown', aoTeclar);
        // Impede o scroll do fundo enquanto o modal está aberto
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', aoTeclar);
            document.body.style.overflow = '';
        };
    }, [indiceAtual, fecharModal, irParaAnterior, irParaProxima]);

    // Swipe no celular
    const aoTocarInicio = (e) => {
        toqueInicioX.current = e.touches[0].clientX;
    };
    const aoTocarFim = (e) => {
        if (toqueInicioX.current === null) return;
        const delta = e.changedTouches[0].clientX - toqueInicioX.current;
        if (Math.abs(delta) > 50) {
            if (delta < 0) irParaProxima();
            else irParaAnterior();
        }
        toqueInicioX.current = null;
    };

    const IconArrowLeft = () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
    );

    const IconArrowRight = () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    );

    const fotoSelecionada = indiceAtual !== null ? fotos[indiceAtual] : null;

    return (
        <div>
            <div className="galeria-grid">
                {fotos.map((foto, index) => (
                    <button
                        key={index}
                        className="galeria-item"
                        onClick={() => abrirModal(index)}
                        aria-label={`Abrir foto: ${foto.descricao || foto.alt}`}
                    >
                        <img
                            src={foto.src}
                            alt={foto.descricao || foto.alt}
                            className="galeria-thumbnail"
                            loading="lazy"
                            decoding="async"
                        />
                    </button>
                ))}
            </div>

            {fotoSelecionada && (
                <div
                    className="galeria-modal-backdrop"
                    onClick={fecharModal}
                    onTouchStart={aoTocarInicio}
                    onTouchEnd={aoTocarFim}
                    role="dialog"
                    aria-modal="true"
                >
                    <button className="galeria-modal-nav prev" onClick={irParaAnterior} aria-label="Foto anterior">
                        <IconArrowLeft />
                    </button>

                    <div className="galeria-modal-content" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={fotoSelecionada.src}
                            alt={fotoSelecionada.descricao || fotoSelecionada.alt}
                            className="galeria-modal-img"
                        />
                        <p className="galeria-modal-descricao">{fotoSelecionada.descricao}</p>
                    </div>

                    <button className="galeria-modal-nav next" onClick={irParaProxima} aria-label="Próxima foto">
                        <IconArrowRight />
                    </button>

                    <button className="galeria-modal-fechar" onClick={fecharModal} aria-label="Fechar">
                        &times;
                    </button>
                </div>
            )}
        </div>
    );
};

export default GaleriaFotos;
