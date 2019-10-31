var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight- 4;
var context = canvas.getContext("2d");
var interval;

var walk = {
    interval: 100,
    pos: [
        {x: 4, y: 84, w: 41, h: 37},
        {x: 67, y: 86, w: 40, h: 35},
        {x: 130, y: 88, w: 36, h: 32},
        {x: 188, y: 86, w: 39, h: 34},
        {x: 247, y: 86, w: 42, h: 34},
        {x: 308, y: 84, w: 44, h: 38},
        {x: 367, y: 85, w: 43, h: 35},
        {x: 432, y: 88, w: 36, h: 32},
        {x: 485, y: 86, w: 33, h: 34},
        {x: 535, y: 85, w: 36, h: 35}
    ]
};

var run = {
    interval: 50,
    pos: [
        {x: 11, y: 443, w: 42, h: 41},
        {x: 74, y: 446, w: 45, h: 38},
        {x: 142, y: 444, w: 42, h: 41},
        {x: 206, y: 443, w: 35, h: 41},
        {x: 269, y: 445, w: 42, h: 39},
        {x: 337, y: 446, w: 45, h: 38},
        {x: 407, y: 445, w: 42, h: 39},
        {x: 478, y: 444, w: 34, h: 41}
    ]
};

var stay = {
    interval: 1000,
    pos: [
        {x: 0, y: 0, w: 40, h: 34},
        {x: 47, y: 0, w: 41, h: 34}
    ]
};

var kirbySpriteSheet = new Image();
kirbySpriteSheet.src = "kirbysprites.png";

var i = 0;
var action = "stay";

doAction = (spritePos) => {
    if (i >= spritePos.length)
        i = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    var width = spritePos[i].w * 3;
    var height = spritePos[i].w * 3;
    context.fillStyle = "black";
    context.fillRect(0, canvas.height / 2 - 1, canvas.width, 5);
    context.drawImage(kirbySpriteSheet, spritePos[i].x, spritePos[i].y, spritePos[i].w, spritePos[i].h, canvas.width / 2 - width / 2, canvas.height / 2 - height, width, height)
    i++;
}

update = () => {
    if (action == "walk") {
        doAction(walk.pos);
    } else if (action == "run") {
        doAction(run.pos);
    } else if (action == "stay") {
        doAction(stay.pos);
    }
}

kirbySpriteSheet.onload = () => {
    interval = setInterval(update, stay.interval);
}

window.addEventListener("keydown", (e) => {
    if (e.key == 'w') {
        action = "walk";
        clearInterval(interval);
        update();
        interval = setInterval(update, walk.interval);
    } else if (e.key == 's') {
        action = "stay";
        update();
        clearInterval(interval);
        interval = setInterval(update, stay.interval);
    } else if (e.key == 'r') {
        action = "run";
        update();
        clearInterval(interval);
        interval = setInterval(update, run.interval);
    }
});