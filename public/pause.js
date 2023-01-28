class PauseScene extends Phaser.Scene {
    constructor() {
        super('PauseScene');
        this.cursors = undefined;
    };
    preload() {

    };
    create() {
        this.cursors = this.input.keyboard.addKeys('W,S,A,D, SPACE, P, ESC');
        console.log('logging cursors', this.cursors);
    };
    update() {
        if (this.cursors.P.isDown) {
            this.scene.resume('GameScene1');
            this.scene.stop('PauseScene')
            } 
    };
}