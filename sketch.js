var ground, lander, lander_Img, bg_Img;
var thrust, crash, land;
var rcs_left, rcs_right;
var obs;
var vx=0;
var vy=0;
var g = 0.05;
var fuel = 100; 
var timer;
var obs_Img;
var lz_Img;

function preload(){
  lander_Img = loadImage("normal.png")
  bg_Img = loadImage("bg.png")
  thrust = loadAnimation("b_thrust_1.png","b_thrust_2.png","b_thrust_3.png")
  crash = loadAnimation("crash1.png", "crash1.png", "crash1.png")
  land = loadAnimation("landing1.png", "landing2.png", "landing_3.png")
  rcs_left = loadAnimation("left_thruster_1.png", "left_thruster_2.png")
  rcs_right = loadAnimation("right_thruster_1.png", "right_thruster_2.png")
  obs_Img = loadImage("obstacle.png")
  normal = loadAnimation("normal.png")
  lz_Img = loadImage("lz.png")
  thrust.playing = true
  thrust.looping = false
  land.looping = false
  crash.looping = false
  rcs_left.looping = false
  rcs_right.looping = false
}

function setup() {
  createCanvas(1000,700);
frameRate(80)
timer = 1500
thrust.frameDelay = 5
land.frameDelay = 5
crash.frameDelay = 10
rcs_left.frameDelay = 5
lander = createSprite(100,50,30,30)
lander.addImage(lander_Img)
lander.scale = 0.1
lander.setCollider("rectangle", 0, 0, 200, 200)
lander.addAnimation('thrusting', thrust)
lander.addAnimation('crashing', crash)
lander.addAnimation('landing', land)
lander.addAnimation('left', rcs_left)
lander.addAnimation('right', rcs_right)
lander.addAnimation('normal', normal)
obs = createSprite(320,530,50,100)
obs.addImage(obs_Img)
obs.scale = 0.5
obs.setCollider("rectangle", 0, 100, 300, 300)
ground = createSprite(500, 690, 1000, 20)
lz = createSprite(880, 610, 50, 30)
lz.addImage(lz_Img)
lz.scale = 0.3
lz.setCollider("rectangle", 0, 180, 400, 100)
rectMode(CENTER)
textSize(50)
}

function draw() 
{
   background(51);
   image(bg_Img,0,0)
   push();
   fill(255)
   textSize(15)
   text("Horizontal Velocity: "+round(vx,2),800, 50) 
   text("fuel: "+fuel, 800, 25)
   text("vertical velocity: "+round(vy),800, 75)
   pop();
vy += g
lander.position.y+=vy
lander.position.x+=vx

if(lander.collide(obs)==true){
  lander.changeAnimation('crashing')
  stop();
}
var d = dist(lander.position.x,lander.position.y, lz.position.x, lz.position.y)
console.log(d)

if(d<=35&&(vy<2&&vy>-2)&&(vx<2&&vx>-2)){
console.log("landed")
vx = 0
vy = 0
g = 0
lander.changeAnimation('landing')
}

if(lander.collide(ground)==true){
console.log("collided")
lander.changeAnimation('crashing')
vx = 0
vy = 0
g = 0
}
  drawSprites();
}
function keyPressed(){
  if(keyCode == UP_ARROW && fuel > 0){
  upward_thrust()
  lander.changeAnimation('thrusting')
  thrust.nextFrame()
}
  if(keyCode == RIGHT_ARROW && fuel > 0){

  lander.changeAnimation('left')
  right_thrust()
}
  if(keyCode == LEFT_ARROW && fuel > 0){

  lander.changeAnimation('right')
  left_thrust()
}
}

function upward_thrust(){
  vy = -1
  fuel-=1
}
function right_thrust(){
  vx += 0.2
  fuel-=1
}
function left_thrust(){
  vy -=0.2
  fuel-=1
}

function stop(){
  vx = 0
  vy = 0
  fuel = 0
  g = 0
}


