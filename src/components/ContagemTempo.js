import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap'; // Importando o Carousel do Bootstrap

const ContagemTempo = () => {
    const dataInicio = new Date('2024-11-01T00:00:00');
    const [tempo, setTempo] = useState('');

    const calcularTempo = () => {
        const agora = new Date();
        const tempoPassado = agora - dataInicio;

        const dias = Math.floor(tempoPassado / (1000 * 60 * 60 * 24));
        const horas = Math.floor((tempoPassado % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((tempoPassado % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((tempoPassado % (1000 * 60)) / 1000);

        setTempo(`${dias} dias, ${horas} horas, ${minutos} minutos, ${segundos} segundos`);
    };

    useEffect(() => {
        const intervalo = setInterval(calcularTempo, 1000);
        calcularTempo(); // Calcular o tempo imediatamente ao carregar o componente

        return () => clearInterval(intervalo); // Limpar o intervalo quando o componente for desmontado
    }, []);

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
            {/* Carrossel no centro da tela */}
            <h1 className="titulo-cursivo">Nossa história juntos</h1>
            <div className="w-100 mb-5">
                <Carousel className="mx-auto" style={{ maxWidth: '400px' }}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/img/imagem1.jpg"  // Caminho para a imagem 1
                            alt="Primeira imagem"
                            style={{
                                height: '500px', // Definindo altura fixa como em uma tela de celular
                                objectFit: 'cover', // Ajusta a imagem sem distorcer
                                borderRadius: '10px', // Bordas arredondadas para dar o visual de celular
                            }}
                        />
                        <Carousel.Caption>
                            <h3>Eu te amo mil milhões!</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/img/imagem2.jpg"  // Caminho para a imagem 2
                            alt="Segunda imagem"
                            style={{
                                height: '500px', // Definindo altura fixa
                                objectFit: 'cover',
                                borderRadius: '10px',
                            }}
                        />
                        <Carousel.Caption>
                            <h3>Você é minha luz!</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/img/imagem3.jpg"  // Caminho para a imagem 3
                            alt="Terceira imagem"
                            style={{
                                height: '500px', // Definindo altura fixa
                                objectFit: 'cover',
                                borderRadius: '10px',
                            }}
                        />
                        <Carousel.Caption>
                            <h3>i love you Cherie!</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/img/imagem4.jpg"  // Caminho para a imagem 4
                            alt="Quarta imagem"
                            style={{
                                height: '500px', // Definindo altura fixa
                                objectFit: 'cover',
                                borderRadius: '10px',
                            }}
                        />
                        <Carousel.Caption>
                            <h3>A melhor parte do meu dia!</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/img/imagem5.jpg"  // Caminho para a imagem 5
                            alt="Quinta imagem"
                            style={{
                                height: '500px', // Definindo altura fixa
                                objectFit: 'cover',
                                borderRadius: '10px',
                            }}
                        />
                        <Carousel.Caption>
                            <h3>Minha raposinha! 🦊</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/img/imagem6.jpg"  // Caminho para a imagem 6
                            alt="Sexta imagem"
                            style={{
                                height: '500px', // Definindo altura fixa
                                objectFit: 'cover',
                                borderRadius: '10px',
                            }}
                        />
                        <Carousel.Caption>
                            <h3>Te vivo!</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>

            {/* Contagem de tempo com estilo personalizado */}
            <div className="contagem-container">
                <h2 className="contagem-titulo">Tempo Juntos</h2>
                <p className="contagem-texto">{tempo}</p>
            </div>
        </div>
    );
};

export default ContagemTempo;
