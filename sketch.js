var bananaImage,obstacleImage,monkeyImage,backgroundImage;
var score =  0;
var monkey,bg,indGround;
var obstacles;
var bananas;
var score;
function preload()
{
   bananaImage = loadImage("banana.png");
   obstacleImage = loadImage("stone.png");
   monkeyImage = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png",
   "Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
   backgroundImage = loadImage("jungle.jpg");
}
function setup() {
  createCanvas(innerWidth, innerHeight);
  bg = createSprite(innerWidth/2,innerHeight/2,10,10);
  bg.addImage(backgroundImage);
  bg.scale = 1.6;
  monkey = createSprite(100,innerHeight - 100,100,100);
  monkey.addAnimation("run",monkeyImage);
  monkey.scale = 0.2;
  indGround = createSprite(innerWidth/2,innerHeight - 50,innerWidth,40);
  indGround.x = indGround.width/2;
  indGround.visible = false;
  obstacles = new Group();
  bananas  = new Group();
}

function draw() 
{
  background(220);
  textSize(20);
  fill("white");
  text("Score:"+score,innerHeight/2,innerWidth/2);
    indGround.velocityX = -4;
    if (indGround.x < 0){
      indGround.x = indGround.width/2;
    }
    if(keyDown("space") && monkey.y>=523)
    {
      monkey.velocityY = -12;
      console.log(monkey.y)
    }
    monkey.velocityY+=0.8;
    monkey.collide(indGround);
    if(monkey.isTouching(bananas))
    {
      bananas.destroyEach();
      score+=2;
    }
    if(monkey.isTouching(obstacles))
    {
      obstacles.destroyEach();
      monkey.scale = 0.2;
    }
    switch(score)
    {
      case 10:
        monkey.scale = 0.12;
        break;
      case 20:
        monkey.scale = 0.14
        break;
      case 30:
        monkey.scale = 0.16;
        break;
      case 40:
        monkey.scale = 0.18;
        break;     
    }
    spawnBananas();
    spawnStones();
  drawSprites();
}
function spawnBananas()
{
  if(frameCount % 80 == 0)
  {
  var banana = createSprite(500,random(340,380),10,10);
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -4;
  banana.lifetime  = 150;
  bananas.add(banana); 
  }
}
function spawnStones()
{
  if(frameCount % 100 == 0)
  {
  var stone = createSprite(random(500,780),innerHeight - 50,10,10);
  stone.addImage(obstacleImage);
  stone.scale = 0.2;
  stone.velocityX = -4;
  stone.lifetime  = 250;
  stone.collide(indGround);
  obstacles.add(stone); 
  }
}