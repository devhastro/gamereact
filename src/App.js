import React, { useState } from 'react';
import './App.css';

function App() {
  const levels = {
    easy: {
      emojis: [
        ['😁','😄','😊','🙂','😀','😂','🤣','😎'],
        ['2️⃣','🧀','🍅','🍴','🍽️','🍕','🌶️','🌿'],
        ['🎬','📽️','🎞️','🍿','📺','🎥','⭐','🎭'],
        ['🦁','👑','🌟','💪','✨','❤','😱','😍'],
        ['🐯','🌸','👑','✨','🌷','💎','⭐','🦋'],
      ],
      answer: ['Sorriso', 'Pizza', 'Filme', 'Leaon', 'Kiara'],
      maxEmojis: 8, // Nível Fácil pode ter até 8 emojis
    },
    medium: {
      emojis: [
        ['💓','😊','😘','💋','💞','😗'],
        ['👫','❤️','💕','🥰','🤝','🌹'],
        ['🤗','🌟','💞','🤝','😊','✨'],
      ],
      answer: ['Beijo', 'Casal', 'Abraço'],
      maxEmojis: 5, // Nível Médio pode ter até 5 emojis
    },
    hard: {
      emojis: [
        ['🌌','🤝','✨'],
        ['🖤','👕','✨'],
        ['🤫','🤝','❤️'],
        ['🖨️','👔','😂'],
        ['📱','🎬','3️⃣0️⃣'],
      ],
      answer: ['Conexão', 'Blusa Preta', 'Confiança', 'The Office', 'Reels'],
      maxEmojis: 3, // Nível Difícil tem apenas 3 emojis
    },
  };

  const [userGuess, setUserGuess] = useState('');
  const [message, setMessage] = useState('');
  const [emojiSequence, setEmojiSequence] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('easy');
  const [answer, setAnswer] = useState('');
  const [attempts, setAttempts] = useState(0);

  // Função para selecionar um desafio aleatório com base no nível
  const startGame = () => {
    const levelData = levels[selectedLevel];
    const randomIndex = Math.floor(Math.random() * levelData.emojis.length);
    setEmojiSequence(levelData.emojis[randomIndex].slice(0, 3)); // Começa com 3 emojis
    setAnswer(levelData.answer[randomIndex]);
    setAttempts(0); // O número de tentativas começa em 0
    setMessage('');
  };

  const handleGuessChange = (event) => {
    setUserGuess(event.target.value);
  };

  const handleSubmit = () => {
    setAttempts(attempts + 1); // Incrementa o total de tentativas

    if (userGuess.toLowerCase() === answer.toLowerCase()) {
      setMessage('Parabéns, você acertou! 🎉');
    } else {
      setMessage(`Você tentou ${attempts + 1} vez(es). Tente novamente! 🙁`);

      // Se não for o último emoji, adicione mais um emoji
      const levelData = levels[selectedLevel];
      if (emojiSequence.length < levelData.maxEmojis) {
        setEmojiSequence(prev => prev.concat(levelData.emojis[selectedLevel === 'easy' ? 0 : 1][prev.length + 1] || []));
      }
    }
  };

  return (
    <div className="App">
      <h1>Desafio dos Emojis</h1>
      <div>
        <label htmlFor="level">Escolha o nível: </label>
        <select id="level" value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
          <option value="easy">Fácil</option>
          <option value="medium">Médio</option>
          <option value="hard">Difícil</option>
        </select>
        <button onClick={startGame}>Começar Jogo</button>
      </div>
      <div className="emoji-container">
        <p>{emojiSequence.join(' ')}</p>
      </div>
      <input 
        type="text" 
        value={userGuess} 
        onChange={handleGuessChange} 
        placeholder="Qual é a frase?" 
      />
      <button onClick={handleSubmit}>Responder</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
