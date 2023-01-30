class InstructionsScene extends Phaser.Scene {
    constructor() {
        super('InstructionsScene');
        this.background;
        this.platform;
        this.title;
        this.returnButton;
        this.instructionsText;
    };
    preload() {
    };
    create() {
        this.background = this.add.rectangle(1750, 850, 3500, 1700, 0x0000);
        this.platform = this.physics.add.staticGroup()

        this.title = this.add.text(1750, 800, `isGame:True Instructions`, {
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

        this.instructionsText = this.add.text(1750, 150, `
            Move Left = "A"
            Move Right = "D"
            Crouch = "S"
            Aim Sword Up = "W"
            Jump = "Space"
            `, {
            fontSize: '100px',
            fill: '#fff',
        });

        this.instructionsText.setOrigin(0.5, 0);

        this.physics.add.existing(this.instructionsText);
        this.instructionsText.body.bounce.y = 0.8;



        this.physics.add.collider(this.returnButton, this.instructionsText);
        this.physics.add.collider(this.returnButton, this.title);
        this.physics.add.collider(this.instructionsText, this.title);



        this.returnButton.setInteractive();

        this.returnButton.on('pointerdown', () => {
            window.location.reload()
        });


    };
    update() {
    
    };
}
