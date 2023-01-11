// https://www.youtube.com/watch?v=kX18GQurDQg&ab_channel=NewTrix

addEventListener("keydown", function(event){
    console.log(event.code)
    if (event.code === 'KeyW') {vyu = -5};
    if (event.code === 'KeyA') {vxl = -5};
    if (event.code === 'KeyS') {vyd = 5};
    if (event.code === 'KeyD') {vxr = 5};
})

addEventListener("keyup", function(event){
    console.log(event.code)
    if (event.code === 'KeyW') {vyu = 0};
    if (event.code === 'KeyA') {vxl = 0};
    if (event.code === 'KeyS') {vyd = 0};
    if (event.code === 'KeyD') {vxr = 0};
})

addEventListener("keydown", function(event){
    console.log(event.code)
    if (event.code === 'KeyW') {vy = -5};
    if (event.code === 'KeyA') {vx = -5};
    if (event.code === 'KeyS') {vy = 5};
    if (event.code === 'KeyD') {vx = 5};
})

addEventListener("keyup", function(event){
    console.log(event.code)
    if (event.code === 'KeyW') {vy = 0};
    if (event.code === 'KeyA') {vx = 0};
    if (event.code === 'KeyS') {vy = 0};
    if (event.code === 'KeyD') {vx = 0};
})