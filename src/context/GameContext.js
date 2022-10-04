import { useState, useContext, createContext } from 'react';

const GameContext = createContext();

export function GameContextProvider({ children }) {
  const initialState = new Array(9)
    .fill()
    .map((value, index) => ({ position: index, content: '' }));

  const [board, setBoard] = useState(initialState);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameMessage, setGameMessage] = useState('Your Turn, X');
  const [active, setActive] = useState(true);

  const handleBoxClick = (num) => {
    if (!active) return;
    if (board[num].content !== '') return;

    setBoard((prev) =>
      prev.map((box) => (box.position === num ? { position: num, content: currentPlayer } : box))
    );
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    setGameMessage(currentPlayer === 'X' ? 'Your Turn, O' : 'Your Turn, X');
  };

  return (
    <GameContext.Provider value={{ board, currentPlayer, gameMessage, active, handleBoxClick }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameContextProvider');
  }
  return context;
}
