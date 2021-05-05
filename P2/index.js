//-- Punto de entrada: una vez cargada la página se llama a esta
console.log("Ejecutando JS...");

//-- Elementos de la interfaz de la calculadora
display = document.getElementById("display")
suma = document.getElementById("suma")
restar = document.getElementById("restar")
multiplicar = document.getElementById("multiplicar")
igual = document.getElementById("igual")
clear = document.getElementById("clear")
digitos = document.getElementsByClassName("digito")


for (let boton of digitos) {
boton.onclick = (ev) => {
  display.innerHTML += ev.target.value;
  console.log("DIGITO!!!");
  }
}


//-- Insertar simbolo de sumar
suma.onclick = () => {
    display.innerHTML += suma.value;
  }

//-- Insertar simbolo de restar
restar.onclick = () => {
  display.innerHTML += restar.value;
}

//-- Insertar simbolo de multiplicar
multiplicar.onclick = () => {
  display.innerHTML += multiplicar.value;
}

//-- Evaluar la expresion
igual.onclick = () => {
    display.innerHTML = eval(display.innerHTML);
  }
  
//-- Poner a cero la expresion
clear.onclick = () => {
    display.innerHTML = "0";
  }