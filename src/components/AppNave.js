import Phaser from 'phaser';
import { useState, useEffect } from 'react';
import Menu from './sceneNave/Menu';
import Inicio from './sceneNave/Inicio';
import Derrota from './sceneNave/Derrota';
import Escena2 from './sceneNave/Escena2';
import Victoria from './sceneNave/Victoria';
function AppPhaser() {

    const [listo, setListo] = useState(false);

    useEffect(() => {
        let config = {
            type: Phaser.AUTO,
            width: 1000,//ancho
            height: 660,//alto
            physics:
            {
                default: 'arcade',
                arcade:
                {
                    gravity: { y: 0 },
                    debug: false
                }
            },
            scene: [Menu, Inicio, Derrota, Escena2, Victoria]//Vector donde se guardara las escenas, victoria y derrota

        };
        let game = new Phaser.Game(config);
        game.events.on("Listo", setListo)
        return () => {
            setListo(false);
            game.destroy(true);
        }
    }, [listo]);
}
export default AppPhaser;