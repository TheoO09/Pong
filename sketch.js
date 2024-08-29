let xBolinha = 300
let yBolinha = 200

let diametro = 25
let raio = diametro / 2

let larguraRect = 17
let alturaRect = 110

let xRectOp = 582
let yRectOp = 135

let xMeuRect = 1
let yMeuRect = 135

let velocidadeXbolinha = 9
let velocidadeYbolinha = 3

let pararRaqueteOp = false

let meusPontos = 0;
let pontosOp = 0;

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

function raquetes(x, y){
  
  rect(x, y, larguraRect, alturaRect);
  rect(x, y, larguraRect, alturaRect);

}

function movimentoMeuRect(){
  
  if (keyIsDown(UP_ARROW)){
    yMeuRect -= 10
    if(yMeuRect < -1){
      yMeuRect += 10
    }
  }
  if (keyIsDown(DOWN_ARROW)){
    yMeuRect += 10
    if(yMeuRect + alturaRect > height){
      yMeuRect += -10
    }
  }
}

function colisaoRaquete() {
  if (xBolinha - raio < xMeuRect + larguraRect && 
      yBolinha - raio < yMeuRect + alturaRect && 
      yBolinha + raio > yMeuRect) {
      
    velocidadeXbolinha *= -1;
    xBolinha = xMeuRect + larguraRect + raio;
  }
}

function colisaoRaqueteOp() {
  if (xBolinha + raio > xRectOp && 
      yBolinha - raio < yRectOp + alturaRect && 
      yBolinha + raio > yRectOp) {
      
    velocidadeXbolinha *= -1;
    xBolinha = xRectOp - raio;
  }
}

function movimentoRaqueteOp(){
  
  if(pararRaqueteOp){
  velocidadeYop = yBolinha - yRectOp - larguraRect / 2 - 100;
  yRectOp += velocidadeYop;
  }
  
}

function placarJogo(){
  
  stroke(255);
  textAlign(CENTER);
  fill(color(255,140,0));
  rect(200, 10, 40, 30);
  fill(255);
  text(meusPontos, 220, 28);
  fill(color(255,140,0));
  rect(400, 10, 40, 30);
  fill(255);
  text(pontosOp, 420, 28);
}

function marcaPonto(){
  
  if(xBolinha - raio < 1){
    pontosOp ++
  }
  if(xBolinha + raio > 600){
    meusPontos ++
  }
}


function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  
  raquetes(xMeuRect, yMeuRect);
  raquetes(xRectOp, yRectOp);
  
  desenhaBola();
  
  movimentoBola();
  
  colisaoParede();
  
  movimentoMeuRect();
  
  colisaoRaquete();

  colisaoRaqueteOp();
  
  movimentoRaqueteOp();
  
  placarJogo();
  marcaPonto();
  
  if(yBolinha > 390 || yBolinha < 110){
    
    pararRaqueteOp = false;
  } else {
    pararRaqueteOp = true;
  }
}
