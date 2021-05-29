console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('imagesrc')
const ctx = canvas.getContext('2d');

//-- Acceso al deslizador
const deslizadorR = document.getElementById('deslizadorR');
const deslizadorG = document.getElementById('deslizadorG');

//-- Valor del deslizador
const range_valueR = document.getElementById('range_valueR');
const range_valueG = document.getElementById('range_valueG');

grises.onclick = () => {
let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
let data = imgData.data
for (var i = 0; i < data.length; i+=4) {
    brillo = (3 * data[i] + 4 * data[i+1] + data[i+2])/8
    data[i] = brillo;
    data[i+1] = brillo;
    data[i+2] = brillo;
    }
    ctx.putImageData(imgData, 0, 0);
}


//-- Función de retrollamada de imagen cargada
//-- La imagen no se carga instantaneamente, sino que
//-- lleva un tiempo. Sólo podemos acceder a ella una vez
//-- que esté totalmente cargada
img.onload = function () {

  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);
  console.log("Imagen lista...");
};

function umbrales(){
    
    //-- Mostrar el nuevo valor del deslizador
    range_valueR.innerHTML = deslizadorR.value;
    range_valueG.innerHTML = deslizadorG.value;
  
    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img, 0,0);
  
    //-- Obtener la imagen del canvas en pixeles
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
    //-- Obtener el array con todos los píxeles
    let data = imgData.data
  
    //-- Obtener el umbral de rojo del desliador
    umbralR = deslizadorR.value
    umbralG = deslizadorG.value

  
    //-- Filtrar la imagen según el nuevo umbral
    for (let i = 0; i < data.length; i+=4) {
      if (data[i] > umbralR){
        data[i] = umbralR;
    }
    if (data[i+1] > umbralG){
        data[i+1] = umbralG;
    }
    }  
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  } 
  
    //-- Funcion de retrollamada de los deslizadores
    deslizadorR.oninput = () => {
    umbrales();
  }
    deslizadorG.oninput = () => {
    umbrales();
  }


  
  console.log("Fin...");