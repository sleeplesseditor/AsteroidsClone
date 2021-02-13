import GameContext from './GameContext';
import { Game } from './components/Game';
import { GameContextProvider } from './GameContext';

function App() {
  return (
    <GameContextProvider>
      <Game />
    </GameContextProvider>
  );
}

export default App;
