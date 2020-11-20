var monkey , monkey_running;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}
function setup() {
  createCanvas(600,400);
  
  monkey = createSprite(50,300,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.16;
  
  ground = createSprite(200,375,700,50);
  ground.velocityX = -8;

  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
}
function draw() {
  background(rgb(60,190,0));
  
  fill("black");
  textSize(20);
  text("SCORE : "+score,440,30);
  score = score + Math.round(getFrameRate()/60);
  
  drawSprites();
  spawnBanana();
  spawnObstacles();
  
  if(ground.x<300){
   ground.x = 400; 
  }
  
  monkey.collide(ground);
  if(keyDown("space")&&monkey.y>280){
    monkey.velocityY = monkey.velocityY-8;
  }
  monkey.velocityY = monkey.velocityY+0.5;
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
  }
  if(obstacleGroup.isTouching(monkey)){
     ground.velocityX = 0;
     monkey.velocityY = 0;
    
     obstacleGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
    
     }
}
function spawnBanana(){
  if(frameCount%150 === 0){
    banana = createSprite(650,100);
    banana.y = Math.round(random(30,200));
    banana.addImage(bananaImage);
    banana.scale = 0.15; 
    banana.velocityX = -2;
    banana.lifetime = 300;
    bananaGroup.add(banana);
}
}
function spawnObstacles(){
    if(frameCount%300 === 0){
    obstacle = createSprite(650,325);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.14; 
    obstacle.velocityX = -4;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
}
}