// http://phaser.io/tutorials/making-your-first-phaser-3-game/part10
// let game;

const DUDE_KEY = 'dude';
let totalScore = 0;

class GameScene1 extends Phaser.Scene {
  constructor() {
    super('GameScene1');
    this.player = undefined;
    this.cursors = undefined;
    this.starLayer = undefined;
    this.inventory = undefined;
    this.orcs = undefined;
    this.pigs = undefined;
    this.sword = undefined;
    this.flipFlop = true;
    this.score = 0;
    this.scoreText;
    this.healthText;
    this.livesText;
    this.defeatsText;
    this.orcGroup = [];
    this.pigGroup = [];
    this.totalStars = 0;
    // this.timeValue = 0;
    // this.timer;
    // this.timerText;
  }
  

  preload() {
    // use to set link prefix to use phaser assets
    // this.load.setBaseURL('http://labs.phaser.io');
    this.load.spritesheet('orc', 'assets/orc.png', {
      frameWidth: 20,
      frameHeight: 20
    });
    this.load.spritesheet('pig', 'assets/pig.png', {
      frameWidth: 20,
      frameHeight: 20
    });

    this.cameras.main.setBackgroundColor(0x9900e3);

    this.load.image('tiles', 'assets/Tilemap/tiles_spritesheet.png');
    this.load.image('star-image', 'assets/star.png');
    this.load.image('Background', 'assets/level-one.jpeg');
    this.load.image('sword', 'assets/sword.png');
    this.load.tilemapTiledJSON('tileset', 'Map-1.json');
    this.load.spritesheet(DUDE_KEY, 'assets/redhood-spritesheet.png', {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.audio('hitPig', 'assets/sfx/hitPig.wav');
    this.load.audio('hitPig2', 'assets/sfx/hitPig2.wav');
    this.load.audio('hitTaken', 'assets/sfx/hitTaken.wav');
    this.load.audio('star', 'assets/sfx/star.wav');
  }

  createAnimations() {
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
      frameRate: 20,
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
  }

  create() {
    this.createPlayer();
    console.log('inventory 2', this.inventory);

    console.log('anims', this.anims);

    this.cursors = this.input.keyboard.addKeys('W,S,A,D, SPACE, P, ESC');
    console.log('logging cursors', this.cursors);

    // this.timerText = this.add.text(16, 50, `Time: ${this.timeValue}`, {
    //     fontSize: '40px',
    //     fill: '#fff',
    //   });

    // this.timer = this.time.addEvent({delay:1000})

    // this.timer = this.time.addEvent({delay:1000, callback: this.timeUpdate(),})

    //   console.log(this.timer);

    // this.input.on('pointerup', function (pointer) {
    //   this.scene.start('GameScene2');
    // }, this);
    this.cameras.main.setBounds(0, 0, 3500, 1400);
    this.cameras.main.setViewport(0, 0, 3500, 1400);
    this.cameras.main.startFollow(this.player);
  }

  //   timeUpdate() {
  //     this.timeValue++;
  //     this.timerText.setText(`Time: ${this.timeValue}`);
  //     }
  quietSound(sound) {
    this.song = this.sound.add(`${sound}`, { volume: 0.05 });
    this.song.play();
  }

  createPlayer() {
    this.orcs = this.physics.add.group();
    this.pigs = this.physics.add.group();
    const map = this.make.tilemap({ key: 'tileset' });

    let tileset = map.addTilesetImage('Main-Tileset', 'tiles');
    let background = map.addTilesetImage('Tori', 'Background');

    console.log(Phaser.Input.Keyboard.KeyCodes);

    const bgLayer = map.createLayer('Background', background, 0, 0);
    const worldLayer = map.createLayer('World Layer', tileset, 0, 0);
    worldLayer.setCollisionByProperty({ Collides: true });
    this.starLayer = map.getObjectLayer('Stars')['objects'];
    this.doorLayer = map.getObjectLayer('Door')['objects'];
    const stars = this.physics.add.staticGroup();
    const doors = this.physics.add.staticGroup();

    this.starLayer.forEach((object) => {
      let obj = stars.create(object.x + 35, object.y - 20, 'star-image');
      // obj.setScale(object.width / 16, object.height / 16);
      obj.setOrigin(0.5);
      obj.body.width = object.width;
      obj.body.height = object.height;
      this.totalStars += 1;
    });
    console.log(this.doorLayer);
    function makeDoor(doorTile) {
      let obj = doors.create(doorTile.x + 15, doorTile.y - 25);
      obj.setOrigin(0.4, 1);
      obj.body.width = doorTile.width;
      obj.body.height = doorTile.height;
      obj.alpha = 0;
    }
    makeDoor(this.doorLayer[0]);

    this.player = this.physics.add.sprite(1500, 1000, DUDE_KEY).setScale(2);
    this.sword = this.physics.add.sprite(1500, 1000, 'sword').setScale(1.5);
    this.sword.body.setSize(50, 30, 0, 0);
    this.sword.rotation = 1.5;

    this.sword.body.setAllowGravity(false);
    // this.sword.disableBody(true, false);

    this.player.setCollideWorldBounds(true);

    this.createAnimations();

    this.inventory = {
      starsCollected: 0,
      isSprinting: false,
      enemiesDefeated: 0,
      // sword: false,
      lives: 3,
      health: 3,
      stage: 1,
      difficulty: 1,
      hit: false,
      gameOver: false
    };

    this.physics.add.collider(this.player, worldLayer);
    this.physics.add.overlap(this.player, stars, collectStar, null, this);
    this.physics.add.overlap(this.player, doors, nextLevel, null, this);
    function collectStar(player, star) {
      this.quietSound('star');
      // this.sound.play('star');
      star.disableBody(true, true);
      this.inventory.starsCollected += 1;
      this.score += 10;
      this.scoreText.setText(`Score: ${this.score}`);
      if (this.score % 50 === 0) {
        this.orcSpawn();
        this.pigSpawn();
      }
    }

    function nextLevel(player, door) {
      if (this.inventory.starsCollected >= this.totalStars - 80) {
        //score multiplier formula
        console.log('before change', this.score);
        this.score =
          this.score +
          this.score * this.inventory.lives +
          (this.score * this.inventory.health) / 4;
        console.log('after change', this.score);
        this.score = Math.floor(this.score / 10) * 10;
        this.pullData();
        console.log('after round', this.score);
        this.scene.start('GameScene2', {
          score: this.score,
          difficulty: this.difficulty,
          kills: this.inventory.enemiesDefeated
        });
        this.orcGroup = [];
        this.pigGroup = [];
        this.scene.destroy('GameScene1');
      }
    }

    // var score = 0;
    // var scoreText;
    this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, {
      fontSize: '40px',
      fill: '#fff'
    });
    this.healthText = this.add.text(
      3200,
      16,
      `Health: ${this.inventory.health}`,
      {
        fontSize: '40px',
        fill: '#fff'
      }
    );
    this.livesText = this.add.text(3200, 50, `Lives: ${this.inventory.lives}`, {
      fontSize: '40px',
      fill: '#fff'
    });
    this.defeatsText = this.add.text(
      3200,
      84,
      `Defeats: ${this.inventory.enemiesDefeated}`,
      {
        fontSize: '40px',
        fill: '#fff'
      }
    );

    this.physics.add.collider(this.orcs, worldLayer);
    this.physics.add.collider(this.orcs, this.pigs);

    this.physics.add.collider(
      this.player,
      this.orcs,
      this.hitByEnemy,
      null,
      this
    );
    this.physics.add.collider(
      this.player,
      this.pigs,
      this.hitByEnemy,
      null,
      this
    );

    this.physics.add.overlap(this.sword, this.orcs, this.hitEnemy, null, this);
    this.physics.add.overlap(this.sword, this.pigs, this.hitEnemy, null, this);

    this.physics.add.collider(this.pigs, this.pigs);
    this.physics.add.collider(this.orcs, this.orcs);
  }

  hitEnemy(sword, enemy) {
    enemy.disableBody(true, true);
    this.inventory.enemiesDefeated++;
    this.defeatsText.setText(`Defeats: ${this.inventory.enemiesDefeated}`);

    let rand = Math.floor(Math.random() * 2);
    if (rand === 0) {
      // this.sound.play('hitPig');
      this.quietSound('hitPig');
    } else {
      // this.sound.play('hitPig2');
      this.quietSound('hitPig2');
    }
  }

  hitByEnemy(player, enemy) {
    // this.player.setTint(0xff0000);
    // this.sound.play('hitTaken')
    if (!this.inventory.hit) {
      this.quietSound('hitTaken');
      this.inventory.hit = true;
      this.inventory.health--;
      console.log(this.inventory.health + ' health');
      this.healthText.setText(`Health: ${this.inventory.health}`);
      setTimeout(() => {
        this.inventory.hit = false;
      }, 500);
    } else {
      return;
    }

    if (this.inventory.health === 0) {
      this.inventory.lives--;
      this.player.enableBody(true, true);
      this.inventory.health = 3;
      console.log(this.inventory.lives + ' lives');
      this.livesText.setText(`Lives: ${this.inventory.lives}`);
      this.healthText.setText(`Health: ${this.inventory.health}`);
    }

    if (this.inventory.lives === 0) {
      this.inventory.gameOver = true;
      console.log('Game Over :(');
    }

    // this.inventory.hit = true;

    // this.inventory.lives--;

    // this.player.disableBody(false, false);

    // if (this.inventory.lives === 0){
    //   this.inventory.gameOver = true;
    // }

    // setTimeout(() => {
    //
    //   console.log(this.inventory.lives)
    //   this.inventory.hit = false;
    // }, 1000);
  }

  orcSpawn() {
    let x =
      this.player.x < 1750
        ? Phaser.Math.Between(1750, 3500)
        : Phaser.Math.Between(0, 1750);
    let orc = this.orcs.create(x, 10, 'orc').setScale(3);
    orc.setBounce(0);
    orc.setCollideWorldBounds(true);
    orc.setVelocity(Phaser.Math.Between(-200, 200), 20);
    this.orcGroup.push(orc);
  }

  pigSpawn() {
    let x =
      this.player.x < 1750
        ? Phaser.Math.Between(1750, 3500)
        : Phaser.Math.Between(0, 1750);
    let pig = this.pigs.create(x, 10, 'pig').setScale(3);
    pig.setBounce(0);
    pig.setCollideWorldBounds(true);
    pig.setVelocity(Phaser.Math.Between(-200, 200), 20);
    this.pigGroup.push(pig);
  }

  entityBoost(entity) {
    if (entity.length === 0) {
      return;
    }

    for (let i = 0; i < entity.length; i++) {
      if (entity[i].body.blocked.left) {
        // entity[i].setVelocityX(500);
        entity[i].setVelocityY(Phaser.Math.Between(200, 400));
      }
      if (entity[i].body.blocked.right) {
        entity[i].setVelocityY(Phaser.Math.Between(-200, -400));
      }
      if (entity[i].body.velocity.y === 0 && entity[i].body.blocked.down) {
        if (this.player.body.center.x > entity[i].body.center.x) {
          entity[i].setVelocityX(Phaser.Math.Between(200, 500));
        } else {
          entity[i].setVelocityX(Phaser.Math.Between(-200, -500));
        }
        entity[i].setVelocityY(Phaser.Math.Between(-200, -1000));
      }
    }
    // else return
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

    if (this.cursors.P.isDown) {
      this.scene.launch('PauseScene');
      this.scene.pause('GameScene1');
    }

    if (this.player.flipX === false) {
      this.sword.setX(this.player.body.center.x + 30);
      this.sword.setY(this.player.body.center.y + 5);
      this.sword.rotation = 1.5;
    } else {
      this.sword.setX(this.player.body.center.x - 30);
      this.sword.setY(this.player.body.center.y + 5);
      this.sword.rotation = -1.5;
      this.sword.body.setSize(50, 30, -20, 0);
    }
    // this.scene.resume();
    //this.inventoryy.starsCollected
    if (this.cursors.A.isDown) {
      this.player.setVelocityX(-300);
      this.player.anims.play('running', true);
      this.player.flipX = true;
    }
    //this.inventoryy.starsCollected

    if (this.cursors.D.isDown) {
      this.player.setVelocityX(1000);
      this.player.anims.play('running', true);
      this.player.flipX = false;
    }

    if (this.cursors.S.isDown) {
      // this.player.anims.play('crouching', true);
      this.player.anims.play('crouched', true);
    }
    if (this.cursors.W.isDown) {
      this.sword.setX(this.player.body.center.x);
      this.sword.setY(this.player.body.center.y - 50);
      this.sword.rotation = 0;

      // this.sword.enableBody(true, true);
      // console.log(this.player.body.center)
    }

    if (
      this.cursors.W.isUp &&
      this.cursors.A.isUp &&
      this.cursors.S.isUp &&
      this.cursors.D.isUp &&
      this.cursors.SPACE.isUp
    ) {
      this.player.setVelocityX(0);
      this.player.anims.play('idle', true);
    }

    if (this.player.body.blocked.down) {
      this.inventory.jumps = 2;
    }

    if (this.cursors.SPACE.isDown && this.inventory.jumps > 0) {
      if (this.flipFlop) {
        this.flipFlop = false;
        this.player.setVelocityY(-1000);
        this.player.anims.play('jumping', true);
        this.inventory.jumps--;
        console.log('flip true, setting to false');
      }
    }
    if (this.cursors.SPACE.isUp && !this.flipFlop) {
      this.flipFlop = true;
      console.log('flop false, setting to true');
    }

    if (this.cursors.S.isDown && !this.player.body.blocked.down) {
      this.player.setVelocityY(330);
    }

    // this.timeUpdate();

    // if (this.inventory.hit === true){
    //   console.log(this.inventory.hit);
    //   this.player.anims.play('banished', true)
    // }

    this.entityBoost(this.orcGroup);
    this.entityBoost(this.pigGroup);
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

console.log(GameScene1);
// console.log(GameScene1.data.get());
