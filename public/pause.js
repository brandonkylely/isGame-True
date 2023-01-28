class PauseScene extends Phaser.Scene {
    constructor() {
        super('PauseScene');
        this.cursors = undefined;
        this.pauseText;
        this.pauseOverlay;
    };
    preload() {

    };
    create() {
        this.cursors = this.input.keyboard.addKeys('W,S,A,D, SPACE, P, ESC');
        console.log('logging cursors', this.cursors);

        this.pauseOverlay = this.add.rectangle(1750, 850, 3500, 1700, 0x000000);
        this.pauseOverlay.alpha = 0.3;

        this.pauseText = this.add.text(1550, 700, `Paused :)`, {
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