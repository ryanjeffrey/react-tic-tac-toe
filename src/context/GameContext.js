import { useState, useContext, createContext } from 'react';

const GameContext = createContext();

export function GameContextProvider({ children }) {
  const initialState = new Array(9)
    .fill()
    .map((value, index) => ({ position: index, content: '' }));

  const [board, setBoard] = useState(initialState);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameMessage, setGameMessage] = useState(`Your Turn ${currentPlayer}`);
  const [active, setActive] = useState(true);

  return (
    <GameContext.Provider value={{ board, currentPlayer, gameMessage, active }}>
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
