import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { quizData as mockData } from './quizData';

// Interface igual ao AdminQuestions para compatibilidade com localStorage
interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

const Quiz = () => {
  // Slide 12: lógica do quiz com currentStep e score
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  // Tarefa: carregar do localStorage na chave @quiz_questions (Slide 15)
  // Se não houver dados salvos, usa os dados mockados do Slide 11
  const [quizData, setQuizData] = useState<Question[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('@quiz_questions');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Usa dados do localStorage se existirem
      if (parsed.length > 0) {
        setQuizData(parsed);
      } else {
        setQuizData(mockData);
      }
    } else {
      // Fallback para os dados mock do slide 11
      setQuizData(mockData);
    }
  }, []);

  // Enquanto carrega
  if (quizData.length === 0) {
    return (
      <div className="min-h-screen bg-quiz-dark flex items-center justify-center">
        <p className="text-white text-lg">Carregando perguntas...</p>
      </div>
    );
  }

  const currentQuiz = quizData[currentStep];

  // Slide 12: handleAnswer — verifica resposta e navega quando acaba
  const handleAnswer = (option: string) => {
    let newScore = score;
    if (option === currentQuiz.answer) {
      newScore = score + 1;
      setScore(newScore);
    }

    const nextStep = currentStep + 1;
    if (nextStep < quizData.length) {
      setCurrentStep(nextStep);
    } else {
      // Tarefa: enviar acertos e erros via state para /resultado
      const totalErros = quizData.length - newScore;
      navigate('/resultado', {
        state: {
          finalScore: newScore,
          acertos: newScore,
          erros: totalErros,
          total: quizData.length,
        },
      });
    }
  };

  // Slide 13: JSX da tela de quiz
  return (
    <div className="min-h-screen bg-quiz-dark flex flex-col items-center p-6 pt-12">
      {/* Logo pequeno no topo */}
      <div className="mb-8">
        <h1 className="text-quiz-yellow text-2xl font-black italic">QUIZ</h1>
      </div>

      <div className="w-full max-w-md">
        {/* Card da Pergunta (Branco) */}
        <div className="bg-white p-8 rounded-t-3xl flex items-center gap-4 shadow-xl">
          <div className="bg-quiz-yellow p-3 rounded-full flex-shrink-0">
            <span className="text-xl">💡</span>
          </div>
          <h2 className="text-black font-semibold text-lg leading-tight">
            {currentQuiz.question}
          </h2>
        </div>

        {/* Container das Opções (Roxo) */}
        <div className="bg-quiz-purple p-6 rounded-b-3xl space-y-4">
          {currentQuiz.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="w-full bg-white text-black py-4 px-6 rounded-full font-bold text-center
                         hover:bg-quiz-yellow active:scale-95 transition-all shadow-md"
            >
              {option}
            </button>
          ))}
        </div>

        {/* Indicador de progresso */}
        <p className="text-white/50 text-center mt-6 font-medium">
          Pergunta {currentStep + 1} de {quizData.length}
        </p>
      </div>
    </div>
  );
};

export default Quiz;
