import React, { useState } from 'react';
import './App.css';

function App() {
  const levels = {
    easy: {
      emojis: [
        ['😁', '😄', '😊', '🙂', '😀', '😂', '🤣', '😎'],
        ['2️⃣', '🧀', '🍅', '🍴', '🍽️', '🍕', '🌶️', '🌿'],
        ['🎬', '📽️', '🎞️', '🍿', '📺', '🎥', '⭐', '🎭'],
        ['🦁', '👑', '🌟', '💪', '✨', '❤', '😱', '😍'],
        ['🐯', '🌸', '👑', '✨', '🌷', '💎', '⭐', '🦋'],
      ],
      answer: ['Sorriso', 'Pizza', 'Filme', 'Leon', 'Kiara'],
      maxEmojis: 8,
    },
    medium: {
      emojis: [
        ['💓', '😊', '😘', '💋', '💞', '😗'],
        ['👫', '❤️', '💕', '🥰', '🤝', '🌹'],
        ['🤗', '🌟', '💞', '🤝', '😊', '✨'],
      ],
      answer: ['Beijo', 'Casal', 'Abraço'],
      maxEmojis: 5,
    },
    hard: {
      emojis: [
        ['🌌', '🤝', '✨'],
        ['🖤', '👕', '✨'],
        ['🤫', '🤝', '❤️'],
        ['🖨️', '👔', '😂'],
        ['📱', '🎬', '3️⃣0️⃣'],
      ],
      answer: ['Conexão', 'Blusa Preta', 'Confiança', 'The Office', 'Reels'],
      maxEmojis: 3,
    },
  };

  const [userGuess, setUserGuess] = useState('');
  const [message, setMessage] = useState('');
  const [emojiSequence, setEmojiSequence] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('easy');
  const [answer, setAnswer] = useState('');
  const [attempts, setAttempts] = useState(0);

  const startGame = () => {
    const levelData = levels[selectedLevel];
    const randomIndex = Math.floor(Math.random() * levelData.emojis.length);
    setEmojiSequence(levelData.emojis[randomIndex].slice(0, 3));
    setAnswer(levelData.answer[randomIndex]);
    setAttempts(0);
    setMessage('');
  };

  const handleGuessChange = (event) => {
    setUserGuess(event.target.value);
  };

  const handleSubmit = () => {
    setAttempts(attempts + 1);

    if (userGuess.toLowerCase() === answer.toLowerCase()) {
      setMessage('🎉 Parabéns, você acertou!');
    } else {
      setMessage(`Você tentou ${attempts + 1} vez(es). Tente novamente! 🙁`);

      const levelData = levels[selectedLevel];
      if (emojiSequence.length < levelData.maxEmojis) {
        setEmojiSequence((prev) => prev.concat(levelData.emojis[0][prev.length] || []));
      }
    }
  };

  return (
    <div className="App">
      <h1>Desafio dos Emojis</h1>
      <div className="controls">
        <label htmlFor="level">Escolha o nível: </label>
        <select id="level" value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
          <option value="easy">Fácil</option>
          <option value="medium">Médio</option>
          <option value="hard">Difícil</option>
        </select>
        <button className="start-btn" onClick={startGame}>
          Começar Jogo
        </button>
      </div>
      <div className="emoji-container">
        <p>{emojiSequence.join(' ')}</p>
      </div>
      <div className="input-container">
        <input
          type="text"
          value={userGuess}
          onChange={handleGuessChange}
          placeholder="Qual é a palavra?"
        />
        <button className="submit-btn" onClick={handleSubmit}>
          Responder
        </button>
      </div>
      <p className="message">{message}</p>
    </div>
  );
}

export default App;
