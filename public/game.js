// http://phaser.io/tutorials/making-your-first-phaser-3-game/part10

var config = {
  type: Phaser.AUTO,
  // width: 800,
  // height: 600,
  width: 1600,
  height: innerHeight,

  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);

function preload() {
  // use to set link prefix to use phaser assets
  // this.load.setBaseURL('http://labs.phaser.io');

  this.load.spritesheet('dude',
    'assets/redhood-spritesheet.png',
    { frameWidth: 32, frameHeight: 32 }
  );

  this.load.image('sky', 'assets/background_layer_1.png');
  this.load.image('ground', 'http://labs.phaser.io/assets/sprites/platform.png');
  this.load.image('star', 'http://labs.phaser.io/assets/sprites/star.png');
  this.load.image('bomb', 'http://labs.phaser.io/assets/sprites/ghost.png');
  this.load.image('tile1', 'assets/tile1.jpg');

  // this.load.image('cavern', 'assets/cavern1.png');
  // this.load.spritesheet('dude',
  // 'assets/animations/knight.png',
  // { frameWidth: 32, frameHeight: 48 }
  // );
}


var platforms;
// mapping wasd
let keyA;
let keyD;
let keyW;
let keyS;
var inventory = {
  starsCollected: 0,

  isSprinting: false,
  enemiesDefeated: 0,
  sword: false,
  lives: 3,
  health: 5,
  stage: 1,
  difficulty: 1,

};
console.log(Phaser.Input.Keyboard.KeyCodes);

function create() {
  this.add.image(800, 400, 'sky').setScale(5);
  // this.add.image(1200, 300, 'sky');
  // this.add.image(1600, 300, 'sky');

  platforms = this.physics.add.staticGroup();

  // set scale enlarges the image by X value, refreshBody tells the game to apply static tag to new image
  platforms.create(800, 700, 'ground').setScale(4).refreshBody();

  // (distance from left, distance from top, image key)
  // platforms.create(600, 400, 'ground');
  platforms.create(50, 350, 'ground');
  platforms.create(750, 320, 'ground');
  platforms.create(800, 650, 'tile1');
  platforms.create(600, 650, 'tile1');
  platforms.create(400, 470, 'tile1');
  platforms.create(200, 650, 'tile1');

  // this.physics.add has dynamic physics by default
  player = this.physics.add.sprite(100, 450, 'dude');

  // bounciness of player of landing after a jump
  player.setBounce(0.2);
  // player cannot move outside the game dimensions
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 1 }),
    frameRate: 8,
    repeat: -1
  });

  this.anims.create({
    key: 'idle2',
    frames: this.anims.generateFrameNumbers('dude', { start: 8, end: 9 }),
    frameRate: 8,
    repeat: -1
  });

  this.anims.create({
    key: 'walking',
    frames: this.anims.generateFrameNumbers('dude', { start: 16, end: 19 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'running',
    frames: this.anims.generateFrameNumbers('dude', { start: 24, end: 31 }),
    frameRate: 10,
    // tells animation to loop
    repeat: -1
  });

  this.anims.create({
    key: 'crouching',
    frames: this.anims.generateFrameNumbers('dude', { start: 32, end: 35 }),
    frameRate: 10,
    repeat: 0
  });

  this.anims.create({
    key: 'crouched',
    frames: [{ key: 'dude', frame: 35 }],
    frameRate: 10
  });

  this.anims.create({
    key: 'jumping',
    frames: this.anims.generateFrameNumbers('dude', { start: 40, end: 47 }),
    frameRate: 10,
    repeat: 0
  });

  this.anims.create({
    key: 'banished',
    frames: this.anims.generateFrameNumbers('dude', { start: 48, end: 53 }),
    frameRate: 10,
    repeat: 0
  });

  this.anims.create({
    key: 'defeated',
    frames: this.anims.generateFrameNumbers('dude', { start: 56, end: 63 }),
    frameRate: 10,
    repeat: 0,
  });

  this.anims.create({
    key: 'attack',
    frames: this.anims.generateFrameNumbers('dude', { start: 64, end: 71 }),
    frameRate: 15,
    repeat: 0,
  });

  // adds physics to the player and platforms
  this.physics.add.collider(player, platforms);

  // adds stars
  stars = this.physics.add.group({
    key: 'star',
    // adds 11 more stars, making 12 stars
    repeat: 8,
    // first star at x:12,y:0, every next star is 70 pixels right\
    setXY: { x: 12, y: 0, stepX: 70 },
  });

  stars.children.iterate(function (child) {
    // sets random bounciness for each star
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

  });

  // adds collision to stars and platforms
  this.physics.add.collider(stars, platforms);

  // checks if there is overlap between stars and player to collect stars
  this.physics.add.overlap(player, stars, collectStar, null, this);

  function collectStar(player, star) {
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);
  }


  var score = 0;
  var scoreText;
  scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

  // adds enemies
  bombs = this.physics.add.group();

  this.physics.add.collider(bombs, platforms);

  this.physics.add.collider(player, bombs, hitBomb, null, this);

  function hitBomb(player, bomb) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('banished');

    gameOver = true;
  }
  //
  function collectStar(player, star) {
    inventory.starsCollected += 1;
    console.log(inventory.starsCollected);
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0) {
      stars.children.iterate(function (child) {

        child.enableBody(true, child.x, 0, true, true);

      });

      var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

      var bomb = bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

    }
  }

  // mapping wasd controls
  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
  keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
}



function update() {
  // depreciated cursor.left.isDown, etc since wasd is mapped
  // cursors = this.input.keyboard.createCursorKeys();

  // pauses everything on screen when keyP is down
  // player.on('animationstop', keyP.isDown)

  // also pauses everything
  // if (keyP.isDown) {
  //     this.scene.pause();
  // }


  this.scene.resume();

  if (keyA.isDown) {
    if (inventory.starsCollected) {
      player.setVelocityX(-300);
      player.anims.play('running', true);
      player.flipX = true;
    } else {
      player.setVelocityX(-160);
      player.anims.play('walking', true);
      player.flipX = true;
    }
  } else if (keyD.isDown) {
    if (inventory.starsCollected) {
      player.setVelocityX(300);
      player.anims.play('running', true);
      player.flipX = false;
    } else {
      player.setVelocityX(160);
      player.anims.play('walking', true);
      player.flipX = false;
    }
  } else if (keyS.isDown) {
    // player.anims.play('crouching', true);
    player.anims.play('crouched', true);

  } else if (keySpace.isDown) {
    player.anims.play('attack', true);
  } else {
    player.setVelocityX(0);
    player.anims.play('idle', true);
  }

  if (keyW.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
    player.anims.play('jumping', true);
  }
}