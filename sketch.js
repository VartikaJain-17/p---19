var PLAY = 1;
var END = 0;
var gameState = PLAY;

var man, man_running, man_collided;
var goldCoinImg
var groundImg
var score=0;
var rockImg
var gameOver, restart;


function preload(){
  
  groundImg = loadImage("ground.png")
 goldCoinImg = loadImage("goldcoin.png");
  
  man_running = loadAnimation("man1.png ", "man2.png");

  rockImg = loadImage("rock.jpeg")
  
  gameOverImg = loadImage("Game-Over.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  ground = createSprite(100,150);
  ground.addImage(groundImg);
  ground.velocityX = -5;
  
   coin= createSprite(width-50,100,10,10);
   coin.addAnimation("gold coin", goldCoinImg);
   coin.scale = 0.1


  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;

  rocksGroup = new Group()
  mansGroup = new Group()
  score = 0;

}

function draw() {

  background(groundImg);
  textSize(20);
  fill("black")
  text("Score: "+ score,30,50);
  createMan()
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    
    if((touches.length > 0 || keyDown("SPACE")) && man.y  >= height-120) {
      man.velocityY = -10;
       touches = [];
    }
    
    man.velocityY = man.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    if(rocksGroup.isTouching(mansGroup)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    
    rock.velocityX(0);
   
   
    if(touches.length>0 || keyDown("SPACE") || mousePressedOver(restart)) {      
      reset();
      touches = []
    }
  }
  
  
  drawSprites();
  createRock()
  
}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  rock.destroy();
  
  score = 0;
  
}

function createRock(){
  if(frameCount % 60 === 0){
    rock = createSprite(width-50,100,10,10)
    rock.addAnimation("rock", rockImg);
    rock.scale = 0.2
    
    rocksGroup.add(rock)
    rock.lifetime = 1
   // rocksGroup.setLifetimeEach(1)
  }

}
function createMan(){
  man = createSprite(50,height-70,20,50);
  man.addAnimation("running", man_running);
  man.setCollider('circle',0,0,350)
  man.scale = 0.08;
  man.velocityY = 0;
}



