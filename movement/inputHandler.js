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

