console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

//-- Definir el tamaño del convas
canvas.width = 600;
canvas.height = 550;

//-- Obtener el contexto del canvas
const ctx = canvas.getContext("2d");

const ESTADO = {
  START: 0,
  INIT: 1,
  INGAME: 2,
  FINISH: 3,
}

let estado = ESTADO.START;

//-- Coordenadas de la pelota
let x = 250;
let y = 520;

//-- Velocidades del objeto
let velx = 4;
let vely = -2;
 
//-- coordenadas Raqueta
let l = 250;
let p = 530;

let vell = 15;

let lifes = 3;

let rightPressed = false;

let leftPressed = false;

//-- Constantes de los ladrillos
const LADRILLO = {
  F: 2,  // Filas
  C: 3,  // Columnas
  w: 30,
  h: 20,
  origen_x: 0,
  origen_y: 0,
  padding: 5,
  visible: true
};

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
    if (y >= 550 ) {
      console.log("fuera");
      estado = ESTADO.START;
      x = 250;
      y = 520;
      vely = -vely;
      velx = -velx;
      lifes -= 1;
      if (lifes == 0) {
        estado = estado = ESTADO.START;
        lifes = 3;
      }
    }


    window.onkeydown = (e) => {
    if (e.key == ' ' && estado == ESTADO.START){
      console.log("DIBUJAR");
      estado = ESTADO.INGAME;
      }
    }
    
    //-Colision bola con raqueta
    if ((x + 10) >= l && x <=(l + 100) &&
    (y + 5) >= p && y <=(p + 10)) {
    vely = -vely;
    }

  
    //-- Actualizar la posición
    if (estado == ESTADO.INGAME) {
      x = x + velx;
      y = y + vely;

      window.onkeydown = (e) => {     // Tecla pulsada
        if(e.keyCode == 39) {
            rightPressed = true;
            l = l + vell;
          }
          else if(e.keyCode == 37) {
            leftPressed = true;
            l = l - vell;
          } 
        }
        window.onkeyup = (e) => {       // Tecla liberada
        if (e.keyCode == 39) {
            rightPressed = false;
            
          }
        else if(e.keyCode == 37) {
            leftPressed = false;
            
            } 
          }
    }
    
  
    //-- 2) Borrar el canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    //-- 3) Dibujar los elementos visibles

    ctx.beginPath();
    //-- Dibujar un circulo: coordenadas x,y del centro
    //-- Radio, Angulo inicial y angulo final
    if (estado == ESTADO.INGAME) {
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


  ctx.beginPath();
    //-- Raqueta
    ctx.rect(l ,p , 80, 10);
    ctx.fillStyle = 'white';

    //-- Dibujar el trazo
    ctx.stroke()

    //-- Dibujar el relleno
    ctx.fill()
      
  ctx.closePath()

  ctx.font = "25px Arial";
  ctx.filltyle = 'black';
  // ctx.fillText("Puntuación: " + scores, 10, 40);
  ctx.fillText("Vidas: " + lifes, 430, 40);

 
  //-- Estructura de los ladrillos
//-- Creación de los ladrillos, que inicialmente está vacío
//-- en el objeto ladrillos, que inicialmente está vacío
const ladrillos = [];

//-- Recorrer todas las filas. La veriable i toma valores de 0 hasta F-1 (número de filas)
for (let i = 0; i < LADRILLO.F; i++) {
    ladrillos[i] = [];  //-- Inicilizar la fila. Las filas son a su vez Arrays que inicialmente están vacíos

    //-- Recorrer las C columnas de la fila i. La variable j toma valores de 0 hasta C-1 (numero de columnas)
    for (let j = 0; j < LADRILLO.C; j++) {

        //-- Calcular valores para el ladrillo de la fila i y la columna j
        //-- Algunos valores son constantes. Otros dependen de i y j
      ladrillos[i][j] = {
          x: (LADRILLO.w + LADRILLO.padding) * j,
          y: (LADRILLO.h + LADRILLO.padding) * i,
          w: LADRILLO.w,
          h: LADRILLO.h,
          padding: LADRILLO.padding,
          visible: LADRILLO.visible
        };
    }
}

ladrillos[0][1].visible = false;


//-- Dibujar ladrillos
for (let i = 0; i < LADRILLO.F; i++) {
    for (let j = 0; j < LADRILLO.C; j++) {

      //-- Si el ladrillo es visible se pinta
      if (ladrillos[i][j].visible) {
        ctx.beginPath();
        ctx.rect(ladrillos[i][j].x, ladrillos[i][j].y, LADRILLO.w, LADRILLO.h);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();
      }
    }
}

  //-- 4) Volver a ejecutar update cuando toque
  requestAnimationFrame(update);
}

//-- ¡Que empiece la función!
update();
