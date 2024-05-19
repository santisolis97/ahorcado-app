import Keyboard from 'react-simple-keyboard';
import "react-simple-keyboard/build/css/index.css";

type KeyboardWrapperProps = {
    onLetterClick: (value: string) => void,
    guessedLetters: string[]
}

export const KeyboardWrapper = ({ onLetterClick, guessedLetters }: KeyboardWrapperProps) => {

    console.log(guessedLetters)
    return (
        <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
        }}>
            <Keyboard
                excludeFromLayout={{ default: guessedLetters }}
                onKeyPress={onLetterClick}
                layout={{
                    'default': [

                        'q w e r t y u i o p',
                        'a s d f g h j k l',
                        'z x c v b n m',
                    ],
                }}
            />
        </div>
    )
}