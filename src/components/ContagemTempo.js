import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { addYears, differenceInDays, format, differenceInYears } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Quiz from './Quiz';

const mensagemParagrafos = [
    "Nosso amor nasceu de olhares sinceros e cresceu com pequenos gestos, risadas compartilhadas e momentos que marcaram nossa história. Cada dia ao seu lado é como escrever uma nova página de um livro que quero ler e viver para sempre.",
    "Você é meu lar, meu porto seguro, minha calmaria em meio ao caos. Em seus abraços encontrei paz, nos seus olhos encontrei verdade, e em sua voz encontrei o som mais bonito do mundo.",
    "Nem todos os dias são fáceis, mas até nos difíceis, é com você que quero estar. Juntos aprendemos, superamos, evoluímos. Somos um só coração batendo em dois corpos, seguindo na mesma direção.",
    "Obrigado por ser minha luz, minha alegria, meu melhor presente. Obrigado por acreditar nesse amor que me transforma a cada instante. Prometo continuar te escolhendo, todos os dias, por toda a vida.",
    "Te amo infinitamente. Essa é só a primeira de muitas páginas da nossa linda história."
];

const ContagemTempo = () => {
    // CORREÇÃO APLICADA AQUI: Criando a data de forma mais segura
    const dataInicio = new Date(2024, 10, 3); // Ano, Mês (0-11), Dia
    
    const [tempo, setTempo] = useState({
        anos: 0, meses: 0, dias: 0, horas: 0, minutos: 0, segundos: 0,
    });
    
    const [paragrafosVisiveis, setParagrafosVisiveis] = useState(1);
    const [marcos, setMarcos] = useState([]);

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

    return (
        <div className="main-container">
            <h1 className="titulo-principal">Lucas & Cecília</h1>

            <div className="carousel-container">
                <Carousel>{[1, 2, 3, 4, 5, 6].map((num, i) => (<Carousel.Item key={i}><img className="d-block w-100 carousel-imagem" src={`/img/imagem${num}.jpg`} alt={`Imagem ${num}`} /><Carousel.Caption><h3 className="carousel-legenda">{["Eu te amo mil milhões!", "Você é minha luz!", "i love you Cherie!", "A melhor parte do meu dia!", "Minha raposinha! 🦊", "Te vivo!"][i]}</h3></Carousel.Caption></Carousel.Item>))}</Carousel>
            </div>

            <div className="spotify-frame">
                <h2 className="subtitulo">Nossa música... 🤍</h2>
                <iframe title="Spotify Music" className="spotify-player" src="https://open.spotify.com/embed/track/0cP8fL9xvi8OYisR8OJuzN" width="300" height="380" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" allowFullScreen />
            </div>

            <h2 className="subtitulo">Tempo Juntos</h2>
            <div className="contagem-grid">{["anos", "meses", "dias", "horas", "minutos", "segundos"].map((unidade) => (<div key={unidade} className="tempo-box"><strong>{tempo[unidade]}</strong><span>{unidade}</span></div>))}</div>
            
            {marcos.length > 0 && (
                <div className="marcos-container">
                     <h2 className="subtitulo">Nossos Marcos ✨</h2>
                    {marcos.map((marco, index) => (
                        <div key={index} className={`marco-item ${marco.conquistado ? 'marco-conquistado' : ''}`}>
                            <p>
                                {marco.conquistado && <span className="check-icon">✅</span>}
                                {marco.texto}
                            </p>
                        </div>
                    ))}
                </div>
            )}
            
            <Quiz />

            <div className="mensagem-final">
                {mensagemParagrafos.slice(0, paragrafosVisiveis).map((paragrafo, index) => (<p key={index}>{paragrafo}</p>))}
                {paragrafosVisiveis < paragrafosVisiveis.length && (<button className="botao-revelar" onClick={() => setParagrafosVisiveis(paragrafosVisiveis + 1)}>Continuar lendo... 💌</button>)}
            </div>
        </div>
    );
};

export default ContagemTempo;

