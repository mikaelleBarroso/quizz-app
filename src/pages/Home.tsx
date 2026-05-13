import { useNavigate } from 'react-router-dom';

// Slide 4: Home page + Slide 10: navegação com useNavigate
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-quiz-dark flex flex-col items-center justify-center p-6 text-center">

      <div className="mb-12 flex flex-col items-center">
        <div className="relative">
          {/* Logo / ícone do quiz */}
          <div className="w-32 h-32 bg-quiz-purple rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-6xl">🎯</span>
          </div>
        </div>

        <h1 className="text-quiz-yellow text-7xl font-black mt-8 tracking-tighter uppercase italic">
          QUIZ
        </h1>
      </div>

      <div className="max-w-xs mb-10">
        <p className="text-quiz-yellow text-lg font-bold leading-tight">
          Está na hora de ser o especialista oficial em... nada específico!
        </p>
      </div>

      {/* Slide 10: navega para /quiz ao clicar */}
      <button
        onClick={() => navigate('/quiz')}
        className="bg-pink-50 text-black w-full max-w-xs py-4 rounded-full text-xl font-bold shadow-lg"
      >
        Começar
      </button>

      {/* Botão extra para a tela de cadastro */}
      <button
        onClick={() => navigate('/admin')}
        className="mt-4 text-white/40 text-sm underline"
      >
        Gerenciar perguntas
      </button>
    </div>
  );
};

export default Home;
