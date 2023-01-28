class PauseScene extends Phaser.Scene {
    constructor() {
        super('PauseScene');
        this.cursors = undefined;
        this.pauseText;
    };
    preload() {

    };
    create() {
        this.cursors = this.input.keyboard.addKeys('W,S,A,D, SPACE, P, ESC');
        console.log('logging cursors', this.cursors);

        this.pauseText = this.add.text(1650, 700, `Paused`, {
            fontSize: '60px',
            fill: '#fff',
          });
    };
    update() {
        if (this.cursors.P.isDown) {
            this.scene.resume('GameScene1');
            this.scene.stop('PauseScene')
            } 
    };
}