
var trex ,trex_running;
var edges;
var ground,invisibleground,cloud,randomNo;//cactus;
var selectCactus,CactusDis, score = 0;
var gamestate = "play";
var restart,gameOver;


function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  
  groundImage = loadAnimation("ground2.png");
  //groundImage2 = loadAnimation("ground2.png"); 
  
  cloudImage = loadImage("cloud.png");
  
  
  cactusImage = loadImage("obstacle1.png");
  cac2Image = loadImage("obstacle2.png");
  cac3Image = loadImage("obstacle3.png");
  cac4Image = loadImage("obstacle4.png");
  cac5Image = loadImage("obstacle5.png");
  cac6Image = loadImage("obstacle6.png");
  trexImage2 = loadImage("trex_collided.png");
  restartImage = loadImage("restart.png");
  gameOverImage = loadImage("gameOver.png");
  
  dieSound = loadSound("die.mp3");
  jumpSound = loadSound("jump.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
}

function setup(){
  createCanvas(600,200)
  
  var message = "hi"
  
  
  //create a trex sprite
  trex = createSprite(50,150,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5
  trex.setCollider("circle",0,0,45)
  trex.debug = false;
  trex.addImage("collided",trexImage2);
  
  ground = createSprite(300,180,600,20);
  ground.addAnimation("ground",groundImage);
  
  invisibleground = createSprite(300,190,600,10);
  invisibleground.visible = false;
  //invisibleground.shapeColor = "white";
  
  restart = createSprite(300,100,20,20);
   restart.addImage(restartImage);
   restart.scale = 0.6;
   
   gameOver = createSprite(300,60,20,20);
   gameOver.addImage(gameOverImage);
   gameOver.scale = 0.5;
  
  
  
  edges = createEdgeSprites();
  
  cactusGroup = new Group();
  cloudGroup = new Group();
}

function draw(){
  background("white")
  trex.collide(invisibleground);
  
  text("Score = " +score,500,40);
  
  if(gamestate =="play"){
  ground.velocityX = -6
  
  createcloud();
  createCactus();
  
  if(ground.x<0){
    ground.x = 300;
  } 
  
  if(keyDown("space") && trex.y>159){
   trex.velocityY = -7;  
    jumpSound.play();
  }
    //console.log(trex.y);
  //for the gravity of the trex
  trex.velocityY = trex.velocityY +0.4;
  
  
  if(trex.isTouching(cactusGroup)){
    gamestate ="end"
    dieSound.play();
  }
    
  if(score % 100 ==0 && score>0){
   checkPointSound.play(); 
  }
    
    restart.visible = false;
    gameOver.visible = false;
  
  score = score + Math.round(getFrameRate()/60)
  
  //console.log(frameCount);
  
 // randomNo = Math.round(random(0,60))
    
  }
 else if(gamestate =="end"){
  ground.velocityX = 0;
    cactusGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    cactusGroup.setLifetimeEach(-1);
   cloudGroup.setLifetimeEach(-1);
   trex.changeImage("collided",trexImage2);
   trex.velocityY = 0;
   
   restart.visible = true;
    gameOver.visible = true;
      
   if(mousePressedOver(restart)){
    reset();
  }
 }
  
  
  
  drawSprites();
}
//end of function draw

function createcloud(){
  if(frameCount%110 == 0){
  cloud = createSprite(500,randomNo,20,40);
  cloud.velocityX = -2
  cloud.addImage("cloudI",cloudImage);
  cloud.scale = 0.7; 
    cloud.depth = trex.depth;
    trex.depth = trex.depth +1;
     console.log(cloud.x);
    //console.log("cloud-" +cloud.depth);
    //console.log("trex-" +trex.depth);
    cloud.lifetime = 250;
    cloudGroup.add(cloud);
    
    var clown = 5
    
  }
}

function createCactus(){
  //clown = createSprite(40,40,40,40);
  //console.log(clown)
  if(frameCount % 120 == 0){
    cactus = createSprite(600,165,40,40);
  //cactus.addAnimation("obstacle",cactusImage);
  cactus.scale = 0.6
 
    cactus.lifetime = 300;
    selectCactus = Math.round(random(1,6));
    
     cactus.velocityX = -(6+score/50);
    
      
    
    switch(selectCactus){
        case 1:cactus.addImage(cactusImage);
        break;
        case 2: cactus.addImage(cac2Image);
        break;
        case 3:cactus.addImage(cac3Image);
        break;
        case 4:cactus.addImage(cac4Image);
        break;
        case 5:cactus.addImage(cac5Image);
        break;
        case 6:cactus.addImage(cac6Image);
        break;
  }//switch loop
    
    cactusGroup.add(cactus);
  }//if loop
  
}//function cactus ends

function reset(){
  gamestate = "play";
  trex.changeAnimation("running", trex_running)
  cactusGroup.destroyEach();
  cloudGroup.destroyEach();
  
  score = 0;
}