import React, { useState, useEffect } from 'react';
import Map from './Map';
import Scoreboard from './Scoreboard';

const Game = () => {
    const [score, setScore] = useState(0);
    const [currentImage, setCurrentImage] = useState('');
    const [isGameActive, setIsGameActive] = useState(false);
    const [guess, setGuess] = useState('');

    const images = [
        // Add paths to your artistic images here
        '/assets/images/image1.jpg',
        '/assets/images/image2.jpg',
        '/assets/images/image3.jpg',
        // More images...
    ];

    const startGame = () => {
        setScore(0);
        setIsGameActive(true);
        setNextImage();
    };

    const setNextImage = () => {
        const randomIndex = Math.floor(Math.random() * images.length);
        setCurrentImage(images[randomIndex]);
    };

    const handleGuess = () => {
        // Logic to determine score based on the guess
        // For simplicity, let's assume each correct guess gives 10 points
        if (guess === 'correctLocation') { // Replace with actual logic
            setScore(score + 10);
        }
        setGuess('');
        setNextImage();
    };

    useEffect(() => {
        if (isGameActive) {
            setNextImage();
        }
    }, [isGameActive]);

    return (
        <div className="game-container">
            <h1>Worldguessr</h1>
            {isGameActive ? (
                <>
                    <Map image={currentImage} />
                    <input 
                        type="text" 
                        value={guess} 
                        onChange={(e) => setGuess(e.target.value)} 
                        placeholder="Enter your guess" 
                    />
                    <button onClick={handleGuess}>Submit Guess</button>
                    <Scoreboard score={score} />
                </>
            ) : (
                <button onClick={startGame}>Start Game</button>
            )}
        </div>
    );
};

export default Game;