let nave;
let nave_img;
let bg_img;
let score;


let forcaV = 0; 
let fundoMovimento;

let alien, alienImage;
let pedrasQ, pedrasQImage;
let asteroide, asteroideImage;
let asteroideFogo, asteroideFogoImage;

let vida;
let colidiu = false;

let obstacles; // Grupo de obstáculos

function preload() {
  nave_img = loadImage("espacoNave.png");
  bg_img = loadImage("2.jpg");
  alienImage = loadImage("alienInimigo.png");
  pedrasQImage = loadImage("pedrasQuebradas.png");
  asteroideImage = loadImage("asteroide.png");
  asteroideFogoImage = loadImage("asteroideFogo.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(80);
  score = 0;


  nave = createSprite(windowWidth / 2 - 600, windowHeight - 300, 30, 30);
  nave.addImage(nave_img);
  nave.scale = 0.5;

 
obstacles = new Group();
  rectMode(CENTER);
  textSize(15);

  vida = 3;
}

function draw() {
  
  background(0); // Muda o fundo para preto para diferenciar da imagem de fundo
  fill("white");
  textSize(35);
  text("Pontuação " + score, 1500, 60);
  score = score + Math.round(getFrameRate()/90)
  

  textSize(30);
  fill('white');
  text("Vidas restantes : "+ vida, windowWidth / 2 - 900, windowHeight / 4 - 70)

 // nave.velocityY = forcaV;  

  if (nave.isTouching(obstacles)&& !colidiu){
    vida = vida - 1;
    colidiu = true;
     obstacles.destroyEach();
  }
  if(!nave.isTouching(obstacles)){
    colidiu = false;

  }




  if (keyIsDown(UP_ARROW)) {
    nave.y = nave.y - 5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    nave.y = nave.y + 5;
  }
   if (keyIsDown(LEFT_ARROW)) {
    nave.x = nave.x - 5;
  }
   if (keyIsDown(RIGHT_ARROW)) {
    nave.x = nave.x + 5;
  }
  if (nave.isTouching(obstacles)){
    vida = vida - 1

  }


  spawObstacles()
  drawSprites()

  
  
  
 
}
function spawObstacles(){
  if(frameCount % 90 === 0 ){
    var obstacle = createSprite(width + 50, random(20, height), 20 , 30)
    obstacle.velocityX = -(6 + score / 500 );
    obstacle.scale = 0.5;
    var rand = Math.round(random(1,4));

    switch(rand ){
      case 1: obstacle.addImage(alienImage);
      break;
      case 2: obstacle.addImage(pedrasQImage);
      break;
      case 3: obstacle.addImage(asteroideImage);
      break;
      case 4: obstacle.addImage(asteroideFogoImage);
      break;
      default : break;

    }
  obstacles.add(obstacle);  

  }
}


function windowResized(){
  resizedCanvas(windowWidth, windowHeight)
}
