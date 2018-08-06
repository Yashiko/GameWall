//timer
document.getElementById("time").style.backgroundColor = "yellow";
document.getElementById("time").style.width = "1350px";
document.getElementById("time").style.textAlign = "center";
document.getElementById("time").style.fontSize = "18px";
let timeLeft = 20;
let elem = document.getElementById("time");
let timerId = setInterval(countdown, 1000);
function countdown() {
    if (timeLeft == 0) {
        clearTimeout(timerId);
        alert("Game Over");
    } else {
        elem.innerHTML = timeLeft + ' seconds left';
        timeLeft--;
    }
}

let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
function background() {
    ctx.fillStyle = "darkgreen";
    ctx.fillRect(0, 0, c.width, c.height);
}

// valdomas rectange
let x = 0; // x coord.
let y = 60; // y coord  

//Creat car
function drawImg() {
    carImage = new Image();
    carImage.src = "car.gif";
    ctx.drawImage(carImage, x, y, 20, 25);
}
//controling the car
window.onkeydown = function (event) {
    let keyPr = event.keyCode; //moving right
    if (keyPr === 39) {
        x += 5;
    } else if (keyPr === 37) { //moving left
        x -= 5;
    } else if (keyPr === 38) {
        y -= 5; //moving top
    } else if (keyPr === 40) {
        y += 5; //moving down
    }
}

//creating wall
function Square(x1, y1, w1, h1) {
    this.x1 = x1;
    this.y1 = y1;
    this.w1 = w1;
    this.h1 = h1;

    //moving
    this.anim = function () {
        if (this.y1 < ctx.canvas.height) {
            this.y1 += 5;   //wall moving speed
            ctx.fillStyle = "brown";
            ctx.fillRect(this.x1, this.y1, this.w1, this.h1);
        } else { 
            this.y1 = -80;          //the wall start coord
        }
    }
}

// the walls coords
function init() {
    let rect1 = new Square(50, 0, 10, 50);
    let rect2 = new Square(100, 20, 10, 80);
    let rect3 = new Square(150, 10, 10, 40)
    let rect4 = new Square(200, 60, 10, 70)
    let objects = [rect1, rect2, rect3, rect4];

    // pagr zaidimo veikimas
    setInterval(function () {
        background();   //set background
        drawImg();     // set redRect
        for (let rect in objects) { // sets walls
            objects[rect].anim();

        }

        //susidurimas
        if (carImage.x < 0){
            carImage.x = 0;
        }
        if(carImage.y < 0 ){
            carImage.y = 0;
        }
    }, 50);

}
init();