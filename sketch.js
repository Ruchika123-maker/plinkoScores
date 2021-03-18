const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var particles =[];
var plinkos =[];
var divisions =[];

var divisionHeight = 300;

var score = 0;
var particle;
var turn = 0;

var gameState ="start";


function setup() {
  createCanvas(480,800);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(240, 795, 480, 10);


  //create division bodies
  for (var i = 0; i <= width; i = i + 80){
    divisions.push(new Division(i, height-divisionHeight/2, 10, divisionHeight));
  }

   //create plinko bodies
   for (var j = 40; j <= width; j = j + 50){
    plinkos.push(new Plinko(j, 75));
  }
  for (var j = 15; j <= width - 10; j = j + 50){
    plinkos.push(new Plinko(j, 175));
  }
  for (var j = 40; j <= width; j = j + 50){
    plinkos.push(new Plinko(j,275));
  }
  for (var j = 15; j <= width - 10; j = j + 50){
    plinkos.push(new Plinko(j, 375));
  }

}

function draw() {
  background("black"); 
  Engine.update(engine);
  drawSprites();

  
  if (frameCount % 60 === 0){
    particles.push(new Particle(random(width/2-20, width/2+20), 10, 10));
  }

  ground.display();

  for (var i = 0; i < divisions.length; i++){
    divisions[i].display();

  for (var j = 0; j < plinkos.length; j++){
      plinkos[j].display();
    }
  }
  for (var k = 0; k < particles.length; k++){
    particles[k].display();
  }

  if(particle!=null)
    {
       particle.display();
        
        if (particle.body.position.y>760)
        {
              if (particle.body.position.x < 300) 
              {
                  score=score+500;      
                  particle=null;
                  if ( turn>= 5) gameState ="end";                          
              }


              else if (particle.body.position.x < 600 && particle.body.position.x > 301 ) 
              {
                    score = score + 100;
                    particle=null;
                    if ( turn>= 5) gameState ="end";

              }
              else if (particle.body.position.x < 900 && particle.body.position.x > 601 )
              {
                    score = score + 200;
                    particle=null;
                    if ( turn>= 5)  gameState ="end";

              }      
              
        }
  
      }

      if ( gameState =="end") {
    
        textSize(100);
        text("GameOver", 150, 250);
        //return
      }


  textSize(35)
  text("Score : "+score,20,40);
  textSize(35)
  fill("white");
  text(" 550 ", 5, 550);
  text(" 450 ", 80, 550);
  text(" 350 ", 160, 550);
  text(" 350 ", 240, 550);
  text(" 450 ", 320, 550);
  text(" 550 ", 400, 550);
}

function mousePressed()
{
  if(gameState!=="end")
  {
      turn++;
     particle = new Particle(mouseX, 10, 10, 10); 
  }   
}

