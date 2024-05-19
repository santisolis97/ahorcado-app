import { useState } from 'react';
import './LanguageSwitch.css';

type LanguageSwitchProps = {
    onToggle: (language: 'english' | 'spanish') => void;
}

const LanguageSwitch = ({ onToggle }: LanguageSwitchProps) => {
    const [isEnglish, setIsEnglish] = useState(true);

    const toggleLanguage = () => {
        const newIsEnglish = !isEnglish;
        setIsEnglish(newIsEnglish);
        onToggle(newIsEnglish ? 'english' : 'spanish');
    };

    return (
        <div className="LanguageSwitch" onClick={toggleLanguage}>
            <button style={{ left: isEnglish ? '50px' : '0px' }}>
                {isEnglish ? '🇬🇧' : '🇪🇸'}
            </button>
            <div>🇪🇸</div>
            <div>🇬🇧</div>
        </div>
    );
};

export default LanguageSwitch;
