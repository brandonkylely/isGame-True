class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
        this.background;
        this.platform;
        this.title;
        this.returnButton;
        this.gameOverText;
    };
    preload() {
    };
    create() {
        this.background = this.add.rectangle(1750, 850, 3500, 1700, 0x0000);
        this.platform = this.physics.add.staticGroup()

        this.title = this.add.text(1750, 800, `isGame:True`, {
            fontSize: '250px',
            fill: '#fff',
          });
        this.title.setOrigin(0.5,0);

        this.platform.add(this.title);

        this.returnButton = this.add.text(1750, 300, `Return to menu?`, {
            fontSize: '100px',
            fill: '#fff',
        });

        this.returnButton.setOrigin(0.5, 0);

        this.physics.add.existing(this.returnButton);
        this.returnButton.body.bounce.y = 0.8;

        this.gameOverText = this.add.text(1750, 150, `You lost :(`, {
            fontSize: '100px',
            fill: '#fff',
        });

        this.gameOverText.setOrigin(0.5, 0);

        this.physics.add.existing(this.gameOverText);
        this.gameOverText.body.bounce.y = 0.8;



        this.physics.add.collider(this.returnButton, this.gameOverText);
        this.physics.add.collider(this.returnButton, this.title);
        this.physics.add.collider(this.gameOverText, this.title);



        this.returnButton.setInteractive();
        // this.returnButton.on('pointeron', () => {
        //     this.returnButton.text.fill(0x808080)
        // });

        this.returnButton.on('pointerdown', () => {
            this.scene.start('StartScene');
            this.scene.stop('GameOver');
        });


    };
    update() {

    };
}