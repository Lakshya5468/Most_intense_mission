var helicopterIMG, helicopterSprite, packageSprite,packageIMG,wall1Object,wall2Object,wall3Object;
var packageBody,ground,myEngine,myWorld,bodies;
var gameState="inHeli";

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

function preload()
{
	helicopterIMG=loadImage("helicopter.png");
	packageIMG=loadImage("package.png");
}

function setup() {
	createCanvas(800, 600);
	rectMode(CENTER);
	
	myEngine = Engine.create();
	myWorld = myEngine.world;
    
	/*packageSprite=createSprite(width/2,200, 10, 10);
	packageSprite.addImage(packageIMG);
	packageSprite.scale=0.3;*/

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG);
	helicopterSprite.scale=0.6;

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255);


	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
	 World.add(myWorld, ground);
	 
	 wall1Object = new Mark2(320,505,20,130);
  	 wall2Object = new Mark2(460,505,20,130);
  	 wall3Object = new Mark1(390,580,140,20);

	packageBody=new Supply(width/2, 190, 40);

	Engine.run(myEngine);
}

function draw() {
  rectMode(CENTER);
  Engine.update(myEngine);
  background(0);
  packageBody.display();
  drawSprites();
  if (gameState==="inHeli") {
  packageBody.body.position.x=helicopterSprite.x;
  packageBody.body.position.y=helicopterSprite.y;
  }
  wall1Object.display();
  wall2Object.display();
  wall3Object.display();
}

function keyPressed(){
	if(keyCode === LEFT_ARROW){
		//console.log(false);
		helicopterSprite.x=helicopterSprite.x-5;
	}
	if(keyCode === RIGHT_ARROW){
		//console.log(true);
		helicopterSprite.x=helicopterSprite.x+5;
	}
	if(keyCode === DOWN_ARROW){
		//console.log(null);
		Matter.Body.setStatic(packageBody.body,false);
		gameState="outOfHeli";
	}
}