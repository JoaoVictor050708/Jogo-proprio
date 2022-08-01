var cacador, cacadorImg;
var urso, ursoImg1
var servo, servoAnm;
var carne, carneImg;
var backgroundImg;
var parede1,parede2;
var municao, municaoImg;
var servoGroup, ursoGroup, municaoGroup;
var score=0;

function preload(){
  cacadorImg=loadImage("arma.png")
  ursoImg1=loadAnimation("bear11.png","bear12.png") 
  servoAnm=loadAnimation("veado.png","veado3.png","veado2.png")
  carneImg=loadImage("carnee.png")
  backgroundImg=loadImage("background5.jpg")
  municaoImg=loadImage("municao.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  cacador=createSprite(110,500,10,10)
  cacador.addImage(cacadorImg)
  cacador.scale=0.25
  
  parede1=createSprite(width/2,height/2,width,4)
  parede1.visible=false

  parede2=createSprite(width/2,height,width,4)
  parede2.visible=false

  servoGroup=new Group()
  ursoGroup=new Group()
  municaoGroup=new Group()
}

function draw() {
  
  background(backgroundImg);
 
  if (keyIsDown(DOWN_ARROW)) {
    cacador.y+=5
  }

  if (keyIsDown(UP_ARROW)) {
    cacador.y-=5
  }

  cacador.collide(parede1)
  cacador.collide(parede2)

  animals()
  bear()

  if (municaoGroup.isTouching(servo)) {
    score+=5
    servo.destroy()
  }

  if (keyDown("a")) {
    shoot()
  }

  

  drawSprites();
}

function animals(){
  if (frameCount%125==0) {
    servo=createSprite(width,random(height-450,height-170),50,50);
    servo.velocityX=-3
    servo.lifetime=width/servo.velocityX
    servo.addAnimation("running", servoAnm)
    servoGroup.add(servo)
  }

  

}

function bear(){
  if (frameCount%250==0) {
    urso=createSprite(width,random(height-450,height-170),50,50);
    urso.velocityX=-10
    urso.lifetime=width/urso.velocityX
    urso.scale=0.2
    urso.addAnimation("angry",ursoImg1)
    ursoGroup.add(urso);
  }
}

function shoot(){
  municao=createSprite(110,width/2,50,50)
  municao.y=cacador.y-4
  municao.addImage(municaoImg)
  municao.scale=0.1
  municao.depth=cacador.depth-1
  municao.velocityX=5
  municao.lifetime=width/municao.velocityX
  municaoGroup.add(municao)
}

function gameOver(){
  municaoGroup.destroyEach()
  servoGroup.destroyEach()
  ursoGroup.destroyEach()

  textSize(50)
  fill("yellow")
  text("You Lose!",width/2,height/2)
} 

