import { useGame } from '../../context/GameContext';
import Box from '../Box/Box';

import './Board.css';

export default function Board() {
  const { board, resetGame, active } = useGame();

  const handleReset = () => {
    resetGame();
  };

  return (
    <>
      <div className="board">
        {board.map(({ position, content }) => (
          <Box key={position} position={position} content={content} />
        ))}
      </div>
      {!active && <button onClick={handleReset}>Reset Game</button>}
    </>
  );
}
