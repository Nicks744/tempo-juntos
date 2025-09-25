import React, { useState } from 'react';
import './Quiz.css';

// Suas perguntas personalizadas!
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
            { answerText: '10/10/2024', isCorrect: false },
            { answerText: '26/10/2024', isCorrect: true },
            { answerText: '05/11/2024', isCorrect: false },
        ],
    },
    {
        questionText: 'Qual foi o primeiro presente que Lucas já deu para Cecília?',
        answerOptions: [
            { answerText: 'Colar de Coracão rosa', isCorrect: false },
            { answerText: 'Uma Caneca', isCorrect: false },
            { answerText: 'Caixa de lembranças', isCorrect: false },
            { answerText: 'Brincos de coração', isCorrect: true },
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

    return (
        <div className='quiz-container'>
             <h2 className="subtitulo">Nosso Quiz Pessoal 💖</h2>
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

