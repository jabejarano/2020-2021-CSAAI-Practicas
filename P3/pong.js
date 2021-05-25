console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

//-- Definir el tamaño del convas
canvas.width = 500;
canvas.height = 250;

//-- Obtener el contexto del canvas
const ctx = canvas.getContext("2d");

const ESTADO = {
  START: 0,
  INIT: 1,
  INGAME: 2,
  FINISH: 3,
}

let estado = ESTADO.START;

//-- Coordenadas del objeto
let x = 250;
let y = 200;

//-- Velocidades del objeto
let velx = -3;
let vely = -1;
 

//-- Funcion principal de animacion
function update() 
{
    console.log("test");
    //-- Algoritmo de animacion:
    //-- 1) Actualizar posicion del  elemento
    //-- (física del movimiento rectilineo uniforme)
  
     //-- Condicion de rebote en extremos verticales del canvas
     if (x < 0 || x >= (canvas.width - 20) ) {
      velx = -velx;
    }
  
    //-- Condición de rebote en extremos horizontales del canvas
    if (y <= 0) {
      vely = -vely;
    }

    //-- Codición si la bola pasa la raqueta de abajo se reinicia el movimiento
    if (y >= 250 ) {
      estado = ESTADO.START;
      console.log("fuera")
    }


    window.onkeydown = (e) => {
    if (e.key == 'Enter' && estado == ESTADO.START){
      estado = ESTADO.INIT;
      console.log("SAQUE")
      }
    }
  
    //-- Actualizar la posición
    if (estado == ESTADO.INIT) {
      x = x + velx;
      y = y + vely;
    }
  
    //-- 2) Borrar el canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    //-- 3) Dibujar los elementos visibles
    ctx.beginPath();
    //-- Dibujar un circulo: coordenadas x,y del centro
    //-- Radio, Angulo inicial y angulo final
    if (estado == ESTADO.INIT) {
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    }
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'yellow';

    //-- Dibujar el relleno
    ctx.fill()

    //-- Dibujar el trazo
    ctx.stroke()
  ctx.closePath();

  //-- 4) Volver a ejecutar update cuando toque
  requestAnimationFrame(update);
}

//-- ¡Que empiece la función!
update();
