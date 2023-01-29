// let backgroundMusic = document.querySelector('#backgroundMusic');
// backgroundMusic.innerHTML = '<embed src="./assets/morning-sun-sakura-girl.mp3" loop="true" autostart="true" width="2" height="0" id="backgroundSong">';
// let backgroundSong = document.querySelector('#backgroundSong');
// backgroundSong.volume = 0.2;

window.addEventListener('load', () => {
let config = {
  type: Phaser.AUTO,
  width: 3500,
  height: 1400,
  backgroundColor: 0x9900e3,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: {
        y: 220
      }
    }
  },
  scale: {
    parent: 'thegame',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  pixleArt: true,
  scene: [StartScene, MusicScene, GameScene1, PauseScene, GameScene2, GameScene3]
};

game = new Phaser.Game(config);
});