//BUCLE PRINCIPAL - Ejecución
var FPS=24;
setInterval(function() {
    principal();
},1000/FPS);

//Main
const ancho=700, largo=300;
function principal() {
    borrarCanvas();
    gravedad();
    colision();
    logicaObstaculo();
    logicaNube();
    logicaSuelo();
    dibujaSuelo();
    dibujaNube();
    dibujaObstaculo();
    dibujaSujeto();
    gameOver();
}

//Obtener elementos para el juego como canvans y sprites
var canvas, contexto;
var sprites;
var suelo=200;
var sprite=0;

function cargarElementos() {
    canvas=document.getElementById("canvas");
    contexto=canvas.getContext("2d");
    cargarSprites();
}

function cargarSprites() {
    sprites=new Image();
    sprites.src="img/trex.png";
}

function dibujaSujeto() {
    //drawImage(<Objeto Image>, <X Sprite>, <Y Sprite>, <Ancho Sprite>, <Alto Sprite>, <X en Canvas>, <Y en Canvas>, <Ancho en Canvas>, <Alto en Canvas>);
    if(nivel.muerto){
        contexto.drawImage(sprites,67,45,44,44,sujeto.X,sujeto.Y,50,50);
    }else{
        if (sujeto.saltando) {
            contexto.drawImage(sprites,5,45,44,44,sujeto.X,sujeto.Y,50,50);
        }else{
            if (sprite==0) {
                contexto.drawImage(sprites,5,121,44,44,sujeto.X,sujeto.Y,50,50);
                sprite=1;
            } else {
                contexto.drawImage(sprites,54,121,44,44,sujeto.X,sujeto.Y,50,50);
                sprite=0;
            }
        }
    }
    
}

//Creando sujeto y animandolo
var sujeto={
    X:150,
    Y:suelo,
    velocidadY: 18,
    velocidadYMax:9,
    salto:20,
    gravedad:2,
    saltando:false
};

function saltar() {
    sujeto.saltando=true;
    sujeto.velocidadY=sujeto.salto;
}

function gravedad(){
    if(sujeto.saltando){
        sujeto.velocidadY-=sujeto.gravedad;
        sujeto.Y-=sujeto.velocidadY;
        if(sujeto.Y>suelo){
            sujeto.saltando=false;
            sujeto.velocidadY=0;
            sujeto.Y=suelo;
        }
        if (sujeto.Y<0) {
            sujeto.velocidadY-=(sujeto.gravedad*6);
            sujeto.Y=0-sujeto.gravedad;
        }
    }
}

//Creando obstaculo
function dibujaObstaculo() {
    contexto.drawImage(sprites,225,60,28,50,obstaculo.X,obstaculo.Y,50,50);
}

var obstaculo={
    X:ancho+100,
    Y:suelo

};

function logicaObstaculo() {
    if (obstaculo.X>-20) {
        obstaculo.X-=nivel.velocidad;
    } else {
        obstaculo.X=ancho+100;
        nivel.puntuacion++;
    }
}

//Creando nube
function dibujaNube() {
    contexto.drawImage(sprites,472,14,49,15,nube.X,nube.Y,50,50);
}

var nube={
    X:600,
    Y:80,
    velocidad:2
};

function logicaNube() {
    if (nube.X>-20) {
        nube.X-=nube.velocidad;
    } else {
        nube.X=ancho+100;
    }
}

//Creando suelo
function dibujaSuelo() {
    contexto.drawImage(sprites,15,273,548,18,sueloG.X,sueloG.Y,548,18);
    contexto.drawImage(sprites,15,273,548,18,sueloG.X+548,sueloG.Y,548,18);
}

var sueloG={
    X:0,
    Y:235
};

function logicaSuelo() {
    if(sueloG.X<=-396){
        sueloG.X=0;
    }else{
        sueloG.X-=nivel.velocidad;
    }
}

//Colisión
function colision() {
    if (obstaculo.X>=100 && obstaculo.X<=150) {
        if(sujeto.Y>=suelo-50){
            nivel.muerto=true;
            nivel.velocidad=0;
            nube.velocidad=0;
            nivel.puntuacion=0;
            console.log("colision");
        }
    }
}

//Creando nivel
var nivel={
    velocidad:9,
    puntuacion:0,
    muerto:false
};

//Muerte
function gameOver() {
    contexto.font="30px impact";
    contexto.fillStyle="#555555";
    contexto.fillText(`${nivel.puntuacion}`,600,50);
    if(nivel.muerto){
        contexto.font="60px impact";
        contexto.fillText("Juego Terminado",150,150);
    }
}
//Borrar canvas
function borrarCanvas() {
    canvas.width=700;
    canvas.height=300;
}

//Lectura del teclado
document.addEventListener("keydown",function(evento) {
    if(evento.keyCode == 38 || evento.keyCode == 32){
        if (nivel.muerto==false) {
            saltar();
        } else {
            nivel.velocidad=9;
            nivel.muerto=false;
            nube.velocidad=2;
            obstaculo.X=ancho+100;
            nube.X=600;
            sujeto.Y=suelo;
            saltar();
        }
    }
})
/*
    keycode flecha:
        arriba: 38
        abajo: 40
        izquierda: 37
        derecha: 39
    keycode espacio: 32
*/