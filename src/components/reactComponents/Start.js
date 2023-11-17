import React, { useState } from 'react';
//Importamos los componente necesarios
import Game from './Game';
import Congratulations from './Congratulations';

function Start() {
    const [playerName1, setPlayerName1] = useState('');//Nombre del jugador 1
    const [playerName2, setPlayerName2] = useState('');//Nombre del jugador 2
    const [score1, setScore1] = useState(0);//Puntaje del jugador 1
    const [score2, setScore2] = useState(0);//Puntaje del jugador 2
    const [displayGame, setDisplayGame] = useState(false);//Estado que decide si se debe mostrar la pantalla del juego
    const [displayCongratulations, setDisplayCongratulations] = useState(false);//Estado que mostrara la pantalla final al terminar las rondas
    const [actualRound, setActualRound] = useState(1);//Estado que guardara el estado de la ronda actual

    /*Definimos los estados en start que tenemos en game y hacerlo como props 77 y llamarlo a game*/
    const [comodinUso, setComodinUso] = useState(false);//Comodin jugador 1
    const [comodinUso2, setComodinUso2] = useState(false);//Comodin jugador 2 

    /*Se va a llamar a esta funcion cada vez que los jugadores presionen sobre el boton y va a hacer las verificaciones de los nombres*/
    const ClickToPlay = (name) => {
        /*Alerta que si un jugador o ambos no pusieron sus nombres*/
        if (playerName1 === "" && playerName2 === "") {
            window.alert("Please insert your names");
        } else {
            if (playerName1 === "") {
                window.alert("Player1, please insert your name")
                setPlayerName1(name);
            } else if (playerName2 === "") {
                window.alert("Player2, please insert your name")
                setPlayerName2(name);
                //setMostrarJuego(true);
            }
        }
        /*Verifica que los jugadores pongan sus nombres, si es verdadero mostrara el juego*/
        if (playerName1 !== "" && playerName2 !== "") {
            setDisplayGame(true);
        }
    };
    /*Se lo va a llamar una vez que el jugador X termine su turno*/
    const Player1Finishes = (score) => {//Recibe el argumento 'puntaje' que sera la puntacion obtenida del jugador 1
        setScore1(score);//Actualiza la puntuacion del jugador 1 con el valor de 'puntaje' osea el puntaje obtenido al terminar su turno
        if (playerName2 === "") {
            setDisplayGame(false);
            setDisplayCongratulations(false);
        } else {//Si el jugador ingreso su nombre resetea la puntuacion a 0 para la otra ronda         
            setScore2(0);
            setDisplayCongratulations(true);
            setDisplayGame(false);
        }
    }

    const Player2Finishes = (score) => {//Cuando jugador 2 termine su turno, este tendra un argumento que va a ser la puntuacion pero del jugador 2
        setScore2(score);
        setDisplayCongratulations(true);
        setDisplayGame(false);
    };

    if (!displayGame && !displayCongratulations) {
        return (
            <div>
                <h1>Insert your name Player1</h1>
                <input
                    type="text"
                    onChange={(e) => setPlayerName1(e.target.value)}
                />
                <button onClick={() => ClickToPlay(playerName1)}>Play</button>

                <h1>Insert your name Player2</h1>
                <input
                    type="text"
                    onChange={(e) => setPlayerName2(e.target.value)}
                />
                <button onClick={() => ClickToPlay(playerName2)}>Play</button>
            </div>
        );
    } else if (displayGame) {
        return (
            <div>
                <Game
                    /*PROPS*/
                    playerName1={playerName1}
                    playerName2={playerName2}
                    score1={score1}
                    setScore1={setScore1}
                    score2={score2}
                    setScore2={setScore2}
                    Player1Finishes={Player1Finishes}
                    Player2Finishes={Player2Finishes}
                    actualRound={actualRound}
                    setActualRound={setActualRound}
                    comodinUso={comodinUso}
                    setComodinUso={setComodinUso}
                    comodinUso2={comodinUso2}
                    setComodinUso2={setComodinUso2}
                />
            </div>
        );
    } else if (displayCongratulations) {
        let winnerName = '';
        let winnerScore = 0;
        if (score1 > score2) {
            winnerName = playerName1;
            winnerScore = score1;
        } else if (score2 > score1) {
            winnerName = playerName2;
            winnerScore = score2;
        }
        return (
            <div>
                <Congratulations playerName={playerName1} score={score1} />
                <Congratulations playerName={playerName2} score={score2} /><br></br>
                <h1>The player with the highest score!</h1>
                <Congratulations playerName={winnerName} score={winnerScore} />
                <p>Congratulations!</p>
            </div>
        );
    }
}

export default Start;