class Derrota extends Phaser.Scene{
    constructor(){
        super("Derrota");
        } 

 preload(){
    this.load.image('GameOver', '/img/Derrota.jpg');
 }
 create(){
    this.add.image(400,300,'GameOver');
 }
}
export default Derrota;