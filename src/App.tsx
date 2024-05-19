import { useEffect, useState } from 'react';
import './App.css';
import { Hangman } from './components/Hangman/Hangman';
import LanguageSwitch from './components/LanguageSwitch/LanguageSwitch';
import Button from 'react-bootstrap/Button';
import { KeyboardWrapper } from './components/KeyboardWrapper/KeyboardWrapper';
import 'bootstrap/dist/css/bootstrap.min.css';
import { hangmanWords } from './utils/words';
import toast, { Toaster } from 'react-hot-toast';
import { Badge } from 'react-bootstrap';
import { Tooltip } from 'react-tooltip';
import { BiInfoCircle } from 'react-icons/bi';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function App() {
  const [count, setCount] = useState<number>(0);
  const [language, setLanguage] = useState<'english' | 'spanish'>('english');
  const [started, setStarted] = useState(false);
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [placeholder, setPlaceholder] = useState<string>('');
  const [hint, setHint] = useState<string>("")

  useEffect(() => {
    if (started && count <= 6 && word) {
      const wordSet = new Set(word.split(''));
      const guessedSet = new Set(guessedLetters);
      if (Array.from(wordSet).every(letter => guessedSet.has(letter))) {
        // All letters in the word have been guessed
        toast("YOU WIN!👏", {
          position: "top-right",
          style: {
            background: "green",
            color: "white",
          },
        });
        resetGame();
      } else if (count >= 6) {
        // Maximum number of incorrect guesses reached
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
    const randomNumber = getRandomInt(49)
    const selectedWord = hangmanWords[randomNumber][language];
    setWord(selectedWord);
    setHint(hangmanWords[randomNumber][`${language}Hint`]);
    setGuessedLetters([]);
    setPlaceholder(selectedWord.replace(/[A-Za-z]/g, '_'));
  };


  const startGame = (): void => {
    setStarted(true);
    selectWord();
    toast.dismiss()
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
      // Ignore guesses if the game hasn't started or the letter has already been guessed
      return;
    }

    const included = word.includes(guessedLetter);
    console.log({ guessedLetter, included });

    if (!included) {
      setCount(prevCount => prevCount + 1);
    } else {
      // Update the placeholder to reveal the guessed letter
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

  return (
    <div className='mainContainer'>
      <div className="title">
        <Badge pill bg="primary">
          HANGMAN
        </Badge>
      </div>
      <Toaster />
      <div className={`appContainer ${started ? 'started' : 'not-started'}`}>

        {started ? (
          <div className="gameContainer">
            <Hangman lostLives={count} />
            <KeyboardWrapper onLetterClick={handleGuess} guessedLetters={guessedLetters} />
            <div className="wordPlaceholder">
              {placeholder.split('').map((letter, index) => {
                return <span key={index}>{letter}</span>;
              })}
            </div>
            <div className="buttonContainer">
              <Button variant="primary" className='resetButton' onClick={resetGame}>{language === 'english' ? 'Reset Game' : 'Empezar de nuevo'}</Button>
              <a data-tooltip-id="my-tooltip" data-tooltip-content={hint}>
                <BiInfoCircle color='white' size={32} />
              </a>
            </div>
            <div className='wordPlaceholder'>{`${language === 'english' ? 'Guessed Letters:' : 'Ya presionadas:'} ${guessedLetters.join(', ')}`}</div>
          </div>
        ) : (
          <>
            <div className='switchContainer'><LanguageSwitch onToggle={setLanguage} /></div>
            <div className='startContainer'>
              <Button variant="primary" onClick={startGame}>{language === 'english' ? 'START!' : 'EMPEZAR!'}</Button>
            </div>
          </>
        )}
        {!started && <div className="filler" />}
        <Tooltip id="my-tooltip" />

      </div>
    </div>
  );
}

export default App;
