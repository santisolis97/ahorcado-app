import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { hangmanWords } from '../utils/words';
import { HangmanDraw } from "../components/HangmanDraw/HangmanDraw";
import { KeyboardWrapper } from "../components/KeyboardWrapper/KeyboardWrapper";
import { BiInfoCircle } from "react-icons/bi";
import LanguageSwitch from "../components/LanguageSwitch/LanguageSwitch";
import { Tooltip } from "react-tooltip";
import Button from "../components/Button/Button";
import { Badge } from "../components/Badge/Badge";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
type HangmanProps = {
  setGame: (game: string | null) => void;
}
export const Hangman = ({ setGame }: HangmanProps) => {
  const [count, setCount] = useState<number>(0);
  const [language, setLanguage] = useState<'english' | 'spanish'>('english');
  const [started, setStarted] = useState(false);
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [placeholder, setPlaceholder] = useState<string>('');
  const [hint, setHint] = useState<string>("");

  useEffect(() => {
    if (started && count <= 6 && word) {
      const wordSet = new Set(word.split(''));
      const guessedSet = new Set(guessedLetters);
      if (Array.from(wordSet).every(letter => guessedSet.has(letter))) {
        toast("YOU WIN!👏", {
          position: "top-right",
          style: {
            background: "green",
            color: "white",
          },
        });
        resetGame();
      } else if (count >= 6) {
        toast("YOU LOST!😢", {
          position: "top-right",
          style: {
            background: "#ff5959",
            color: "white",
          },
        });
        resetGame();
      }
    }
  }, [count, guessedLetters, started, word]);

  const selectWord = () => {
    const randomNumber = getRandomInt(49);
    const selectedWord = hangmanWords[randomNumber][language];
    setWord(selectedWord);
    setHint(hangmanWords[randomNumber][`${language}Hint`]);
    setGuessedLetters([]);
    setPlaceholder(selectedWord.replace(/[A-Za-z]/g, '_'));
  };

  const startGame = (): void => {
    setStarted(true);
    selectWord();
    toast.dismiss();
  };

  const resetGame = (): void => {
    setStarted(false);
    setCount(0);
    setGuessedLetters([]);
    setWord('');
    setPlaceholder('');
  };

  const handleGuess = (guessedLetter: string): void => {
    if (!started || guessedLetters.includes(guessedLetter)) {
      return;
    }

    const included = word.includes(guessedLetter);
    if (!included) {
      setCount(prevCount => prevCount + 1);
    } else {
      setPlaceholder(word
        .split('')
        .map(letter =>
          guessedLetters.includes(letter) ? letter : guessedLetter === letter ? letter : '_'
        )
        .join('')
      );
    }

    setGuessedLetters(prevGuessedLetters => [...prevGuessedLetters, guessedLetter]);
  };

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const keyPressed = event.key.toLowerCase();
      if (/[a-z]/.test(keyPressed) && started && !guessedLetters.includes(keyPressed)) {
        handleGuess(keyPressed);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [started, guessedLetters]);
  const goBack = () => {
    setGame(null);
    resetGame();
  }
  return (
    <div className="w-full bg-gray-900 min-h-screen flex flex-col items-center p-4">
      <div className="flex justify-center items-center w-full p-4 text-2xl text-white">
        <Badge className="text-3xl">
          HANGMAN
        </Badge>
      </div>
      <Toaster />
      <div className={`w-full h-full flex flex-col items-center ${started ? 'justify-center' : 'justify-between'}`}>
        {started ? (
          <div className="flex flex-col items-center gap-4 pt-12">
            <HangmanDraw lostLives={count} />
            <KeyboardWrapper onLetterClick={handleGuess} guessedLetters={guessedLetters} />
            <div className="flex gap-4 justify-center items-center text-white text-2xl">
              {placeholder.split('').map((letter, index) => (
                <span key={index}>{letter}</span>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <Button className="flex-1" onClick={resetGame}>
                {language === 'english' ? 'Reset Game' : 'Empezar de nuevo'}
              </Button>
              <a data-tooltip-id="my-tooltip" data-tooltip-content={hint}>
                <BiInfoCircle color='white' size={32} />
              </a>
            </div>
            <div className="text-white text-xl">
              {`${language === 'english' ? 'Guessed Letters:' : 'Ya presionadas:'} ${guessedLetters.join(', ')}`}
            </div>
          </div>
        ) : (
          <>
            <div className="w-full flex justify-end items-center">
              <LanguageSwitch onToggle={setLanguage} />
            </div>
            <div className="w-full flex-col gap-2 h-full flex justify-center items-center">
              <Button onClick={startGame}>
                {language === 'english' ? 'START!' : 'EMPEZAR!'}
              </Button>
              <Button variant="danger" onClick={goBack}>
                {language === 'english' ? 'GO BACK' : 'VOLVER'}
              </Button>
            </div>
          </>
        )}
        {!started && <div className="h-full" />}
        <Tooltip id="my-tooltip" />
      </div>
    </div>
  );
};
