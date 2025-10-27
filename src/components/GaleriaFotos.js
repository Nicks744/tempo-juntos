import React, { useState } from 'react';

const GaleriaFotos = ({ fotos }) => {
    const [fotoSelecionada, setFotoSelecionada] = useState(null);
    const [indiceAtual, setIndiceAtual] = useState(0);

    const abrirModal = (foto, index) => {
        setFotoSelecionada(foto);
        setIndiceAtual(index);
    };

    const fecharModal = () => {
        setFotoSelecionada(null);
    };

    // Ícones SVG para navegação
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

    const irParaAnterior = (e) => {
        e.stopPropagation(); // Impede que o clique feche o modal
        const novoIndice = (indiceAtual - 1 + fotos.length) % fotos.length;
        setFotoSelecionada(fotos[novoIndice]);
        setIndiceAtual(novoIndice);
    };

    const irParaProxima = (e) => {
        e.stopPropagation(); // Impede que o clique feche o modal
        const novoIndice = (indiceAtual + 1) % fotos.length;
        setFotoSelecionada(fotos[novoIndice]);
        setIndiceAtual(novoIndice);
    };

    return (
        <div>
            <div className="galeria-grid">
                {fotos.map((foto, index) => (
                    <div 
                        key={index} 
                        className="galeria-item" 
                        onClick={() => abrirModal(foto, index)}
                    >
                        <img src={foto.src} alt={foto.alt} className="galeria-thumbnail" />
                    </div>
                ))}
            </div>

            {fotoSelecionada && (
                <div className="galeria-modal-backdrop" onClick={fecharModal}>
                    <button className="galeria-modal-nav prev" onClick={irParaAnterior}>
                        <IconArrowLeft />
                    </button>
                    
                    <div className="galeria-modal-content" onClick={(e) => e.stopPropagation()}>
                        <img src={fotoSelecionada.src} alt={fotoSelecionada.alt} className="galeria-modal-img" />
                        <p className="galeria-modal-descricao">{fotoSelecionada.descricao}</p>
                    </div>
                    
                    <button className="galeria-modal-nav next" onClick={irParaProxima}>
                        <IconArrowRight />
                    </button>

                    <button className="galeria-modal-fechar" onClick={fecharModal}>
                        &times;
                    </button>
                </div>
            )}
        </div>
    );
};

export default GaleriaFotos;
