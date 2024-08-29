//Variáveis referentes a posição da bola
let xBolinha = 300
let yBolinha = 200

//Variáveis referentes ao tamanho da bola
let diametro = 25
let raio = diametro / 2

//Variáveis referentes as especificações da raquete
let larguraRect = 17
let alturaRect = 110

//Variáveis referentes ao posicionamento incial da raquete do bot
let xRectOp = 582
let yRectOp = 135


//Variáveis referentes ao posicionamento inicial da raquete do jogador
let xMeuRect = 1
let yMeuRect = 135

//Variáveis referentes a velocidade da bolinha e angulação de início dela
let velocidadeXbolinha = 9
let velocidadeYbolinha = 3

//Variável usada para parar o movimento da raquete do bot em caso de fuga do espaçamento jogável
let pararRaqueteOp = false

//Variáveis para determinar a quantidade de pontos do jogador e do bot
let meusPontos = 0;
let pontosOp = 0;

//Variáveis dos sons usados no jogo
let raquetada;
let ponto;
let trilha

//Variáveis para determinar um atraso do tempo de reação do bot para aumentar ou diminuir a dificuldade
let tempoReacaoBot = 0
let delayBot = 5; //Determina a dificuldade
let yObjetivoBot = 135;

//Inclusão dos sons no jogo
function preload(){

  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
  trilha = loadSound("trilha.mp3");
}

//Criar a bola
function desenhaBola(){
  
  circle(xBolinha, yBolinha, diametro);
}

//Codar a movimentação da bola
function movimentoBola(){
  
  xBolinha += velocidadeXbolinha;
  
  yBolinha += velocidadeYbolinha;

}

//Cria a física de colisão com as paredes da bolinha
function colisaoParede(){
  
  if(xBolinha + raio > width || xBolinha - raio < 0){
    
    velocidadeXbolinha *= -1;

  }
  if(yBolinha + raio > height || yBolinha - raio < 0){
    
    velocidadeYbolinha *= -1;
    
  }

}

//Desenha as raquetes utilizando as variáveis de cima
function raquetes(x, y){
  
  rect(x, y, larguraRect, alturaRect);
  rect(x, y, larguraRect, alturaRect);

}

//Estabelece os comandos de movimento da raquete do jogador
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

//Determina a física utilizada na colisão da raquete do jogador
function colisaoRaquete() {
  if (xBolinha - raio < xMeuRect + larguraRect && 
      yBolinha - raio < yMeuRect + alturaRect && 
      yBolinha + raio > yMeuRect) {
      
    velocidadeXbolinha *= -1;
    velocidadeXbolinha += 0.1;
    xBolinha = xMeuRect + larguraRect + raio;
    raquetada.play();
    raquetada.setVolume(0.3);
  }
}

//Determina a física utilizada na colisão da raquete do bot
function colisaoRaqueteOp() {
  if (xBolinha + raio > xRectOp && 
      yBolinha - raio < yRectOp + alturaRect && 
      yBolinha + raio > yRectOp) {
      
    velocidadeXbolinha *= -1;
    velocidadeXbolinha += 0.1;
    xBolinha = xRectOp - raio;
    raquetada.play();
    raquetada.setVolume(0.3);
  }
}

//Estabelece as condições de movimento do bot determinando o atraso de reação, assim a dificuldade
function movimentoRaqueteOp() {
  if (!pararRaqueteOp) return;
  
  tempoReacaoBot += 2;
  if (tempoReacaoBot > delayBot) {
    yObjetivoBot = yBolinha - alturaRect / 2; 
    tempoReacaoBot = 0; 
  }

  let velocidadeYop = yObjetivoBot - yRectOp;
  yRectOp += velocidadeYop * 0.1;

  if (yRectOp + alturaRect > height) {
    yRectOp = height - alturaRect;
  } else if (yRectOp < -30) {
    yRectOp = 0;
  }
}

//Questão estética do placar do jogo sofrerá alterações em breve
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

//Função para aumentar a variável dos pontos ao tocar na parede e tocar uma trilha sonora 
function marcaPonto(){
  
  if(xBolinha - raio < 1){
    pontosOp ++
    ponto.play();
    ponto.setVolume(0.2);
  }
  if(xBolinha + raio > 600){
    meusPontos ++
    ponto.play();
    ponto.setVolume(0.2);
  }
}

//Função criada pela API do p5.js editor estabelece o ambiente para o jogo e inicia a trilha sonora
function setup() {
  createCanvas(600, 400);
  trilha.loop();
  trilha.setVolume(0.1);
}

//Função também criada pela API do p5.js editor que executa as funções dentro infinitamente
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
  
  //Verifica a posição da bolinha para que a raquete do oponente não saia da área jogável
  if(yBolinha > 390 || yBolinha < 50){
    
    pararRaqueteOp = false;
  } else {
    pararRaqueteOp = true;
  }
}
