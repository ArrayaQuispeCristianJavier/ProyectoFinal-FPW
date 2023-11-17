class Derrota extends Phaser.Scene {
    constructor() {

        super('Derrota');
    }
    preload() {
        this.load.image('FondoDerrota', '/img/FondoDerrota.jpg')
        this.load.image('GameOver', '/img/GameOver.png')

    }

    create() {
        this.add.image(400, 300, 'FondoDerrota')
        this.add.image(200, 550, 'GameOver')



    }
}
export default Derrota;
