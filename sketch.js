var WIN = 2;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground, invisibleGround, groundImage;
var piecesGroup, pbstacleGroup;
var pieces;
var score = 0;
var character;
var soundWin, soundOver, soundPoint;
var peon_B_Img,Caballo_B_Img, alfil_B_Img, torre_B_Img, dama_B_Img, rey_B_Img;
var peon_N_Img, caballo_N_Img, alfil_N_Img, torre_N_Img, dama_N_Img;
var reloj, relojimg, coinImg;
var gameOver, gameOverImg, restart,  restartImg,youWin, youWinImg;
var  distance = 0;


function preload(){

  
  groundImage = loadImage("Imagenes/ground.jpg");
  
  peon_B_Img = loadImage("Imagenes/Peon_B.png");
  Caballo_B_Img = loadImage("Imagenes/Caballo_B.png");
  alfil_B_Img = loadImage("Imagenes/Alfil_B.png");
  torre_B_Img = loadImage("Imagenes/Torre_B.png");
  dama_B_Img = loadImage("Imagenes/Dama_B.png");
  rey_B_Img = loadImage("Imagenes/Rey_B.png");
  
  peon_N_Img = loadImage("Imagenes/Peon_N.png");
  caballo_N_Img = loadImage("Imagenes/Caballo_N.png");
  alfil_N_Img = loadImage("Imagenes/Alfil_N.png");
  torre_N_Img = loadImage("Imagenes/Torre_N.png");
  dama_N_Img = loadImage("Imagenes/Dama_N.png");
  
  gameOverImg = loadImage("Imagenes/gameOver.png");
  restartImg = loadImage("Imagenes/restart.png");
  youWinImg = loadImage("Imagenes/youWin.png")
  

  groundImage = loadImage("Imagenes/ground.jpg");
  relojimg = loadImage("Imagenes/reloj.png")
  
  
  gameOverImg = loadImage("Imagenes/gameOver.png");
  restartImg = loadImage("Imagenes/restart.png");

  coinImg = loadImage("Imagenes/coin.png");
  mensajeImg = loadImage("Imagenes/mensaje.png");
  
  soundPoint = loadSound("Sonidos/coin.mp3");
  soundOver = loadSound("Sonidos/gameOver.mp3");
  soundWin = loadSound("Sonidos/youWin.mp3");
   
}

function setup() {
  createCanvas(400,250);
  
  character = createSprite(50,180,20,50)
  character.addImage("Peon", peon_B_Img);
  character.scale = 0.2;
  character.setCollider("rectangle", 10,30);
  //character.debug = true;
  
  ground = createSprite(500,350,10,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*distance/100);


  
  gameOver = createSprite(200,90);
  gameOver.addImage(gameOverImg);

  mensaje = createSprite(200,140);
  mensaje.addImage(mensajeImg);
  mensaje.scale = 0.3;

  mensaje.visible = false;
  
  restart = createSprite(200,140);
  restart.addImage(restartImg);

  youWin = createSprite(200,90);
  youWin.visible = false;
  youWin.scale = 0.3;
  youWin.addImage("win", youWinImg);
  
  gameOver.scale = 0.1;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;

  
  invisibleGround = createSprite(200,190,400,30);
  invisibleGround.visible = false;
  

  piecesGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;



}

function draw() {
  background(255);
  
  textSize(15);
  textFont("Arial Black");
  text("Score: "+ score, 300,20);
 
 
  
  if (gameState===PLAY){
    distance = distance + Math.round(getFrameRate()/60);
    
  
    if(keyCode===UP_ARROW) {
      character.y = character.y-10;
    }else if(keyCode===DOWN_ARROW){
      character.y = character.y +10;
    }

  
    character.velocityY = character.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    character.collide(invisibleGround);
    spawnPieces();
    spawnObstacles();
   
    

    if(piecesGroup.isTouching(character)){

      soundPoint.play();
      score++;
    
        
    }else if(obstacleGroup.isTouching(character)){
      soundOver.play();
      gameState = END;
      
    }
    if(score>=45){
      gameState = WIN
      soundWin.play();
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    

    ground.velocityX = 0;
    character.velocityY = 0;
    piecesGroup.setVelocityXEach(0);
    piecesGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }else if(gameState === WIN){
    youWin.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    character.velocityY = 0;
    piecesGroup.setVelocityXEach(0);
    piecesGroup.setLifetimeEach(-1);

    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}


function spawnPieces() {
  if(frameCount % 60 === 0) {
    var pieces = createSprite(Math.round(random(50,500)),Math.round(random(50,180)),10,40);
    pieces.velocityX = -(6 + 3*distance/100);
    pieces.visible = true;
  
    
    ground.depth = character.depth-10;
    character.depth = character.depth+1;
    piecesGroup.depth  = character.depth+10;
    
  
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: pieces.addImage(peon_N_Img);
              break;
      case 2: pieces.addImage(caballo_N_Img);
              break;
      case 3: pieces.addImage(alfil_N_Img);
              break;
      case 4: pieces.addImage(torre_N_Img);
              break;
      case 5: pieces.addImage(dama_N_Img);
              break;

      default: break;
    }
    
              
    pieces.scale = 0.2;
    pieces.lifetime = 300;
    
   piecesGroup.add(pieces);
  }
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(Math.round(random(50,500)),Math.round(random(1,200)),10,40);
    obstacle.addImage("clock", relojimg);
    obstacle.scale = 0.5;
    obstacle.velocityX = -(6 + 3*distance/100);
  
    
    ground.depth = character.depth-10;
    character.depth = character.depth+1;
    piecesGroup.depth  = character.depth+10;
    obstacleGroup.depth = piecesGroup.depth;  
              
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    
   obstacleGroup.add(obstacle);
  }
}







function reset(){
  gameState = PLAY;
  ground.velocityX = -(6 + 3*distance/100);
  gameOver.visible = false;
  restart.visible = false;
  youWin.visible = false;
  piecesGroup.destroyEach();
  
  score = 0;
  
}
