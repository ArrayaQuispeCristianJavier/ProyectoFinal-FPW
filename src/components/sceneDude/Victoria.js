class Victoria extends Phaser.Scene{
    constructor(){
        super("Victoria");
        } 

 preload(){
    this.load.image('felicidades', '/img/Victoria.jpg');
 }
 create(){
    this.add.image(400,300,'felicidades');
 }
}
export default Victoria;