import React, { useState } from 'react';
import { differenceInDays, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Reveal from './Reveal';
import './CapsulaDoTempo.css';

/*
 * CÁPSULA DO TEMPO — cartas que só podem ser abertas a partir de uma data.
 * Antes da data: aparece trancada com contagem regressiva.
 * A partir da data: pode clicar para abrir e ler a mensagem.
 * É só editar a lista abaixo.
 */
const cartas = [
    {
        dataAbertura: new Date(2020, 0, 1), // já liberada
        titulo: 'Para quando bater a saudade',
        mensagem:
            'Se você está lendo isso com saudade, respira: eu também estou contando os minutos pra te ver. Você é meu pensamento favorito.',
    },
    {
        dataAbertura: new Date(2026, 10, 3), // 2º aniversário
        titulo: 'No nosso 2º aniversário',
        mensagem:
            'Dois anos! Quem diria. Guardei essa carta o ano inteiro só pra te dizer de novo: eu escolheria você em todas as vidas.',
    },
    {
        dataAbertura: new Date(2027, 0, 1),
        titulo: 'Abrir em 2027',
        mensagem:
            'Um novo ano, e eu aqui, ainda perdidamente apaixonado. Que venham mais mil aventuras nossas.',
    },
];

const CapsulaDoTempo = () => {
    const [aberta, setAberta] = useState(null);
    const hoje = new Date();

    const ordenadas = [...cartas].sort((a, b) => a.dataAbertura - b.dataAbertura);

    return (
        <div className="capsula-container">
            <h2 className="subtitulo">Cápsula do Tempo ⏳</h2>
            <p className="capsula-legenda">Algumas cartas só abrem no momento certo...</p>

            <div className="capsula-grid">
                {ordenadas.map((carta, index) => {
                    const liberada = hoje >= carta.dataAbertura;
                    const diasFalta = differenceInDays(carta.dataAbertura, hoje);
                    const estaAberta = aberta === index;

                    return (
                        <Reveal key={index} delay={index * 100} direction="zoom">
                            <div
                                className={`capsula-carta ${liberada ? 'liberada' : 'trancada'} ${
                                    estaAberta ? 'aberta' : ''
                                }`}
                                onClick={() => liberada && setAberta(estaAberta ? null : index)}
                            >
                                <div className="capsula-selo">{liberada ? '✉️' : '🔒'}</div>
                                <h3 className="capsula-titulo">{carta.titulo}</h3>

                                {liberada ? (
                                    estaAberta ? (
                                        <p className="capsula-mensagem">{carta.mensagem}</p>
                                    ) : (
                                        <span className="capsula-acao">Toque para abrir</span>
                                    )
                                ) : (
                                    <span className="capsula-contagem">
                                        Abre em {diasFalta} {diasFalta === 1 ? 'dia' : 'dias'}
                                        <br />
                                        <small>
                                            {format(carta.dataAbertura, "dd 'de' MMMM 'de' yyyy", {
                                                locale: ptBR,
                                            })}
                                        </small>
                                    </span>
                                )}
                            </div>
                        </Reveal>
                    );
                })}
            </div>
        </div>
    );
};

export default CapsulaDoTempo;
