import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Reveal from './Reveal';
import './Timeline.css';

/*
 * NOSSA HISTÓRIA — Linha do tempo.
 * É só editar esta lista para adicionar/mudar momentos.
 * Campos: data (AAAA, MM-1, DD), titulo, texto, emoji e (opcional) foto.
 * A lista é ordenada automaticamente pela data.
 */
const eventos = [
    {
        data: new Date(2024, 9, 11), // 11/10/2024
        emoji: '📸',
        titulo: 'Nossa primeira foto juntos',
        texto: 'O primeiro registro de muitos. Ali já dava pra ver que tinha algo especial.',
    },
    {
        data: new Date(2024, 10, 3), // 03/11/2024
        emoji: '💕',
        titulo: 'O dia em que tudo começou',
        texto: 'Decidimos escrever essa história juntos. O melhor "sim" da minha vida.',
    },
    {
        data: new Date(2024, 10, 5), // 05/11/2024
        emoji: '🍔',
        titulo: 'Nosso primeiro encontro',
        texto: 'No Mais Burguinho — nervoso, risadas e a certeza de que eu queria mais.',
    },
    {
        data: new Date(2024, 11, 25), // exemplo — EDITE
        emoji: '🎁',
        titulo: 'Primeiro presente',
        texto: 'Uma caixa de lembranças, pra guardar cada pedacinho do nosso "nós".',
    },
    // Adicione mais momentos aqui 👇
    // {
    //     data: new Date(2025, 0, 1),
    //     emoji: '✈️',
    //     titulo: 'Nossa primeira viagem',
    //     texto: 'Escreva aqui a lembrança...',
    //     foto: '/img/imagem2.jpg',
    // },
];

const Timeline = () => {
    const ordenados = [...eventos].sort((a, b) => a.data - b.data);

    return (
        <div className="timeline-container">
            <h2 className="subtitulo">Nossa História 📜</h2>
            <div className="timeline">
                {ordenados.map((evento, index) => (
                    <Reveal
                        key={index}
                        direction={index % 2 === 0 ? 'left' : 'right'}
                        className={`timeline-item ${index % 2 === 0 ? 'esquerda' : 'direita'}`}
                    >
                        <div className="timeline-ponto">{evento.emoji}</div>
                        <div className="timeline-card">
                            <span className="timeline-data">
                                {format(evento.data, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                            </span>
                            <h3 className="timeline-titulo">{evento.titulo}</h3>
                            {evento.foto && (
                                <img className="timeline-foto" src={evento.foto} alt={evento.titulo} />
                            )}
                            <p className="timeline-texto">{evento.texto}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    );
};

export default Timeline;
