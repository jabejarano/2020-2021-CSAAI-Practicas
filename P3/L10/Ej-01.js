const canvas = document.getElementById("canvas");

canvas.width = 300;
canvas.height = 100;

const ctx = canvas.getContext("2d");

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