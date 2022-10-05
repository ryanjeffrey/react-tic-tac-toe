import { useGame } from '../../context/GameContext';

import './Box.css';

export default function Box({ position, content }) {
  const { handleBoxClick } = useGame();
  return (
    <div onClick={() => handleBoxClick(position)} id={position} className="box">
      {content}
    </div>
  );
}
