import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Slide 15 + 16: Tela de cadastro de perguntas com localStorage

// Interface do slide 15
interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

const AdminQuestions = () => {
  const navigate = useNavigate();

  // Slide 15: estados
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  // Slide 15: carregar perguntas existentes ao abrir a tela
  useEffect(() => {
    const saved = localStorage.getItem('@quiz_questions');
    if (saved) setQuestions(JSON.parse(saved));
  }, []);

  // Slide 15: handleSave — salva no localStorage sob @quiz_questions
  const handleSave = () => {
    if (!newQuestion.trim() || options.some(o => !o.trim()) || !correctAnswer) {
      alert('Preencha todos os campos!');
      return;
    }

    const questionData: Question = {
      id: Date.now(),
      question: newQuestion,
      options: options,
      answer: correctAnswer,
    };

    const updatedQuestions = [...questions, questionData];
    setQuestions(updatedQuestions);

    // Slide 15: salvar no localStorage
    localStorage.setItem('@quiz_questions', JSON.stringify(updatedQuestions));

    // Limpar campos
    setNewQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
    alert('Pergunta salva com sucesso!');
  };

  // Excluir pergunta
  const handleDelete = (id: number) => {
    const updated = questions.filter(q => q.id !== id);
    setQuestions(updated);
    localStorage.setItem('@quiz_questions', JSON.stringify(updated));
  };

  // Slide 16: JSX da tela de cadastro
  return (
    <div className="min-h-screen bg-quiz-dark p-6 text-white">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/')}
          className="text-white/60 text-sm underline"
        >
          ← Voltar
        </button>
        <h1 className="text-2xl font-black text-quiz-yellow">Cadastrar Pergunta</h1>
      </div>

      {/* Slide 16: formulário de cadastro */}
      <div className="space-y-4 bg-quiz-purple p-6 rounded-3xl shadow-xl mb-8">
        <input
          placeholder="Pergunta"
          className="w-full p-3 rounded-lg text-black"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />

        {options.map((opt, i) => (
          <input
            key={i}
            placeholder={`Opção ${i + 1}`}
            className="w-full p-2 rounded-lg text-black"
            value={opt}
            onChange={(e) => {
              const newOpts = [...options];
              newOpts[i] = e.target.value;
              setOptions(newOpts);
            }}
          />
        ))}

        {/* Slide 16: select da resposta correta */}
        <select
          className="w-full p-3 rounded-lg text-black"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
        >
          <option value="">Selecione a resposta correta</option>
          {options.map((opt, i) => (
            <option key={i} value={opt}>{opt || `Opção ${i + 1}`}</option>
          ))}
        </select>

        <button
          onClick={handleSave}
          className="w-full bg-quiz-yellow text-black font-bold py-3 rounded-full"
        >
          Salvar Pergunta
        </button>
      </div>

      {/* Lista de perguntas já cadastradas */}
      {questions.length > 0 && (
        <div>
          <h2 className="text-quiz-yellow font-black text-lg mb-4">
            Perguntas cadastradas ({questions.length})
          </h2>
          <div className="space-y-3">
            {questions.map((q, i) => (
              <div key={q.id} className="bg-white/10 p-4 rounded-2xl">
                <div className="flex justify-between items-start gap-2">
                  <p className="font-semibold text-sm flex-1">
                    {i + 1}. {q.question}
                  </p>
                  <button
                    onClick={() => handleDelete(q.id)}
                    className="text-red-400 text-xs border border-red-400/40 px-2 py-1 rounded-full flex-shrink-0"
                  >
                    Excluir
                  </button>
                </div>
                <p className="text-quiz-yellow text-xs mt-2">
                  ✓ Resposta: {q.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminQuestions;
