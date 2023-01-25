// http://phaser.io/tutorials/making-your-first-phaser-3-game/part10
window.addEventListener('load', () => {
  let config = {
    type: Phaser.AUTO,
    width: 3500,
    height: 1400,
    backgroundColor: 0x9900e3,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false  ,
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
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };

  let game = new Phaser.Game(config);
});
let starLayer;
let stars;
let starScore;
function preload() {
  // use to set link prefix to use phaser assets
  // this.load.setBaseURL('http://labs.phaser.io');

  this.cameras.main.setBackgroundColor(0x9900e3);

  this.load.spritesheet('orc', 'assets/orc.png', {
    frameWidth: 20,
    frameHeight: 20
  })
  this.load.spritesheet('pig', 'assets/pig.png', {
    frameWidth: 20,
    frameHeight: 20
  })
  this.load.image('sword', 'assets/sword.png')
  this.load.image('tiles', 'assets/Tilemap/tiles_spritesheet.png');
  this.load.image('star-image', 'assets/star.png');
  this.load.image('Background', 'assets/night.png');
  this.load.tilemapTiledJSON('tileset', 'map-2.json');
  this.load.spritesheet('dude', 'assets/redhood-spritesheet.png', {
    frameWidth: 32,
    frameHeight: 32
  });

  this.player;
}

let orcGroup = [];
let pigGroup = [];
var inventory = {
  starsCollected: 0,
  isSprinting: false,
  enemiesDefeated: 0,
  sword: false,
  lives: 3,
  health: 5,
  // stage: 1,
  // difficulty: 1
};
console.log(Phaser.Input.Keyboard.KeyCodes);

function create() {
  this.cursors = this.input.keyboard.createCursorKeys();

  var map = this.make.tilemap({ key: 'tileset' });

  var tileset = map.addTilesetImage('Main-Tileset', 'tiles');
  var background = map.addTilesetImage('night-bg', 'Background');
  //   const backgroundLayer = map.createLayer('Background', tileset, 0, 0);
  const bgLayer = map.createLayer('Background', background, 0, 0);
  const worldLayer = map.createLayer('World Layer', tileset, 0, 0);
  
  
  // const itemLayer = map.createStaticLayer('Stars', itemset, 0, 0);

  //star physics
  starLayer = map.getObjectLayer('Stars')['objects'];
  stars = this.physics.add.staticGroup();

  starLayer.forEach((object) => {
    let obj = stars.create(object.x+35, object.y-20, 'star-image');
    // obj.setScale(object.width / 16, object.height / 16);
    obj.setOrigin(0.5);
    obj.body.width = object.width;
    obj.body.height = object.height;
  });

  // playerContainer = this.add.container(1500, 1000);
  player = this.physics.add.sprite(1500, 1000, 'dude').setScale(2);
  sword = this.physics.add.staticSprite(1500, 1000, 'sword').setScale(1.5);
  sword.rotation = 1.5;
  console.log(sword.body)
  // sword.body.setDisplaySize(50, 100, player.width, player.height / 2);
  // playerContainer.add(player);
  // playerContainer.add(sword);


  this.physics.add.overlap(player, stars, collectStar, null, this);

  worldLayer.setCollisionByProperty({ Collides: true });
  console.log(worldLayer)
  
  //player


  orcs = this.physics.add.group();
  pigs = this.physics.add.group();
  console.log(bgLayer)



  // bounciness of player of landing after a jump
  player.setBounce(0.15);
  // player cannot move outside the game dimensions
  player.setCollideWorldBounds(true);
  this.physics.add.collider(player, worldLayer);

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
    repeat: 0
  });

  this.anims.create({
    key: 'attack',
    frames: this.anims.generateFrameNumbers('dude', { start: 64, end: 71 }),
    frameRate: 15,
    repeat: 0
  });

  // adds physics to the player and platforms
  this.physics.add.collider(player, worldLayer);

  // adds stars
  // stars = this.physics.add.group({
  //   key: 'star',
  //   // adds 11 more stars, making 12 stars
  //   repeat: 8,
  //   // first star at x:12,y:0, every next star is 70 pixels right\
  //   setXY: { x: 12, y: 0, stepX: 70 }
  // });

  // stars.children.iterate(function (child) {
  //   // sets random bounciness for each star
  //   child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  // });

  // adds collision to stars and platforms
  // this.physics.add.collider(stars, worldLayer);

  // checks if there is overlap between stars and player to collect stars
  this.physics.add.overlap(player, stars, collectStar, null, this);

  function collectStar(player, star) {
    star.disableBody(true, true);
    inventory.starsCollected += 1;
    score += 10;
    scoreText.setText('Score: ' + score);

    if (score % 50 === 0) {
      orcSpawn();
      pigSpawn()
    }
    
  }

  var score = 0;
  var scoreText;
  scoreText = this.add.text(16, 16, 'Score: 0', {
    fontSize: '32px',
    fill: '#000'
  });

  // adds enemies
//   bombs = this.physics.add.group();

  this.physics.add.collider(orcs, worldLayer);
  this.physics.add.collider(orcs, pigs);
//   this.physics.add.collider(pigs, worldLayer);

  this.physics.add.collider(player, orcs, hitByEnemy, null, this);
  this.physics.add.collider(player, pigs, hitByEnemy, null, this);
  this.physics.add.overlap(sword, orcs);
  this.physics.add.overlap(sword, pigs);

  function hitEnemy(sword, enemy) {
    enemy.destroy()
  }

  function hitByEnemy(player, enemy) {
    // this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('banished');

    gameOver = true;
  }


function orcSpawn() {
  let x = player.x < 1750 ? Phaser.Math.Between(1750, 3500) : Phaser.Math.Between(0, 1750);
  let orc = orcs.create(x, 10, 'orc').setScale(3)
  orc.setBounce(0);
  orc.setCollideWorldBounds(true);
  orc.setVelocity(Phaser.Math.Between(-200, 200), 20);
}
function pigSpawn() {
  let x = player.x < 1750 ? Phaser.Math.Between(1750, 3500) : Phaser.Math.Between(0, 1750);
  let pig = pigs.create(x, 10, 'pig').setScale(3)
  pig.setBounce(0.4);
  pig.setCollideWorldBounds(true);
  pig.setVelocity(Phaser.Math.Between(-200, 200), 20);
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

  // this.scene.resume();

  // TODO: try switch statement instead of if statement

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
    player.setVelocityY(250);
    player.anims.play('crouched', true);
  } else if (keySpace.isDown) {
    player.anims.play('attack', true);
  } else {
    player.setVelocityX(0);
    player.anims.play('idle', true);
  }

  if (keyW.isDown && player.body.blocked.down) {
    player.setVelocityY(-330);
    player.anims.play('jumping', true);
  }
  if (player.flipX === false) {
    sword.setX(player.body.center.x + 40)
    sword.setY(player.body.center.y)
    sword.rotation = 1.5;
  } else {
    sword.setX(player.body.center.x - 40)
    sword.setY(player.body.center.y)
    sword.rotation = -1.5;
  }

  // if ((!player.body.velocity.x === 0) && (!player.body.velocity.y === 0)) {
  //   sword.setX(player.body.center.x)
  //   sword.setY(player.body.center.y)
  //   // sword.body.center.y = player.body.center.y
  // }
  if (Phaser.Input.Keyboard.JustDown(keyR)) {
    console.log(player.body.position)
    console.log(player.body.center)
  }
}

function entityBoost(entity) {
  if (entity.length === 0) {
    return
  }
  // console.log(entity)

  for (let i = 0; i < entity.length; i++){

    if ((entity[i].body.velocity.y === 0) && entity[i].body.blocked.down) {
      entity[i].setVelocityY(Phaser.Math.Between(-200, -800));
      entity[i].setVelocityX(Phaser.Math.Between(-300, 300));
    }
  }
  // else return
}