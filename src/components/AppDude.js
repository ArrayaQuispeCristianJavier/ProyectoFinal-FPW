import Phaser from 'phaser';
import { useState, useEffect } from 'react';
import Escena1 from "./sceneDude/Escena1.js";//Busca de donde viene Escena1
import Escena2 from "./sceneDude/Escena2.js";
import Escena3 from "./sceneDude/Escena3.js";
import Menu from "./sceneDude/Menu.js";
import Victoria from "./sceneDude/Victoria.js";
import Derrota from "./sceneDude/Derrota.js";

function AppPhaser() {

  const [listo, setListo] = useState(false);
  useEffect(() => {
    let config = {
      type: Phaser.AUTO,
      width: 800,//ancho
      height: 600,//alto
      physics:
      {
        default: 'arcade',
        arcade:
        {
          gravity: { y: 300 },
          debug: false
        }
      },
      scene: [Menu, Escena1, Escena2, Escena3, Victoria, Derrota]//Vector donde se guardara las escenas, victoria,derrota y escena
    };


    let game = new Phaser.Game(config);
    game.events.on("Listo", setListo)
    return () => {
      setListo(false);
      game.destroy(true)
    }
  }, [listo]);
}
export default AppPhaser;