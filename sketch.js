
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
  monkey = createSprite(40,350);
  monkey.addAnimation("running",monkey_running);
  monkey.scale= 0.1;
  monkey.velocityX = 0.2;  
  
  ground = createSprite(0,380,6000,50);
  ground.shapeColor=("lightgreen");
  ground.velocityX=-1;
  ground.x = ground.width /2;   
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  score = 0;
  
}


function draw() {
background("lightblue");

  strokeWeight(4);
  stroke("white");
  fill("orange");
  textSize(20);
  score = score + Math.round(frameCount/80);
  text("Survival Time: "+score, 420,50  )  ;
    
  
  monkey.collide(ground); 
  
  
      if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    //jump when the space key is pressed
    if (keyDown("space") && monkey.y >= 200) {
      monkey.velocityY = -12;

    }

    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8

    //spawn the clouds
    spawnBanana();

    //spawn obstacles on the ground
    spawnObstacle();

    if (obstacleGroup.isTouching(monkey)) {
     

    ground.velocityX = 0;
    monkey.velocityX = 0


    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);

    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);

      score = 0;

 }
  
  
  
  drawSprites();

}


function spawnBanana(){
  
  if (frameCount % 100 === 0) {
    var banana = createSprite(600, 120, 10, 10);
    banana.y = Math.round(random(220,300));
    banana.addImage("bananaI" , bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;

    //assign lifetime to the variable
    banana.lifetime = 600 ;

    //adjust the depth
    banana.depth = banana.depth;
    monkey.depth = monkey.depth + 1;

    //add each cloud to the group
    bananaGroup.add(banana);
}
}

function spawnObstacle(){
     if (frameCount % 200 === 0) {
    var obstacle = createSprite(600, 350, 10, 40);
    obstacle.addImage( "obs",obstaceImage)

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 600;
       obstacle.velocityX = - 3;

    //add each obstacle to the group
    obstacleGroup.add(obstacle);
     }
}