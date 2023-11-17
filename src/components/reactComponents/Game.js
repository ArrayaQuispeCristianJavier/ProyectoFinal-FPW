import React, { useState, useEffect } from 'react';
import animal from '../data/animal.json';

/*Componente juego que tiene los props*/
function Game({ playerName1, playerName2, score2, score1, setScore1, setScore2, Player2Finishes, actualRound, setActualRound, comodinUso, setComodinUso, comodinUso2, setComodinUso2 }) {
  const [targetAnimal, setTargetAnimal] = useState('');
  const [options, setOptions] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [totalRounds, SetTotalRounds] = useState(Math.floor(Math.random() * 6) + 5);
  const [canClick, setCanClick] = useState(true);

  const [Player2Turn, setPlayer2Turn] = useState(false);



  /*Va a obtener un animal de forma aleatoria del arreglo 'animales' y devuelve el animal seleccionado*/
  const getRandomAnimal = () => {
    const animals = animal;
    const randomIndex = Math.floor(Math.random() * animals.length);
    return animals[randomIndex];
  };

  /*Se va a encargar de tener 3 opciones de animales*/
  const getRandomOptions = () => {
    const correctAnimal = getRandomAnimal();//Va a llamar a la funcion 'obtenerAnimalesAleatorio()' para tener un animal
    let randomOptions = [correctAnimal];//opcionesAleatoria es un arreglo que tiene animalCorrecto osea dice que el animal que toque siempre salga en las opciones

    while (randomOptions.length < 3) {
      const option = getRandomAnimal();
      if (!randomOptions.includes(option)) {
        randomOptions.push(option);
      }
    }

    randomOptions = randomOptions.sort(() => Math.random() - 0.5);

    setOptions(randomOptions);
    setTargetAnimal(correctAnimal.name);
  };

  const verifyAnswer = (selectedAnimal) => {
    if (selectedAnimal === targetAnimal) {//Verifica si la opcion que eligio el usuario es igual a la opcion que le dio de forma aleatoria 
      if (!Player2Turn) {//Si no es el turno de jugador 2 entonces se le aumenta el puntaje al jugador 1
        setScore1(score1 + 1);
      } else {//En caso que SI sea turno del jugador 2 entonces este le aumenta su puntaje a el (jugador 2)
        setScore2(score2 + 1);
      }
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setCanClick(false);
  };

  const nextRound = () => {
    if (actualRound < totalRounds * 2) {
      setActualRound(actualRound + 1);
      setIsCorrect(null);
      setCanClick(true);
      getRandomOptions();
      /*Explicacion con detalles: Va a cambiar de ronda una vez que se haya completado la mitad de la ronda */
      //Si la ronda actual es igual o mayor a ronda totales dara el aviso que esta a la mitad y cambiara de jugador
      setPlayer2Turn(actualRound >= totalRounds);
    } else {
      if (Player2Turn) {
        Player2Finishes(score2);
      } else {
        setPlayer2Turn(true);
      }

    }
  }
  const disabledOptions = isCorrect !== null;


  const comodinFuncion = () => {
    /*Si el jugador 2 no es su turno y el comodin no fue usado*/
    if (!Player2Turn && !comodinUso) {
      console.log("El jugador 1 uso el comodin");
      setComodinUso(true);

      //Recorre el arreglo de los animales elegido
      for (let i = 0; i < options.length; i++) {
        //El arreglo tiene mas de dos opciones
        if (options.length > 2) {//devuelve la cantidad del arreglo
          //Que recorra el arreglo que aumenta la cantidad con i++ del for y me de el nombre y preguntar si no es igual al animal elegido que es verdadero 
          if (options[i].name !== targetAnimal.name) {
            //va a recorriendo los elemento options con option y va a obtener el nombre de ese arreglo, y pregunta si es diferente que el 
            const deleteRandomOption = options.filter(option => option.name !== options[i].name);
            setOptions(deleteRandomOption);
            console.log("Se elimino una opcion");
          }
        }
      }
      console.log(`El animal correcto es ${targetAnimal}`);
    } else if (Player2Turn && !comodinUso2) {
      console.log("El jugador 2 uso el comodin")
      setComodinUso2(true);
      for (let i = 0; i < options.length; i++) {
        if (options.length > 2) {
          if (options[i].name !== targetAnimal.name) {
            const deleteRandomOption = options.filter(option => option.name !== options[i].name);
            setOptions(deleteRandomOption);
            console.log("Se elimino una opcion");
          }
        }
      }

      console.log(`El animal correcto es ${targetAnimal}`);
    }
  }

  useEffect(() => {
    getRandomOptions();
  }, [actualRound]);

  return (
    <div>
      {/* Si el turno de jugador es falso, mostrara al jugador 1 o sino pasa lo contrario */}
      <h1>{!Player2Turn ? playerName1 : playerName2}, Which animal is this?</h1>
      <p>Round: {actualRound}</p>
      <img src={`img/${targetAnimal}.jpg`} alt={targetAnimal} />
      <div>
        {options.map((animal) => (
          <button
            key={animal.name}
            onClick={() => verifyAnswer(animal.name)}
            disabled={!canClick || disabledOptions}
          >
            {animal.name}
          </button>
        ))}
      </div>
      {isCorrect === true && <p>You're right!</p>}
      {isCorrect === false && <p>Incorrect!</p>}
      <button onClick={nextRound}>Next round</button>

      {!comodinUso && !Player2Turn || !comodinUso2 && Player2Turn ? <button onClick={comodinFuncion}>Comodin</button> : <></>}

    </div>
  );
};
export default Game;