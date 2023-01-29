class MusicScene extends Phaser.Scene {
    constructor() {
        super('MusicScene');
        this.song1;
    };
    preload() {
        this.load.audio('song1', 'assets/morning-sun-sakura-girl.mp3');
    };
    create() {
        this.quietSound('song1')
    };

    quietSound(sound) {
        this.song = this.sound.add(`${sound}`, {volume: 0.2});
        this.song.play();
      }

    update() {

    };
}