import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ContagemTempo = () => {
  const dataInicio = new Date("2024-11-03T00:00:00");
  const [tempo, setTempo] = useState({
    anos: 0,
    meses: 0,
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  const calcularTempo = () => {
    const agora = new Date();

    let anoInicio = dataInicio.getFullYear();
    let mesInicio = dataInicio.getMonth();
    let diaInicio = dataInicio.getDate();

    let anoAgora = agora.getFullYear();
    let mesAgora = agora.getMonth();
    let diaAgora = agora.getDate();

    let horas = agora.getHours();
    let minutos = agora.getMinutes();
    let segundos = agora.getSeconds();

    let anos = anoAgora - anoInicio;
    let meses = mesAgora - mesInicio;
    let dias = diaAgora - diaInicio;

    if (dias < 0) {
      meses -= 1;
      const ultimoDiaMesAnterior = new Date(anoAgora, mesAgora, 0).getDate();
      dias += ultimoDiaMesAnterior;
    }

    if (meses < 0) {
      anos -= 1;
      meses += 12;
    }

    setTempo({ anos, meses, dias, horas, minutos, segundos });
  };

  useEffect(() => {
    calcularTempo();
    const intervalo = setInterval(calcularTempo, 1000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #121212, #1e1e1e)",
        minHeight: "100vh",
        color: "#f5e6a1",
        fontFamily: "'Dancing Script', cursive",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          color: "#f5e6a1",
          marginBottom: "30px",
          textShadow: "1px 1px 3px #4b4b3f",
        }}
      >
        Lucas & Cecília
      </h1>

      <div style={{ maxWidth: "400px", width: "100%", marginBottom: "40px" }}>
        <Carousel>
          {[1, 2, 3, 4, 5, 6].map((num, i) => (
            <Carousel.Item key={i}>
              <img
                className="d-block w-100"
                src={`/img/imagem${num}.jpg`}
                alt={`Imagem ${num}`}
                style={{
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  filter: "brightness(0.85)",
                }}
              />
              <Carousel.Caption>
                <h3
                  style={{
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: "2rem",
                    color: "#f5e6a1",
                    textShadow: "1px 1px 2px #4b4b3f",
                    padding: "8px 16px",
                    borderRadius: "10px",
                    display: "inline-block",
                    backgroundColor: "rgba(18, 18, 18, 0.5)",
                  }}
                >
                  {[
                    "Eu te amo mil milhões!",
                    "Você é minha luz!",
                    "i love you Cherie!",
                    "A melhor parte do meu dia!",
                    "Minha raposinha! 🦊",
                    "Te vivo!",
                  ][i]}
                </h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <div
        className="spotify-frame"
        style={{ marginBottom: "40px", textAlign: "center" }}
      >
        <h2
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "1.8rem",
            textShadow: "1px 1px 2px #4b4b3f",
            marginBottom: "10px",
            color: "#f5e6a1",
          }}
        >
          Nossa música... 🤍
        </h2>
        <iframe
          title="Spotify Music"
          src="https://open.spotify.com/embed/track/0cP8fL9xvi8OYisR8OJuzN"
          width="300"
          height="380"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: "10px", filter: "brightness(0.9)" }}
        />
      </div>

      {/* Título da contagem */}
      <h2
        style={{
          fontSize: "2.5rem",
          color: "#f5e6a1",
          marginBottom: "10px",
          textShadow: "1px 1px 2px #4b4b3f",
          fontFamily: "'Dancing Script', cursive",
        }}
      >
        Tempo Juntos
      </h2>

      {/* Contagem em 6 quadradinhos (3x2) */}
      <div
        style={{
          maxWidth: "320px",
          margin: "0 auto 40px",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "12px 24px",
          justifyItems: "center",
          color: "#f5e6a1",
          backgroundColor: "#222222",
          borderRadius: "15px",
          padding: "15px",
          boxShadow: "0 4px 8px rgba(245, 230, 161, 0.3)",
          fontFamily: "'Dancing Script', cursive",
          fontWeight: "bold",
          userSelect: "none",
        }}
      >
        {["anos", "meses", "dias", "horas", "minutos", "segundos"].map(
          (unit) => (
            <div
              key={unit}
              style={{
                width: "120px",
                height: "80px",
                borderRadius: "10px",
                backgroundColor: "#2e2e2e",
                border: "2px solid #f5e6a1",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 0 6px rgba(245, 230, 161, 0.4)",
              }}
            >
              <strong style={{ fontSize: "2.2rem" }}>{tempo[unit]}</strong>
              <span
                style={{
                  fontSize: "1.2rem",
                  textTransform: "capitalize",
                }}
              >
                {unit}
              </span>
            </div>
          )
        )}
      </div>

      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto 40px",
          textAlign: "center",
          color: "#f5e6a1",
          fontSize: "1.3rem",
          fontFamily: "'Playfair Display', serif",
          lineHeight: "1.8",
          textShadow: "1px 1px 2px #4b4b3f",
          padding: "0 20px",
          userSelect: "text",
        }}
      >
        <p>
          Nosso amor nasceu de olhares sinceros e cresceu com pequenos gestos,
          risadas compartilhadas e momentos que marcaram nossa história. Cada
          dia ao seu lado é como escrever uma nova página de um livro que quero
          ler e viver para sempre.
          <br />
          <br />
          Você é meu lar, meu porto seguro, minha calmaria em meio ao caos. Em
          seus abraços encontrei paz, nos seus olhos encontrei verdade, e em
          sua voz encontrei o som mais bonito do mundo.
          <br />
          <br />
          Nem todos os dias são fáceis, mas até nos difíceis, é com você que
          quero estar. Juntos aprendemos, superamos, evoluímos. Somos um só
          coração batendo em dois corpos, seguindo na mesma direção.
          <br />
          <br />
          Obrigado por ser minha luz, minha alegria, meu melhor presente.
          Obrigado por acreditar nesse amor que me transforma a cada instante.
          Prometo continuar te escolhendo, todos os dias, por toda a vida.
          <br />
          <br />
          Te amo infinitamente. Essa é só a primeira de muitas páginas da nossa
          linda história.
        </p>
      </div>
    </div>
  );
};

export default ContagemTempo;
