import { useLocation, useNavigate } from 'react-router-dom';

// Tarefa: tela de resultado que lê useLocation().state
// Extrai acertos e erros enviados pelo Quiz via navigate state
const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Tarefa: extrair obrigatoriamente do useLocation().state:
  // - acertos (quantidade total de acertos)
  // - erros (quantidade total de erros)
  const { acertos = 0, erros = 0, total = 0 } = location.state || {};
  const porcentagem = total > 0 ? Math.round((acertos / total) * 100) : 0;

  // Tarefa: mensagem motivacional baseada na porcentagem de acerto
  const getMensagem = () => {
    if (porcentagem === 100) return { emoji: '🏆', texto: 'Perfeito! Você acertou tudo! Incrível!' };
    if (porcentagem >= 80) return { emoji: '🌟', texto: 'Excelente! Você domina bem o conteúdo!' };
    if (porcentagem >= 60) return { emoji: '👍', texto: 'Bom trabalho! Continue estudando!' };
    if (porcentagem >= 40) return { emoji: '📚', texto: 'Não desanime! Revise o conteúdo e tente novamente.' };
    return { emoji: '💪', texto: 'Todo especialista já foi iniciante. Acredite em você!' };
  };

  const mensagem = getMensagem();

  // Segurança: se acessar sem state, volta para home
  if (!location.state) {
    return (
      <div className="min-h-screen bg-quiz-dark flex flex-col items-center justify-center p-6">
        <p className="text-white text-lg mb-4">Nenhum resultado encontrado.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-quiz-yellow text-black font-bold py-3 px-8 rounded-full"
        >
          Voltar ao início
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-quiz-dark flex flex-col items-center justify-center p-6 text-center">

      {/* Título */}
      <div className="mb-8">
        <h1 className="text-quiz-yellow text-4xl font-black italic mb-2">QUIZ</h1>
        <p className="text-white/60 text-sm">Resultado Final</p>
      </div>

      {/* Card de resultado */}
      <div className="w-full max-w-md">

        {/* Emoji e porcentagem */}
        <div className="bg-quiz-purple p-8 rounded-t-3xl">
          <div className="text-6xl mb-4">{mensagem.emoji}</div>
          <div className="text-quiz-yellow text-7xl font-black">{porcentagem}%</div>
          <p className="text-white/70 text-sm mt-2">de aproveitamento</p>
        </div>

        {/* Detalhes: acertos e erros */}
        <div className="bg-white p-6 flex justify-around">
          <div className="text-center">
            <p className="text-3xl font-black text-green-500">{acertos}</p>
            <p className="text-gray-500 text-sm font-medium">Acertos</p>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="text-center">
            <p className="text-3xl font-black text-red-400">{erros}</p>
            <p className="text-gray-500 text-sm font-medium">Erros</p>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="text-center">
            <p className="text-3xl font-black text-gray-700">{total}</p>
            <p className="text-gray-500 text-sm font-medium">Total</p>
          </div>
        </div>

        {/* Mensagem motivacional */}
        <div className="bg-quiz-yellow p-5 rounded-b-3xl">
          <p className="text-black font-bold text-base leading-snug">
            {mensagem.texto}
          </p>
        </div>
      </div>

      {/* Botões de ação */}
      <div className="w-full max-w-md mt-6 space-y-3">
        <button
          onClick={() => navigate('/quiz')}
          className="w-full bg-quiz-purple text-white font-bold py-4 rounded-full text-lg shadow-lg"
        >
          Tentar Novamente
        </button>
        <button
          onClick={() => navigate('/')}
          className="w-full bg-white/10 text-white font-bold py-4 rounded-full text-lg"
        >
          Voltar ao Início
        </button>
      </div>
    </div>
  );
};

export default Result;
