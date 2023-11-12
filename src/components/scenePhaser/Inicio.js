import Phaser from "phaser";

class Inicio extends Phaser.Scene {

    constructor() {

        super("Inicio");

        this.scoreText = "";

        this.score = 0;

        this.vidaText = "";

        this.vida = 100;


    }

    preload() {

        // Cargar las imágenes de fondo, nave y enemigos
        this.load.image('fondo', '/img/sky.jpeg');

        this.load.spritesheet('nave', '/img/nave.png', { frameWidth: 70, frameHeight: 62 });

        this.load.image('red', '/img/red.png');

        this.load.image('enemy', '/img/enemy.png');

        this.load.image('disparoNave', '/img/shoot.png');

        this.load.image('disparoEnemy', '/img/shootEnemy.png');

    }

    create() {

        // Cargar la imagen de fondo

        this.add.image(400, 300, 'fondo');

        // Agregar partículas que sigan a la nave

        let particles = this.add.particles(-10, 0, 'red', {
            speed: 100,

            angle: { min: 150, max: 210 },

            scale: { start: 1, end: 0 },

            blendMode: 'ADD'

        });

        // Hacer nave un sprite
        this.nave = this.physics.add.sprite(100, 300, 'nave');

        this.cursors = this.input.keyboard.createCursorKeys();

        // Hace que las partículas sigan a la nave
        particles.startFollow(this.nave);

        // Crear enemigos aleatorios
        this.time.addEvent({

            delay: 3000,

            callback: this.crearEnemyAleatorio,

            callbackScope: this,

            repeat: -1

        });

        // Colisión con el mundo para la nave

        this.nave.setCollideWorldBounds(true);

        //Desactivar la gravedad
        this.nave.body.allowGravity = false;

        // Crear animaciones de la nave
        this.anims.create({

            key: 'abajo',
            frames: this.anims.generateFrameNumbers('nave', { start: 1, end: 1 }),

            frameRate: 20

        });
        this.anims.create({

            key: 'reposo',

            frames: this.anims.generateFrameNumbers('nave', { start: 0, end: 0 }),

            frameRate: 20

        });
        this.anims.create({
            key: 'arriba',

            frames: this.anims.generateFrameNumbers('nave', { start: 2, end: 2 }),

            frameRate: 20
        });

        //Grupo de disparos
        this.disparoNave = this.physics.add.group();

        //grupo de disparo de nave enemigo
        this.disparoEnemy = this.physics.add.group();



        this.enemigo = this.physics.add.group();

        /*Colision entre los disparo del enemigo y la nave */
        this.physics.add.overlap(this.disparoNave, this.enemigo, this.eliminarEnemigo, null, this);

        this.physics.add.overlap(this.nave, this.disparoEnemy, this.danioEnemigo, null, this);
        //Para controlar el puntaje
        this.scoreText = this.add.text(16, 16, 'Puntaje: 0', { fontSize: '35px', fill: '#EEEEEE' });

        //Para controlar la vida de la nave
        this.vidaText = this.add.text(300, 16, 'Vida:100', { fontSize: '35px', fill: '#EEEEEE' });

        this.reload = true;

    }

    crearEnemyAleatorio() {

        for (let i = 0; i < 8; i++) {

            let enemyDistanciaVertical = Phaser.Math.Between(50, 650);

            let enemyDistanciaHorizontal = Phaser.Math.Between(2000, 1100);

            let enemy = this.enemigo.create(enemyDistanciaHorizontal, enemyDistanciaVertical, 'enemy');

            enemy.checkWorldBounds = true;

            enemy.on('outOfBounds', () => {

                enemy.destroy();

            });

            enemy.body.velocity.x = -200;


            let disparoEnemigo = this.disparoEnemy.create(enemy.x, enemy.y, 'disparoEnemy');
            disparoEnemigo.setVelocityX(-600);
            disparoEnemigo.body.allowGravity = false;
            console.log("Haz eliminado un enemigo");

        }

    }

    update() {



        /*-------Controles de la nave--------*/
        // Lógica de movimiento de la nave
        if (this.cursors.up.isDown) {

            this.nave.setVelocityY(-250);

            this.nave.anims.play('arriba', true);

        } else if (this.cursors.down.isDown) {

            this.nave.setVelocityY(250);

            this.nave.anims.play('abajo', true);

        } else if (this.cursors.left.isDown) {

            this.nave.setVelocityX(-300);

        } else if (this.cursors.right.isDown) {

            this.nave.setVelocityX(300);

        } else {

            this.nave.setVelocityX(0);

            this.nave.setVelocityY(0);

            this.nave.anims.play('reposo', true);

        }
        //Si se presiona la tecla ESPACIO se va a ejecutar la funcion disparar()
        if (this.cursors.space.isDown && this.reload) {

            this.Disparo();


        }
        /*------------------------------------------------------*/


        //Si el jugador supera el puntaje 250 pasa a la escena final
        if (this.score == 250) {
            this.scene.start('Escena2');
        }
        //realizar un sistema de colision entre disparo del enemigo con nave y restar 20 de vida
        if (this.vida == 0) {
            this.scene.start('Derrota');
        }


    }


    /*---------Metodos--------------*/
    Disparo() {
        //grupo de objeto de disparo declarado en la linea 73 que sigue las coordenadas X Y de la nave y va a salir con la imagen

        this.recarga();

        let disparo = this.disparoNave.create(this.nave.x, this.nave.y, 'disparoNave');
        disparo.setVelocityX(2000);
    }
    eliminarEnemigo(disparoNave, enemy) {
        enemy.destroy();
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
        console.log("Elimino al enemigo");
    }
    danioEnemigo(nave, disparoEnemy) {

        this.vida = this.vida - 20;
        this.vidaText.setText('Vida: ' + this.vida);
        disparoEnemy.destroy();

    }
    recarga() {
        this.reload = false;
        if (!this.addreload) {
            this.time.addEvent({
                delay: 700,
                callback: () => {
                    this.reload = true;
                },
                callbackScope: this,
                repeat: -1
            })
        }
    }

    /*-------------------------------*/
}

export default Inicio;