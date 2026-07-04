import React, { useState, useEffect, useMemo } from "react";
// REMOVIDO: import { Carousel } from "react-bootstrap";
// REMOVIDO: import "bootstrap/dist/css/bootstrap.min.css";
import { addYears, differenceInDays, format, differenceInYears } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Quiz from './Quiz';
import GaleriaFotos from './GaleriaFotos'; // ADICIONADO
import Timeline from './Timeline';
import CapsulaDoTempo from './CapsulaDoTempo';
import Surpresa from './Surpresa';
import Confetti from './Confetti';
import Reveal from './Reveal';
import MuralRecados from './MuralRecados';

const mensagemParagrafos = [
    "Nosso amor nasceu de olhares sinceros e cresceu com pequenos gestos, risadas compartilhadas e momentos que marcaram nossa história. Cada dia ao seu lado é como escrever uma nova página de um livro que quero ler e viver para sempre.",
    "Você é meu lar, meu porto seguro, minha calmaria em meio ao caos. Em seus abraços encontrei paz, nos seus olhos encontrei verdade, e em sua voz encontrei o som mais bonito do mundo.",
    "Nem todos os dias são fáceis, mas até nos difíceis, é com você que quero estar. Juntos aprendemos, superamos, evoluímos. Somos um só coração batendo em dois corpos, seguindo na mesma direção.",
    "Obrigado por ser minha luz, minha alegria, meu melhor presente. Obrigado por acreditar nesse amor que me transforma a cada instante. Prometo continuar te escolhendo, todos os dias, por toda a vida.",
    "Te amo infinitamente. Essa é só a primeira de muitas páginas da nossa linda história."
];

// ESTRUTURA DE DADOS DAS FOTOS
const listaDeFotos = [
    { src: '/img/imagem1.jpg', alt: 'Imagem 1', descricao: 'Eu te amo mil milhões!' },
    { src: '/img/imagem2.jpg', alt: 'Imagem 2', descricao: 'Você é minha luz!' },
    { src: '/img/imagem3.jpg', alt: 'Imagem 3', descricao: 'i love you Cherie!' },
    { src: '/img/imagem4.jpg', alt: 'Imagem 4', descricao: 'A melhor parte do meu dia!' },
    { src: '/img/imagem5.jpg', alt: 'Imagem 5', descricao: 'Minha raposinha! 🦊' }, // (Este emoji pode ficar, já que é uma legenda pessoal)
    { src: '/img/imagem6.jpg', alt: 'Imagem 6', descricao: 'Te vivo!' },
    // Adicione mais fotos aqui facilmente
    // { src: '/img/imagem7.jpg', alt: 'Imagem 7', descricao: 'Nossa viagem!' },
];

// Ícones SVG como componentes simples para reutilização
const IconSparkle = () => (
    <svg className="icon-svg icon-sparkle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l1.09 3.43L16.5 6.5l-2.6 2.54.61 3.46L12 10.74 9.49 12.5l.61-3.46L7.5 6.5l3.41-1.07L12 2zm0 5l-1.09 3.43L7.5 11.5l2.6 2.54-.61 3.46L12 15.74l2.51 1.76-.61-3.46 2.6-2.54-3.41-1.07L12 7z" />
    </svg>
);

const IconCheck = () => (
    <svg className="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
    </svg>
);

const IconLetter = () => (
    <svg className="icon-svg icon-letter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
    </svg>
);


const ContagemTempo = () => {
    // useMemo garante a mesma referência entre renders (evita re-executar os efeitos à toa)
    const dataInicio = useMemo(() => new Date(2024, 10, 3), []); // Ano, Mês (0-11), Dia
    
    const [tempo, setTempo] = useState({
        anos: 0, meses: 0, dias: 0, horas: 0, minutos: 0, segundos: 0,
    });
    
    const [isMensagemRevealed, setIsMensagemRevealed] = useState(false);
    const [marcos, setMarcos] = useState([]);
    const [totalDias, setTotalDias] = useState(0);
    const [confeteAtivo, setConfeteAtivo] = useState(false);

    // Frases dinâmicas baseadas no total de dias juntos
    const frasesTempo = [
        "já são muitos amanheceres ao seu lado 🌅",
        "e cada dia eu te amo um pouquinho mais 💛",
        "de mãos dadas e coração cheio 🤍",
        "e a nossa história só está começando ✨",
    ];
    const fraseDoDia = frasesTempo[totalDias % frasesTempo.length];

    const comemorar = () => {
        setConfeteAtivo(false);
        // reinicia o confete mesmo se já estava ativo
        requestAnimationFrame(() => setConfeteAtivo(true));
        setTimeout(() => setConfeteAtivo(false), 5200);
    };

    useEffect(() => {
        const calcularTempo = () => {
            const agora = new Date();
            let anoInicio = dataInicio.getFullYear(), mesInicio = dataInicio.getMonth(), diaInicio = dataInicio.getDate();
            let anoAgora = agora.getFullYear(), mesAgora = agora.getMonth(), diaAgora = agora.getDate();
            let horas = agora.getHours(), minutos = agora.getMinutes(), segundos = agora.getSeconds();
            let anos = anoAgora - anoInicio;
            let meses = mesAgora - mesInicio;
            let dias = diaAgora - diaInicio;

            if (dias < 0) {
                meses -= 1;
                dias += new Date(anoAgora, mesAgora, 0).getDate();
            }
            if (meses < 0) {
                anos -= 1;
                meses += 12;
            }
            setTempo({ anos, meses, dias, horas, minutos, segundos });
            setTotalDias(differenceInDays(agora, dataInicio));
        };

        calcularTempo();
        const intervalo = setInterval(calcularTempo, 1000);
        return () => clearInterval(intervalo);
    }, [dataInicio]);

    useEffect(() => {
        const hoje = new Date();
        const listaMarcos = [];
        const anosCompletos = differenceInYears(hoje, dataInicio);

        for (let i = 1; i <= anosCompletos; i++) {
            const dataAniversario = addYears(dataInicio, i);
            listaMarcos.push({
                texto: `${i} ano${i > 1 ? 's' : ''} de namoro conquistado! (${format(dataAniversario, "dd/MM/yyyy", { locale: ptBR })})`,
                conquistado: true,
            });
        }

        for (let i = 1; i <= 3; i++) {
            const proximoAno = anosCompletos + i;
            const proximoAniversario = addYears(dataInicio, proximoAno);
            const diasParaAniversario = differenceInDays(proximoAniversario, hoje);

            if (diasParaAniversario >= 0) {
                listaMarcos.push({
                    texto: `Faltam ${diasParaAniversario} dias para nosso aniversário de ${proximoAno} ano${proximoAno > 1 ? 's' : ''}!`,
                    conquistado: false,
                });
            }
        }
        
        setMarcos(listaMarcos);
    }, [dataInicio]);

    const handleRevelarMensagem = () => {
        setIsMensagemRevealed(true);
    };

    return (
        <div className="main-container">
            <Surpresa dataInicio={dataInicio} />
            <Confetti ativo={confeteAtivo} />

            <h1 className="titulo-principal">Lucas & Cecília</h1>

            {/* CARROSSEL SUBSTITUÍDO PELA GALERIA */}
            <Reveal>
                <GaleriaFotos fotos={listaDeFotos} />
            </Reveal>

            <Reveal>
                <div className="spotify-frame">
                    <h2 className="subtitulo">Nossa música... 🤍</h2>
                    <iframe title="Spotify Music" className="spotify-player" src="https://open.spotify.com/embed/track/0cP8fL9xvi8OYisR8OJuzN" width="300" height="380" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" allowFullScreen />
                </div>
            </Reveal>

            <Reveal>
                <h2 className="subtitulo">Tempo Juntos</h2>
                <div className="contagem-grid">{["anos", "meses", "dias", "horas", "minutos", "segundos"].map((unidade) => (<div key={unidade} className="tempo-box"><strong>{tempo[unidade]}</strong><span>{unidade}</span></div>))}</div>
                <p className="contagem-total">
                    <strong>{totalDias.toLocaleString('pt-BR')}</strong> dias juntos — {fraseDoDia}
                </p>
                <button className="botao-comemorar" onClick={comemorar}>
                    🎉 Comemorar nosso amor
                </button>
            </Reveal>

            <Reveal>
                <Timeline />
            </Reveal>

            {marcos.length > 0 && (
                <Reveal>
                    <div className="marcos-container">
                         <h2 className="subtitulo">Nossos Marcos <IconSparkle /></h2>
                        {marcos.map((marco, index) => (
                            <div key={index} className={`marco-item ${marco.conquistado ? 'marco-conquistado' : ''}`}>
                                <p>
                                    {marco.conquistado && <IconCheck />}
                                    {marco.texto}
                                </p>
                            </div>
                        ))}
                    </div>
                </Reveal>
            )}

            <Reveal>
                <CapsulaDoTempo />
            </Reveal>

            <Reveal>
                <Quiz />
            </Reveal>

            <Reveal>
                <MuralRecados />
            </Reveal>

            <div className="mensagem-final">
                
                {!isMensagemRevealed && (
                    <button className="botao-revelar" onClick={handleRevelarMensagem}>
                        <IconLetter />
                        Revelar Nossa História
                    </button>
                )}

                <div className={`mensagem-texto-clipper ${isMensagemRevealed ? 'is-revealed' : ''}`}>
                    {mensagemParagrafos.map((paragrafo, index) => (
                        <p key={index} className="mensagem-paragrafo">
                            {paragrafo}
                        </p>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ContagemTempo;

