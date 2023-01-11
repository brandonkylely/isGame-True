// https://www.youtube.com/watch?v=_MyPLZSGS3s&ab_channel=ChrisCourses

const canvas2 = document.querySelector('#canvas2')
const ctx = canvas2.getContext('2d');

const canvasWidth = canvas2.width = innerWidth; 
const canvasheight = canvas2.height = innerHeight;

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2,
};

addEventListener('mousemove', (event) => {
    mouse.x = event.clientX,
    mouse.y = event.clientY
});

function animate() {
    ctx.fillStyle = '#1A1A23';
    ctx.fillRect(0, 0, canvas2.width, canvas2.height);

    ctx.fillStyle = '#E86262';
    ctx.fillRect(mouse.x, mouse.y, 100, 100);

    const blueRectLeftSide = canvas2.width / 2 - 50;
    const blueRectTopSide = canvas2.height / 2 - 50;
    ctx.fillStyle = '#92ABEA';
    ctx.fillRect(blueRectLeftSide, blueRectTopSide, 100, 100)

    if (mouse.x + 100 >= canvas2.width / 2 - 50 &&
        mouse.x <= (blueRectLeftSide) + 100 &&
        mouse.y +100 >= canvas2.height / 2 - 50 &&
        mouse.y <= (blueRectTopSide) + 100) {
            ctx.fillStyle = '#E86262';
            ctx.fillRect(blueRectLeftSide, blueRectTopSide, 100, 100);
            console.log('colliding');
    }
    requestAnimationFrame(animate)
};

animate();