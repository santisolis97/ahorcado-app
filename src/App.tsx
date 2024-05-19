import { useState } from "react";
import { Hangman } from "./Games/Hangman.tsx";
import GameSelector from "./components/GameSelector/GameSelector.tsx";
import { games } from "./utils/games.ts";
import TicTacToe from "./Games/TicTacToe.tsx";

function App() {
  const [game, setGame] = useState<string | null>(null);
  return (
    game === null ? (
      <div className="h-full flex items-center justify-center">
        <GameSelector setGame={setGame} games={games} />
      </div>
    ) : (
      <div>
        {(game === 'hangman' && <Hangman setGame={setGame} />)}
        {(game === 'tictactoe' && <TicTacToe setGame={setGame} />)}
      </div>
    )
  )
}

export default App;
