// http://phaser.io/tutorials/making-your-first-phaser-3-game/part10
let game;
const DUDE_KEY = 'dude';
window.addEventListener('load', () => {
  let config = {
    type: Phaser.AUTO,
    width: 3500,
    height: 1400,
    backgroundColor: 0x9900e3,
    physics: {
      default: 'arcade',
      arcade: {
        debug: true,
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
    scene: [GameScene]
  };

  game = new Phaser.Game(config);
});

class GameScene extends Phaser.Scene {
  constructor() {
    super('gameScene');
    this.player = undefined;
    this.cursors = undefined;
    // this.stars = undefined;
    this.starLayer = undefined;
    this.inventory = undefined;
  }

  preload() {
    // use to set link prefix to use phaser assets
    // this.load.setBaseURL('http://labs.phaser.io');

    this.cameras.main.setBackgroundColor(0x9900e3);

    this.load.image('tiles', 'assets/Tilemap/tiles_spritesheet.png');
    this.load.image('star-image', 'assets/star.png');
    this.load.image('Background', 'assets/night.png');
    this.load.tilemapTiledJSON('tileset', 'map-2.json');
    this.load.spritesheet(DUDE_KEY, 'assets/redhood-spritesheet.png', {
      frameWidth: 32,
      frameHeight: 32
    });
  }
  createPlayer() {
    const map = this.make.tilemap({ key: 'tileset' });

    let tileset = map.addTilesetImage('Main-Tileset', 'tiles');
    let background = map.addTilesetImage('night-bg', 'Background');

    const bgLayer = map.createLayer('Background', background, 0, 0);
    const worldLayer = map.createLayer('World Layer', tileset, 0, 0);
    worldLayer.setCollisionByProperty({ Collides: true });
    this.starLayer = map.getObjectLayer('Stars')['objects'];
    const stars = this.physics.add.staticGroup();

    this.starLayer.forEach((object) => {
      let obj = stars.create(object.x + 35, object.y - 20, 'star-image');
      // obj.setScale(object.width / 16, object.height / 16);
      obj.setOrigin(0.5);
      obj.body.width = object.width;
      obj.body.height = object.height;
    });

    
    this.player = this.physics.add.sprite(1500, 600, DUDE_KEY).setScale(2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 0, end: 1 }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'idle2',
      frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 8, end: 9 }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'walking',
      frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 16, end: 19 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'running',
      frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 24, end: 31 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'crouching',
      frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 32, end: 35 }),
      frameRate: 10,
      repeat: 0
    });

    this.anims.create({
      key: 'crouched',
      frames: [{ key: DUDE_KEY, frame: 35 }],
      frameRate: 10
    });

    this.anims.create({
      key: 'jumping',
      frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 40, end: 47 }),
      frameRate: 10,
      repeat: 0
    });

    this.anims.create({
      key: 'banished',
      frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 48, end: 53 }),
      frameRate: 10,
      repeat: 0
    });

    this.anims.create({
      key: 'defeated',
      frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 56, end: 63 }),
      frameRate: 10,
      repeat: 0
    });

    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 64, end: 71 }),
      frameRate: 15,
      repeat: 0
    });

    this.inventory = {
      starsCollected: 0,

      isSprinting: false,
      enemiesDefeated: 0,
      sword: false,
      lives: 3,
      health: 5,
      stage: 1,
      difficulty: 1
    };

    console.log(this.inventory);
    this.physics.add.collider(this.player, worldLayer)
    this.physics.add.overlap(this.player, stars, collectStar, null, this);
    function collectStar(player, star) {
      star.disableBody(true, true);
      this.inventory.starsCollected += 1;
      score += 10;
      scoreText.setText('Score: ' + score);
    }
    var score = 0;
    var scoreText;
    scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: '#000'
    });
    let bombs = this.physics.add.group();

    this.physics.add.collider(bombs, platforms);

    this.physics.add.collider(this.player, bombs, hitBomb, null, this);

    function hitBomb(player, bomb) {
      this.physics.pause();

      player.setTint(0xff0000);

      player.anims.play('banished');

      gameOver = true;
    }
  }
  

  create() {
    this.createPlayer();
    console.log('inventory 2', this.inventory);
    
    console.log('anims',this.anims)

    
    this.cursors = this.input.keyboard.addKeys('W,S,A,D, SPACE, P, ESC');
    console.log('logging cursors', this.cursors);
    
  }

  update() {
    // console.log('inventory 3', this.inventory);
    // if (keyP.isDown) this.isPause = !this.isPause;

    // if (this.isPause) return;
    // depreciated cursor.left.isDown, etc since wasd is mapped
    // cursors = this.input.keyboard.createCursorKeys();

    // pauses everything on screen when keyP is down
    // player.on('animationstop', keyP.isDown)

    // also pauses everything
    // if (keyP.isDown) {
    //     this.scene.pause();
    // }

    // this.scene.resume();
    //this.inventoryy.starsCollected
    if (this.cursors.A.isDown) {
      if (true) {
        this.player.setVelocityX(-300);
        this.player.anims.play('running', true);
        this.player.flipX = true;
      } else {
        this.player.setVelocityX(-160);
        this.player.anims.play('walking', true);
        this.player.flipX = true;
      }
      //this.inventoryy.starsCollected
    } else if (this.cursors.D.isDown) {
      if (true) {
        this.player.setVelocityX(300);
        this.player.anims.play('running', true);
        this.player.flipX = false;
      } else {
        this.player.setVelocityX(160);
        this.player.anims.play('walking', true);
        this.player.flipX = false;
      }
    } else if (this.cursors.S.isDown) {
      // this.player.anims.play('crouching', true);
      this.player.anims.play('crouched', true);
    } else if (this.cursors.SPACE.isDown) {
      this.player.anims.play('attack', true);
    } else {
      this.player.setVelocityX(0); 
      this.player.anims.play('idle', true);
    }

    if (this.cursors.W.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-330);
      this.player.anims.play('jumping', true);
    }
  //   if (Phaser.Input.Keyboard.JustDown(this.cursors.P) && isPaused === false) {
  //     this.physics.pause();
  //     isPaused = true;
  //     console.log('pausing', isPaused);
  //   } else if (Phaser.Input.Keyboard.JustDown(keyP) && isPaused === true) {
  //     this.physics.resume();
  //     isPaused = false;
  //     console.log('resuming', isPaused);
  //   }
  // }
}
}

// // Phaser.Input.Keyboard.JustDown

// //Pause
// createPauseScreen() {
//   //transparent veil
//   this.veil = this.add.graphics({x:0, y:0});
//   this.veil.fillStyle('0x000000', 0.3);
//   this.veil.fillRect(0,0, this.CONFIG.width, this.CONFIG.height);
//   this.veil.setDepth(this.DEPTH.ui);
//   this.veil.setScrollFactor(0);
//   //pause text
//   this.txt_pause = new Text(
//     this, this.CONFIG.centerX, this.CONFIG.centerY - 32,
//     'Pause', 'title'
//   );
//   this.txt_pause.setDepth(this.DEPTH.ui);
//   this.txt_pause.setScroll(0);

//   //hide at start
//   this.togglePauseScreen(false);
// }

// togglePauseScreen(is_visible) {
//   this.veil.setVisible(is_visible);
//   this.txt_pause.setVisible(is_visible);
// }
// clickPause() {
//   if(!this.allow_input) return;
//   if(this.is_gameover) return;
//   //Flag
//   //Toggle Pause Overlay
//   //
// }
// //Scenes

// goMenu () {
//   this.scene.start('Menu');
//
