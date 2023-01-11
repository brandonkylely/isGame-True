// https://www.youtube.com/watch?v=kX18GQurDQg&ab_channel=NewTrix

const canvas3 = document.querySelector('#canvas3')
const ctx = canvas3.getContext('2d');

const canvasWidth = canvas3.width = innerWidth; 
const canvasheight = canvas3.height = innerHeight;


let x = 0;
let y = 0;
let vxl = 0;
let vxr = 0;
let vyu = 0;
let vyd = 0;

function animate(){
    ctx.clearRect(0, 0, canvas3.width, canvas3.height);
    x += vxl;
    x += vxr;
    y += vyu;
    y += vyd;
    ctx.fillRect(x, y, 50, 50);
    requestAnimationFrame(animate);
};

animate();
