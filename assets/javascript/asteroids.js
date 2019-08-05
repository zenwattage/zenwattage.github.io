let canvas;
let ctx;
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
let ship;
//in order to be able to press multiple keys at the same time and regester the key presses to the game the keys need to be put into an array
let keys = [];
//many bullets on page and many asteroids on page at same time = array
let bullets = [];
let asteroids = [];
let score = 0;
let lives = 3;

document.addEventListener('DOMContentLoaded', SetupCanvas);

function SetupCanvas(){
    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillStyle = 'black';
    //draw black rect on screen 
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ship = new Ship();

    //put asteroids on screen
    for(let i = 0; i < 8; i ++){
        asteroids.push(new Asteroid());
    }

    //to handle multiple keypresses at the same time
    document.body.addEventListener("keydown", function(e){
        keys[e.keyCode] = true;
    });
    document.body.addEventListener("keyup", function(e){
        keys[e.keyCode] = false;
        if(e.keyCode === 32) {
            console.log(e.keyCode);
            bullets.push(new Bullet(ship.angle));
            console.log(bullets);
        }
    });
    Render();
    
}

class Ship {
    constructor(){
        this.visible = true;
        //start ship in center of screen
        this.x = canvasWidth / 2; 
        this.y = canvasHeight / 2;
        //start ship stationary
        this.movingForward = false;
        //set
        this.speed = 0.1;
        // velocity that ship moves across the screen
        this.velX = 0;
        this.velY = 0;
        this.rotateSpeed = 0.001;
        this.radius = 15;
        //starting angle of ship
        this.angle = 0;
        this.strokeColor = 'white';
        //bullet comes from nose of ship
        this.noseX = canvasWidth / 2 + 15;
        this.noseY = canvasHeight / 2;
    }

    
    //rotate the ship
    Rotate(dir){
        this.angle += this.rotateSpeed * dir;
        //console.log(this.angle);
    }
    //handle rotating and moving ship arround
    Update() {
        //convert from degrees to radians 
        let radians = this.angle / Math.PI * 180;
        //calc changing values of x and y
        //new point
        //oldX + cos(radians) * distance
        //oldY + sin(radians) * distance
        if(this.movingForward){
            this.velX += Math.cos(radians) * this.speed;
            this.velY += Math.sin(radians) * this.speed;
        }
        if(this.x < this.radius){
            this.x = canvas.width;
        }
        if(this.x > canvas.width) {
            this.x = this.radius;
        }
        if(this.y < this.radius) {
            this.y = canvas.height;
        }
        if(this.y > canvas.height){
            this.y = this.radius;
        }
        this.velX *= 0.99;
        this.velY *= 0.99;

        //account for air friction
        this.x -= this.velX;
        this.y -= this.velY;
    }
    //draw ship on screen
    Draw() {
        ctx.strokeStyle = this.strokeColor;
        ctx.beginPath();
        //calc angle between the vertices of the ship
        let vertAngle = ((Math.PI * 2) / 3);

        let radians = this.angle / Math.PI * 180;
        //find nose to fire bullets from
        this.noseX = this.x - this.radius * Math.cos(radians);
        this.noseY = this.y - this.radius * Math.sin(radians);

        for(let i = 0; i < 3; i++){
            ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians), this.y - this.radius * Math.sin(vertAngle * i + radians));
        }
        ctx.closePath();
        ctx.stroke();
    }
}


//TODO: collision explosion - start bullets in center and go outwards


class Bullet{
    constructor(angle){
        this.visible = true;
        this.x = ship.noseX;
        this.y = ship.noseY;
        this.angle = angle;
        this.height = 4;
        this.width = 4;
        this.speed = 5;
        this.velX = 0;
        this.velY = 0;
    }
    Update(){
        let radians = this.angle / Math.PI * 180;
        this.x -= Math.cos(radians) * this.speed;
        this.y -= Math.sin(radians) * this.speed;
    }
    Draw(){
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}

class Asteroid{
    constructor(x, y,radius,level,collsionRadius){
        this.visible = true;
        this.x = x || Math.floor(Math.random() * canvasWidth);
        this.y = y || Math.floor(Math.random() * canvasHeight);
        this.speed = 5;
        this.radius = radius || 50;
        this.angle = Math.floor(Math.random() * 359);
        this.strokeStyle = "#FF00000";
        this.strokeColor = 'white';
        this.collsionRadius = collsionRadius || 46;
        this.level = level || 1; 
    }
    Update() {
        var radians = this.angle / Math.PI * 180;
        this.x += Math.cos(radians) * this.speed;
        this.y += Math.sin(radians) * this.speed;
        if(this.x < this.radius){
            this.x = canvas.width;
        }
        if(this.x > canvas.width) {
            this.x = this.radius;
        }
        if(this.y < this.radius) {
            this.y = canvas.height;
        }
        if(this.y > canvas.height){
            this.y = this.radius;
        }
    }
    Draw(){
        ctx.beginPath();
        //hexagon for asteroid
        let vertAngle = ((Math.PI * 2) / 6);
        var radians = this.angle / Math.PI * 180;
        for(let i = 0; i < 6; i++){
            ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians), this.y - this.radius * Math.sin(vertAngle * i + radians));
        }
        ctx.closePath();
        ctx.stroke();

    }
}


function CircleCollision(p1x, p1y, r1, p2x, p2y, r2){
    //if 2 circles collide
    let radiusSum;
    let xDiff;
    let yDiff;
    //algo for checking intersection between circles
    radiusSum = r1 + r2;
    xDiff = p1x - p2x;
    yDiff = p1y - p2y;
    if(radiusSum > Math.sqrt((xDiff * xDiff) + (yDiff * yDiff))){
        //we have a collision
        return true;
    } else {
        //no collision
        return false;
    }
}

// icons to represent remaining life
function DrawLifeShips(){
    let startX = 1350;
    let startY = 10;
    let points = [[9,9], [-9,9]];
    ctx.strokeStyle = '#0ff';
    //cycle through remaining ships
    for(let i = 0; i < lives; i++){
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        for(let j = 0; j < points.length; j++){
            ctx.lineTo(startX + points[j][0], startY + points[j][1]);
        }
        ctx.closePath();
        ctx.stroke();
        startX -= 30;
    }
}


//update position of all shapes on screen and model them
function Render(){
    ship.movingForward = (keys[87]);

    // d key to rotate right
    if(keys[68]){
        ship.Rotate(1);
    }
    // a key to rotate left
    if(keys[65]){
        ship.Rotate(-1);
    }
    ctx.clearRect(0,0,canvasWidth,canvasHeight);

    //display to user
    ctx.fillStyle = 'white';
    ctx.font = '31px Verdana';
    // convert to string and give x and y coord
    ctx.fillText('SCORE: ' + score.toString(), 20, 35);
    
    if(lives <= 0) {
        ship.visible = false;
        ctx.fillStyle = 'white';
        ctx.font = '50px Verdana';
        // center text on canvas
        
        ctx.fillText('PRESS F5 FOR RESTART', canvasWidth / 2 - 290, canvasHeight / 2 - 50);
        ctx.fillText('GAME OVER', canvasWidth / 2 - 150, canvasHeight / 2);
    } else if( lives >= 0 && score === 1120) {
        ctx.font = '60px Verdana';
        
        ctx.fillText('PRESS F5 FOR RESTART', canvasWidth / 2 - 290, canvasHeight / 2 - 50);
        ctx.fillText('YOU WIN!', canvasWidth / 2 - 150, canvasHeight / 2);
    }
    //draw ships on screen
    DrawLifeShips();

    //check for collisions between ships and asteroids
    if(asteroids.length !== 0){
        for(let k = 0; k < asteroids.length; k++){
            if(CircleCollision(ship.x, ship.y, 11, asteroids[k].x, asteroids[k].y, asteroids[k].collsionRadius)){
                ship.x = canvasWidth / 2; 
                ship.y = canvasHeight / 2;
                ship.velX = 0;
                ship.velY = 0;
                lives -= 1; 
            }
        }
    }

    //check for collisions between bullets and asteroids
    if(asteroids.length !== 0 && bullets.length != 0) {
// changing the value of an array while looping through an array
loop1:
        for(let l = 0; l < asteroids.length; l++){
            for(let m = 0; m < bullets.length; m++){
                if(CircleCollision(bullets[m].x, bullets[m].y, 3, asteroids[l].x, asteroids[l].y, asteroids[l].collsionRadius)){
                    //check for size of asteroid - if 1 it can be broken down
                    if(asteroids[l].level === 1){
                        //push 2 new smaller asteroids 
                        asteroids.push(new Asteroid(asteroids[l].x - 5, asteroids[l].y-5, 25, 2, 22));
                        asteroids.push(new Asteroid(asteroids[l].x + 5, asteroids[l].y+5, 25, 2, 22));
                    } else  if(asteroids[l].level === 2){
                        asteroids.push(new Asteroid(asteroids[l].x - 5, asteroids[l].y - 5, 15, 3, 12));
                        asteroids.push(new Asteroid(asteroids[l].x + 5, asteroids[l].y + 5, 15, 3, 12));
                }
                //remove asteroid that was hit
                asteroids.splice(l,1);
                //remove bullet that hit asteroid
                bullets.splice(m,1);
                score += 20;
                //break out of loop
                break loop1;
            }
        }

    }
}

    if(ship.visible){
        ship.Update();
        ship.Draw();
    }
    

    if(bullets.length !== 0){
        for(let i = 0; i < bullets.length; i++){
            bullets[i].Update();
            bullets[i].Draw();
        }
    }
    if(asteroids.length !== 0){
        for(let j = 0; j < asteroids.length; j++){
            asteroids[j].Update();
            //pass j to draw to track which asteroid points we want to store
            asteroids[j].Draw(j);
        }
    }

    requestAnimationFrame(Render);

}