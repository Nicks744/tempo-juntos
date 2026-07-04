import React, { useState, useEffect } from 'react';
import Confetti from './Confetti';
import './Surpresa.css';

/*
 * Modo surpresa: em datas especiais (aniversário de namoro mensal ou anual)
 * abre automaticamente uma tela de comemoração com confete e uma mensagem.
 * Também pode ser forçado com ?surpresa=1 na URL (útil para testar).
 */
const detectarDiaEspecial = (dataInicio) => {
    const hoje = new Date();
    const mesmoDia = hoje.getDate() === dataInicio.getDate();
    const mesmoMes = hoje.getMonth() === dataInicio.getMonth();

    if (mesmoDia && mesmoMes) {
        const anos = hoje.getFullYear() - dataInicio.getFullYear();
        return {
            especial: true,
            chave: `anual-${hoje.getFullYear()}`,
            titulo: `Feliz ${anos} ${anos === 1 ? 'ano' : 'anos'} de nós! 🥂`,
            texto: 'Hoje é um dia especialíssimo. Obrigado por cada segundo ao seu lado.',
        };
    }
    if (mesmoDia) {
        return {
            especial: true,
            chave: `mensal-${hoje.getFullYear()}-${hoje.getMonth()}`,
            titulo: 'Feliz mêsversário! 💛',
            texto: 'Mais um mês te amando. E a vontade só cresce.',
        };
    }
    return { especial: false };
};

const Surpresa = ({ dataInicio }) => {
    const [info, setInfo] = useState({ especial: false });
    const [visivel, setVisivel] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const forcado = params.has('surpresa');

        if (forcado) {
            setInfo({
                especial: true,
                chave: 'forcado',
                titulo: 'Uma surpresa pra você 💝',
                texto: 'Feito com muito amor, só pra você.',
            });
            setVisivel(true);
            return;
        }

        const detectado = detectarDiaEspecial(dataInicio);
        if (detectado.especial) {
            // Mostra só uma vez por sessão para não cansar
            const jaViu = sessionStorage.getItem(`surpresa-${detectado.chave}`);
            if (!jaViu) {
                setInfo(detectado);
                setVisivel(true);
                sessionStorage.setItem(`surpresa-${detectado.chave}`, '1');
            }
        }
    }, [dataInicio]);

    if (!visivel || !info.especial) return null;

    return (
        <div className="surpresa-overlay">
            <Confetti ativo={visivel} duracao={7000} />
            <div className="surpresa-card">
                <div className="surpresa-emoji">🎉</div>
                <h2 className="surpresa-titulo">{info.titulo}</h2>
                <p className="surpresa-texto">{info.texto}</p>
                <button className="surpresa-botao" onClick={() => setVisivel(false)}>
                    Abrir nossa página 💛
                </button>
            </div>
        </div>
    );
};

export default Surpresa;
