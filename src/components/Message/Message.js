import { useGame } from '../../context/GameContext';
import './Message.css';

export default function Message() {
  const { gameMessage } = useGame();
  return (
    <div className="message">
      <p>{gameMessage}</p>
    </div>
  );
}
