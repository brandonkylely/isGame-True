let playerState = "idle";
const menu = document.querySelector('#animations');
menu.addEventListener('change', function(event){
    playerState = event.target.value;
})

const canvas1 = document.getElementById('canvas1');
const ctx = canvas1.getContext('2d');
const canvasWidth = canvas1.width = innerWidth;
const canvasHeight = canvas1.height = innerHeight;

const playerSprite = new Image()
playerSprite.src = 'sheets/redhood-spritesheet.png';
const spriteWidth = 32;
const spriteHeight = 32;

let x = 0;
let y = 0;
let vxl = 0;
let vxr = 0;
let vyu = 0;
let vyd = 0;
let frameX = 0;
let frameY = 0;
let gameFrame = 0;
const framePersistence = 7;
const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 2,
    },
    {
        name: 'idle2',
        frames: 2,
    },
    {
        name: 'walking',
        frames: 4,
    },
    {
        name: 'running',
        frames: 8,
    },
    {
        name: 'crouching',
        frames: 6,
    },
    {
        name: 'jumping',
        frames: 8,
    },
    {
        name: 'banished',
        frames: 6,
    },
    {
        name: 'defeated',
        frames: 8,
    },
    {
        name: 'attack',
        frames: 8,
    }
]

animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let i = 0; i <state.frames; i++){
        let positionX = i * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations[state.name] = frames;
});


function animate() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    x += vxl;
    x += vxr;
    y += vyu;
    y += vyd;
    let position = Math.floor(gameFrame/framePersistence) % spriteAnimations[playerState].loc.length;
    frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;
    // if (x < 0) {    
    //     flipHorizontally(playerSprite, spriteWidth, spriteHeight, x, y);
    // } else {
    //     ctx.drawImage(playerSprite, frameX, frameY, spriteWidth, spriteHeight, x, y, spriteWidth, spriteHeight);
    // }

    ctx.drawImage(playerSprite, frameX, frameY, spriteWidth, spriteHeight, x, y, spriteWidth, spriteHeight);

    gameFrame++;
    requestAnimationFrame(animate);
};

// function flipHorizontally(playerSprite, spriteWidth, spriteHeight, x, y){
//     let position = Math.floor(gameFrame/framePersistence) % spriteAnimations[playerState].loc.length;
//     frameX = spriteWidth * position;
//     let frameY = spriteAnimations[playerState].loc[position].y;

//     ctx.translate(x+spriteWidth, y);

//     ctx.scale(-1,1);
    
//     ctx.drawImage(playerSprite, frameX, frameY, spriteWidth, spriteHeight, x, y, spriteWidth, spriteHeight);
    
//     ctx.setTransform(1,0,0,1,0,0);
// }

addEventListener("keydown", function(event){
    console.log(event.code)
    if (event.code === 'ShiftLeft') {playerState = "running"};
});

addEventListener("keyup", function(event){
    console.log(event.code)
    if (event.code === 'ShiftLeft') {playerState = "idle"};
})

animate();