class Escena3 extends Phaser.Scene {


   constructor() {
      super("Escena3");
      this.platforms = null;
      //Se le pone en el contructor para que el puntaje que se obtuvo en la escena 1 pase con el mismo a la siguiente escena
      //Se crea el puntaje y en la linea 136 se lo utiliza
      this.scoreText = "";
      this.score = 180;
   }


   /*Precarga de los archivos para escena actual y siguiente escena, los recursos tiene un nombre e unico*/
   preload() {
      this.load.image('sky', '/img/sky.png');
      this.load.image('ground', '/img/platform.png');
      this.load.image('star', '/img/star.png');
      this.load.image('bomb', '/img/bomb.png');
      //Es el ancho y alto de la imagen del sprite
      this.load.spritesheet('dude', '/img/dude.png', { frameWidth: 32, frameHeight: 48 });
   }


   /*Va a poder ejecutar las escena de preload() y agregar elementos a la escena*/
   create() {


      this.add.image(400, 300, 'sky');
      //La plataforma se comportara como un obejto fisico que lo afectara las leyes de la fisica, gravedad y colisiones
      //En este caso se le esta agregando fisica a las plataforma
      this.platforms = this.physics.add.staticGroup();
      //El ground se le asigna el nombre plataforma
      this.platforms.create(150, 450, 'ground'); //primer piso
      this.platforms.create(550, 450, 'ground'); //primer piso
      this.platforms.create(250, 350, 'ground'); //segundo piso
      this.platforms.create(650, 350, 'ground'); //segundo piso
      this.platforms.create(150, 250, 'ground'); //tercer piso
      this.platforms.create(550, 250, 'ground'); //tercer piso
      this.platforms.create(250, 150, 'ground'); //cuarto piso
      this.platforms.create(650, 150, 'ground');
      this.platforms.create(400, 568, 'ground').setScale(2).refreshBody(); //planta baja, base

      //Agrega al jugador con fisicas y definido como un sprite
      this.player = this.physics.add.sprite(40, 510, 'dude');

      /*Define el rebote entre el sprite y el objeto o el piso, su funcion es (0.2) el 0 signfica que no hay rebote y el 2 si hay rebote*/
      this.player.setBounce(0.2);

      /*Metodo que se utiliza si el sprite colisiona con los objeto del mundo osea en este caso con el sprite y no podra atraverzalo*/
      this.player.setCollideWorldBounds(true);

      /*Es un modulo que se encarga de controlar las animaciones y se le asignara a un sprite de un juego*/
      //Esta funcion se va a encargar se crear la animacion hacia la izquierda
      this.anims.create({
         key: 'izquierda',
         //Va ir hacia el sprite del jugador y va a contar los frames que va a utilizar para hacer la animacion
         frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
         frameRate: 10,
         //El valor es negativo para que se repita todo el tiempo
         repeat: -1
      });

      //Esta funcion va hacer que el sprite se quede en reposo
      this.anims.create({
         key: 'reposo',
         frames: [{ key: 'dude', frame: 4 }],
         frameRate: 20
      });

      //Esta funcion se va a encargar de mover el sprite hacia la derecha
      this.anims.create({
         key: 'derecha',
         frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
         repeat: -1
      });

      /*Este metodo se va a encargar de detectar la colision entre dos objetos*/
      this.physics.add.collider(this.player, this.platforms);

      /*Con esta linea se esta diciendo que va a utilizar el teclado para mover*/
      this.cursors = this.input.keyboard.createCursorKeys();

      /*Se agrega la megaestrella*/
      this.stars = this.physics.add.group({
         key: 'star',
         //se genera en la posición x e y
         setXY: { x: 780, y: 20 }
      });

      //Se agrega el rebote
      this.stars.children.iterate(function (child) {
         //Valores aleatorio del rebote de la estrellas
         child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      });

      //Habilita las colisiones de las entrellas con la plataforma
      this.physics.add.collider(this.stars, this.platforms);

      //Choque entre las estrellas y el jugador
      //El metodo this.physics.add.overlap verifica si dos objeto estan chocando y si es verdadero se ejecuta la funcion
      this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

      //Para controlar el puntaje
      this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
     //Texto que avisa que hay que correr
     this.scoreText = this.add.text(300, 16, 'It is the final star! RUN!', { fontSize: '20px', fill: '#000' });

      // Muestra el texto del temporizador
      this.timerText = this.add.text(16, 50, '', { fontSize: '32px', fill: '#FFFFFF' });

      this.timer = this.time.addEvent({
         // equivale a 25 segundos
         delay: 25000,
         // Cuando el tiempo se acabe, llamara a la funcion
         callback: this.timeOver,
         callbackScope: this
      });

   }



   /*Es un metodo que se va actualizar todo el tiempo osea es un bucle infinito que espera que se ejecute alguna accion, en este caso se encargara de realizar los movimiento del personaje*/
   update() {
      if (this.cursors.left.isDown) {
         this.player.setVelocityX(-160);
         this.player.anims.play('izquierda', true);
      }
      else if (this.cursors.right.isDown) {
         this.player.setVelocityX(160);
         this.player.anims.play('derecha', true);
      }
      else {
         this.player.setVelocityX(0);
         this.player.anims.play('reposo');
      }
      if (this.cursors.up.isDown && this.player.body.touching.down) {
         this.player.setVelocityY(-330);
      }
      if (this.score == 1180) {
         this.scene.start('Victoria');

      }

      // Calcula el tiempo restante y actualiza el texto del temporizador
      const timeLeft = Math.ceil((this.timer.delay - this.timer.getElapsed()) / 1000);
      this.timerText.setText('Time: ' + timeLeft)

   }


   //Colisión entre el jugador y las estrellas
   collectStar(player, star) {
      star.disableBody(true, true);
      this.score += 1000;
      this.scoreText.setText('Score: ' + this.score);

   }



   hitBomb(player, bomb) {
      this.physics.pause();
      player.setTint(0xff0000);
      player.anims.play('turn');
      this.scene.start('Derrota');
   }

   timeOver() {
      // si se acaba el tiempo, el jugador pierde
      this.scene.start('Derrota');
   }

}

export default Escena3;