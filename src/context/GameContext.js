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

  const checkWinner = () => {
    if (
      board[0].content !== '' &&
      board[0].content === board[1].content &&
      board[1].content === board[2].content
    ) {
      return board[2].content;
    } else if (
      board[3].content !== '' &&
      board[3].content === board[4].content &&
      board[4].content === board[5].content
    ) {
      return board[5].content;
    } else if (
      board[6].content !== '' &&
      board[6].content === board[7].content &&
      board[7].content === board[8].content
    ) {
      return board[8].content;
    } else if (
      board[0].content !== '' &&
      board[0].content === board[3].content &&
      board[3].content === board[6].content
    ) {
      return board[6].content;
    } else if (
      board[1].content !== '' &&
      board[1].content === board[4].content &&
      board[4].content === board[7].content
    ) {
      return board[7].content;
    } else if (
      board[2].content !== '' &&
      board[2].content === board[5].content &&
      board[5].content === board[8].content
    ) {
      return board[8].content;
    } else if (
      board[0].content !== '' &&
      board[0].content === board[4].content &&
      board[4].content === board[8].content
    ) {
      return board[8].content;
    } else if (
      board[2].content !== '' &&
      board[2].content === board[4].content &&
      board[4].content === board[6].content
    ) {
      return board[6].content;
    } else {
      return false;
    }
  };

  const isCatsGame = () => {
    return board.filter((box) => box.content === '').length === 0;
  };

  const checkGameStatus = () => {
    if (!active) return;
    const winner = checkWinner();
    if (winner) {
      setGameMessage(`🏆 You win, ${winner}! 🏆`);
      setActive(false);
    } else if (isCatsGame()) {
      setGameMessage('Cats Game!');
      setActive(false);
    }
  };

  checkGameStatus();

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
