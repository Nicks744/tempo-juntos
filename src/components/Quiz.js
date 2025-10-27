import React, { useState } from 'react';
import './Quiz.css';

const questions = [
    {
        questionText: 'Onde foi nosso primero encontro?',
        answerOptions: [
            { answerText: 'Shopping Morumbi', isCorrect: false },
            { answerText: 'Mais Burguinho', isCorrect: true },
            { answerText: 'Parque Ibirapuera', isCorrect: false },
            { answerText: 'Casa de Lucas', isCorrect: false },
        ],
    },
    {
        questionText: 'Qual foi a data do nosso primeiro encontro?',
        answerOptions: [
            { answerText: '05/11/2024', isCorrect: true }, 
            { answerText: '03/11/2024', isCorrect: false },
            { answerText: '07/11/2024', isCorrect: false },
            { answerText: '10/11/2024', isCorrect: false },
        ],
    },
    {
        questionText: 'Qual foi a data da nossa primeira foto juntos?',
        answerOptions: [
            { answerText: '07/11/2024', isCorrect: false },
            { answerText: '24/10/2024', isCorrect: false },
            { answerText: '11/10/2024', isCorrect: true },
            { answerText: '05/11/2024', isCorrect: false },
        ],
    },
    {
        questionText: 'Qual foi o primeiro presente que Lucas já deu para Cecília?',
        answerOptions: [
            { answerText: 'Colar de Coracão rosa', isCorrect: false },
            { answerText: 'Uma Caneca', isCorrect: false },
            { answerText: 'Brincos de coração', isCorrect: false },
            { answerText: 'Caixa de lembranças', isCorrect: true },
        ],
    },
     {
        questionText: 'Qual era a palavra chave da carta da felicidade?',
        answerOptions: [
            { answerText: 'Croassant', isCorrect: false },
            { answerText: 'Camarão', isCorrect: false },
            { answerText: 'Galáxia', isCorrect: true },
            { answerText: 'Contente', isCorrect: false },
        ],
    },
];

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState({ status: '', index: null });
    const [buttonsDisabled, setButtonsDisabled] = useState(false);

    const handleAnswerOptionClick = (isCorrect, index) => {
        setButtonsDisabled(true); // Desabilita os botões após o clique
        setFeedback({ status: isCorrect ? 'correct' : 'incorrect', index: index });

        if (isCorrect) {
            setScore(score + 1);
        }

        setTimeout(() => {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < questions.length) {
                setCurrentQuestion(nextQuestion);
            } else {
                setShowScore(true);
            }
            // Limpa o feedback e reabilita os botões para a próxima pergunta
            setFeedback({ status: '', index: null });
            setButtonsDisabled(false);
        }, 1200); // Espera 1.2 segundos antes de avançar
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setShowScore(false);
        setScore(0);
    }

    // Função para gerar a classe CSS dinâmica para o botão
    const getButtonClass = (index) => {
        if (feedback.index === index) {
            return feedback.status; // 'correct' ou 'incorrect'
        }
        return '';
    };

    // Ícone de Coração SVG
    const IconHeart = () => (
        <svg className="icon-svg icon-heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
    );

    return (
        <div className='quiz-container'>
             <h2 className="subtitulo">Nosso Quiz Pessoal <IconHeart /></h2>
            {showScore ? (
                <div className='score-section'>
                    Você acertou {score} de {questions.length} perguntas!
                    <p className='score-message'>
                        {score === questions.length ? "Perfeito! Nossa sintonia é incrível! 🥰" : "Fomos bem, mas o mais importante é a nossa história! ❤️"}
                    </p>
                    <button onClick={restartQuiz} className="restart-button">Jogar Novamente</button>
                </div>
            ) : (
                <>
                    <div className='question-section'>
                        <div className='question-count'>
                            <span>Pergunta {currentQuestion + 1}</span>/{questions.length}
                        </div>
                        <div className='question-text'>{questions[currentQuestion].questionText}</div>
                    </div>
                    <div className='answer-section'>
                        {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                            <button 
                                key={index} 
                                onClick={() => handleAnswerOptionClick(answerOption.isCorrect, index)} 
                                className={`answer-button ${getButtonClass(index)}`}
                                disabled={buttonsDisabled}
                            >
                                {answerOption.answerText}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Quiz;


