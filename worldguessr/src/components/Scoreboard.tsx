import React from 'react';

const Scoreboard: React.FC<{ score: number; playerStats: { name: string; guesses: number }[] }> = ({ score, playerStats }) => {
    return (
        <div className="scoreboard">
            <h2>Scoreboard</h2>
            <p>Current Score: {score}</p>
            <h3>Player Statistics</h3>
            <ul>
                {playerStats.map((player, index) => (
                    <li key={index}>
                        {player.name}: {player.guesses} guesses
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Scoreboard;