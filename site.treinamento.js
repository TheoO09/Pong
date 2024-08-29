let xBolinha = 300
let yBolinha = 200

let diametro = 25
let raio = diametro / 2

let larguraRect = 12
let alturaRect = 110

let xRectOp = 570
let yRectOp = 135

let xMeuRect = 10
let yMeuRect = 135

let velocidadeXbolinha = 4
let velocidadeYbolinha = 0

function desenhaBola(){
  
  circle(xBolinha, yBolinha, diametro);
}

function movimentoBola(){
  
  xBolinha += velocidadeXbolinha;
  
  yBolinha += velocidadeYbolinha;

}

function colisaoParede(){
  
  if(xBolinha + raio > width || xBolinha - raio < 0){
    
    velocidadeXbolinha *= -1;

  }
  if(yBolinha + raio > height || yBolinha - raio < 0){
    
    velocidadeYbolinha *= -1;
    
  }

}

function minhaRaquete(){
  
   rect(xMeuRect, yMeuRect, larguraRect, alturaRect);
  
}

function raqueteOponente(){
  
  rect(xRectOp, yRectOp, larguraRect, alturaRect);

}
function movimentoMeuRect(){
  
  if (keyIsDown(UP_ARROW)){
    yMeuRect -= 10
    if(yMeuRect > 5){
      yMeuRect -= 20
    }
  }
  if (keyIsDown(DOWN_ARROW)){
    yMeuRect += 10
    if(yMeuRect + alturaRect > height){
      yMeuRect += -20
    }
  }
}

function colisaoRaquete(){
  
  if(xBolinha - diametro < xMeuRect && yBolinha - raio < yMeuRect + alturaRect && yBolinha + raio > yMeuRect){
    xBolinha *= -1
  }
  if(xBolinha - diametro > xRectOp){
    xBolinha *= -1
  }
}
console.log(yMeuRect);


function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  
  minhaRaquete();
  raqueteOponente();
  
  desenhaBola();
  
  movimentoBola();
  
  colisaoParede();
  
  movimentoMeuRect();
  
  colisaoRaquete();

}
