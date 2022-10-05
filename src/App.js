import './App.css';
import Board from './components/Board/Board';
import Message from './components/Message/Message';

function App() {
  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <Message />
      <Board />
    </div>
  );
}

export default App;
