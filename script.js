// //timer
document.getElementById("time").style.backgroundColor = "yellow";
document.getElementById("time").style.width = "1350px";
document.getElementById("time").style.textAlign = "center";
document.getElementById("time").style.fontSize = "18px";
let timeLeft = 20;
let elem = document.getElementById("time");
let timerId = setInterval(countdown, 1000);

function countdown() {
    if (timeLeft == 0) {
        clearTimeout(timerId);  //sustabdomas timer'is
        setInterval(function () {
            let result = `
            <div>
            <div style="font-size: 50px; text-align: center">TIMES UP</div>
                <div style="font-size: 30px; text-align: center">YOU LOSE!!!</div>
                <br>
                <div style="font-size: 30px; text-align: center">Are you want to play again?</div>
                <br>
                <button onclick="start();">Yes</button>
            </div>
            `;

            document.querySelector("#game").innerHTML = result;
        }, 500);
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

// // valdomas rectange
// let x = 0; // x coord.
// let y = 60; // y coord  
// let img;
// //Creat car
function Boom(x2, y2, w2, h2) {
    this.x2 = x2;
    this.y2= y2;
    this.w2 = w2;
    this.h2 = h2;

    this.Imge = function () {
        ctx.fillStyle = "brown";1
        ctx.fillRect(this.x2, this.y2, this.w2, this.h2);
    }
}
let carDraw = new Boom(0, 60, 20, 25);

// function object_player ( x, y, w, h){
//     this.x = x;
//     this.y = y;
//     this.w = w;
//     this.h= h;

//     this.draw = function () {

//         ctx.fillRect(this.x, this.y, this.w, this.h);
//         ctx.fillStyle = "blue";
        

//     }
// }
// let object_1 = new draw(0, 60, 20, 25);

//controling the car,
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
    //moving car can't go outside the canvas. 
    if (x < 0) {
        x = 0;
    }
    if (y < -14) {
        y = -14;
    }
    if (x + 16 > c.width) { // + - 21 tai masinos ilgis, jei ju nebutu, tai masina pasisleptu uz canvas masinos ilgiu
        if (x = c.width - 16) { //Palietus siena, laimima
            clearTimeout(timerId);  //laimejus, sustabdo timeri
            setInterval(function () {
                let result = `
                <div>
                    <div style="font-size: 50px; text-align: center">YOU WON!!!!</div>
                    <br>
                    <div style="font-size: 30px; text-align: center">Are you want to play again?</div>
                    <br>
                    <button onclick="start();">Yes</button>
                </div> 
                `;
                document.querySelector("#game").innerHTML = result;
            }, 500);
        }   // c - canvas
    }
    if (y + 25 > c.height) { // same here with y coords
        y = c.height - 25;
    }

}
function start() {   //start again, reload page
    location.reload();
}

//creating wall
function creatingWalls(x1, y1, w1, h1) {
    this.x1 = x1;
    this.y1 = y1;
    this.w1 = w1;
    this.h1 = h1;
    //moving
    this.anim = function () {
        if (this.y1 < ctx.canvas.height) {
            this.y1 += 5;   //wall moving speed
            ctx.fillStyle = "brown";1
            ctx.fillRect(this.x1, this.y1, this.w1, this.h1);
        } else {
            this.y1 = -80;          //the wall start coord
        }  
    }

}


// colission
function collides(a, b){
    return  a.x < b.x1 + b.width &&
            a.x + a.width > b.x1 &&
            a.y < b.y1 + b.height &&
            a.y + a.height > b.y1;    
}
// the walls coords

let rect1 = new creatingWalls(50, 0, 10, 50);
let rect2 = new creatingWalls(100, 20, 10, 80);
let rect3 = new creatingWalls(150, 10, 10, 40)
let rect4 = new creatingWalls(200, 60, 10, 70)
let objects = [rect1, rect2, rect3, rect4];
// pagr zaidimo veikimas
setInterval(function () {
    background();   //set background

        for (let rect in objects) { // sets walls
        objects[rect].anim();
    }
    // if (collides(carImage, rect1)){
    //     alert("you lose");
    // }
    }, 50);

