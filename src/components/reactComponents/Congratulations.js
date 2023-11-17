import React from 'react';

function Congratulations({ playerName, score,player }) {
    return (
        <div>
            <h1>{playerName}</h1>
            <p>Your score is {player}: {score}</p>
        </div>
    );
}
export default Congratulations;