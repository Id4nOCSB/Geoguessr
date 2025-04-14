import React from 'react';

const Map: React.FC<{ imageUrl: string; onGuess: (guess: string) => void }> = ({ imageUrl, onGuess }) => {
    const [guess, setGuess] = React.useState('');

    const handleGuessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGuess(event.target.value);
    };

    const handleGuessSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onGuess(guess);
        setGuess('');
    };

    return (
        <div className="map-container">
            <img src={imageUrl} alt="Artistic representation" className="map-image" />
            <form onSubmit={handleGuessSubmit} className="guess-form">
                <input
                    type="text"
                    value={guess}
                    onChange={handleGuessChange}
                    placeholder="Enter your guess"
                    className="guess-input"
                />
                <button type="submit" className="guess-button">Submit Guess</button>
            </form>
        </div>
    );
};

export default Map;