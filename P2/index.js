//-- Punto de entrada: una vez cargada la página se llama a esta
console.log("Ejecutando JS...");

//-- Elementos de la interfaz de la calculadora
display = document.getElementById("display")
igual = document.getElementById("igual")
clear = document.getElementById("clear")
borrar = document.getElementById("borrar")

//-- Crea un array con todos los elementos de la clase digito
digitos = document.getElementsByClassName("digito") //-- Leo del html
//-- Crea un array con todos los elementos de la clase digito
signos = document.getElementsByClassName("signo") //-- Leo del html


//-- Estados de la calculadora
const ESTADO = {
  INIT: 0,
  OP1: 1,
  OPERATION: 2,
  OP2: 3
}

//-- Variable de estado de la calculadora
 //-- Al comenzar estamos en el estado incial
 let estado = ESTADO.INIT;

 //-- Función de retrollamada de los digitos
function digito(ev)
{
    //-- Se ha recibido un dígito
    //-- Según en qué estado se encuentre la calculadora
    //-- se hará una cosa u otra

    //-- Si es el primer dígito, no lo añadimos,
    //-- sino que lo mostramos directamente en el display
    if (estado == ESTADO.INIT) {

        display.innerHTML = ev.target.value;

        //-- Pasar al siguiente estado
        estado = ESTADO.OP1;

    } else {
       
        //--En cualquier otro estado lo añadimos
        display.innerHTML += ev.target.value;

        //-- Y nos quedamos en el mismo estado
    } 
    
}

//-- Establecer la misma función de retrollamada
//-- para todos los botones de tipo dígito
for (let boton of digitos) {
  boton.onclick = digito;
}

//-- Establecer la misma función de retrollamada
//-- para todos los botones de tipo signo
for (let boton of signos) {
  boton.onclick = (ev) => {
    display.innerHTML += ev.target.value;
    console.log("SIGNO!!!");
  }
}

//-- Evaluar la expresion
igual.onclick = () => {
    display.innerHTML = eval(display.innerHTML);
  }
  
  //-- Borrar último digito
borrar.onclick = () => {
  display.innerHTML = display.innerHTML.slice(0,-1);
}

//-- Poner a cero la expresion
clear.onclick = () => {
    display.innerHTML = "0";
    console.log("clear");
    estado = ESTADO.INIT;
  }