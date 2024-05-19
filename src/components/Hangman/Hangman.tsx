import './Hangman.css'

type HangmanProps = {
  lostLives: number, // Change lostLifes to lostLives
}

export const Hangman = ({ lostLives }: HangmanProps) => {
  return (
    <div className="hangman-container">
      <div className="pole">
        <div className="beam"></div>
        <div className="rope"></div>
        <div className="body">
          {lostLives > 0 && <div className="head"></div >}
          {lostLives > 1 && <div className="torso"></div >}
          {lostLives > 2 && <div className="left-arm"></div >}
          {lostLives > 3 && <div className="right-arm"></div >}
          {lostLives > 4 && <div className="left-leg"></div >}
          {lostLives > 5 && <div className="right-leg"></div >}
        </div>
      </div>
    </div>
  );
}
