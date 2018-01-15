// Variables Globales
var pagina = "";
var menuVisible = true;
var aterrizadoPausado = true;
var modoDificil = false;
var fuelOut = false;
var gravedad = 4 * 1.622;
var dt = 0.016683;
var temporizador = null;
var temporizadorFuel = null;
var limiteVelocidad = 10;

// Variables Nave
var valorAltura = 5;
var valorVelocidad = 0;
var valorFuel = 100;
var aceleracion = gravedad;

// Variables Atajos Marcadores
var indicadorAltura = null;
var indicadorVelocidadD = null;
var indicadorVelocidadM = null;
var indicadorFuel = null;

// Variables Convertidas para Marcadores
var valorRotacion = 43;
var medidaRotacion = "rotate(" + valorRotacion + "deg)";
var medidaAltura = valorAltura + "%";
var medidaFuel = valorFuel + "%";

// Variables Atajos Colores
var naranja = "rgb(225, 75, 0)";
var azul = "rgb(0, 167, 208)";

// Eventos
window.onload = function(){
	
	// Atajos indicadores
	indicadorAltura = document.getElementById("fondoAltura");
	indicadorVelocidadD = document.getElementById("imgAguja");
	indicadorVelocidadM = document.getElementById("velM");
	indicadorFuel = document.getElementById("fondoFuel");
	
	// Botón menú
	document.getElementById("botMenu").onclick = function(){
		if (menuVisible){
			document.getElementById("menu").style.display = "none";
			document.getElementById("botMenu").src = "img/botonMenuPause.png";
			menuVisible = false;
			aterrizadoPausado = false;
			start();
		} else {
			document.getElementById("menu").style.display = "block";
			document.getElementById("botMenu").src = "img/botonMenuPlay.png";
			menuVisible = true;
			aterrizadoPausado = true;
			stop();
		}
	}
	
	// Botones de reinicio
	document.getElementById("botRestart").onclick = function(){
		restart();
	}
	document.getElementById("botResPos").onclick = function(){
		restart();
	}
	document.getElementById("botResNeg").onclick = function(){
		restart();
	}
	
	// Botones de About/Instrucciones
	document.getElementById("botAbout").onclick = function(){
		var cambiar = document.getElementById("textConfirm").innerHTML.replace("Instrucciones", "About");
		document.getElementById("textConfirm").innerHTML = cambiar;
		pagina = "about";
		document.getElementById("confirmacion").style.display = "block";
	}
	document.getElementById("botInstruc").onclick = function(){
		var cambiar = document.getElementById("textConfirm").innerHTML.replace("About", "Instrucciones");
		document.getElementById("textConfirm").innerHTML = cambiar;
		pagina = "instructions";
		document.getElementById("confirmacion").style.display = "block";
	}
	document.getElementById("botConfirm").onclick = function(){
			location.href = pagina + ".html";
	}
	document.getElementById("botCancel").onclick = function(){
		document.getElementById("confirmacion").style.display = "none";
	}
	
	// Botones de dificultad (dentro del menú)
	document.getElementById("botFacil").onclick = function(){
		modoDificil = false;
		limiteVelocidad = 10;
		document.getElementById("botFacil").style.backgroundColor = naranja;
		document.getElementById("botFacil").style.color = "white";
		document.getElementById("botDificil").style.backgroundColor = azul;
		document.getElementById("botDificil").style.color = "black";
		document.getElementById("velD").src = "img/indicadorVelocidadPcFacil.png";
		restart();
	}
	document.getElementById("botDificil").onclick = function(){
		modoDificil = true;
		limiteVelocidad = 5;
		document.getElementById("botDificil").style.backgroundColor = naranja;
		document.getElementById("botDificil").style.color = "white";
		document.getElementById("botFacil").style.backgroundColor = azul;
		document.getElementById("botFacil").style.color = "black";
		document.getElementById("velD").src = "img/indicadorVelocidadPcDificil.png";
		restart();
	}
	
	// Encender/Apagar el motor al mantener pulsada la luna (Mouse)
	document.getElementById("luna").onmousedown = motorOn;
	document.getElementById("luna").onmouseup = motorOff;
	
	// Encender/Apagar el motor al mantener pulsada la luna (Touch)
	document.getElementById("luna").oncontextmenu = function(e){
		e.preventDefault();
		e.stopPropagation();
		return false;
	}
	document.getElementById("luna").addEventListener("touchstart", function(e){
		motorOn();
	});
	document.getElementById("luna").addEventListener("touchend", function(e){
		motorOff();
	});
}

// Funciones
function recordatorioDificultad(){
	if (modoDificil == true){
		document.getElementById("difi").innerHTML = "Difícil";
	} else {
		document.getElementById("difi").innerHTML = "Fácil";
	}
	setTimeout(function(){
		document.getElementById("difi").innerHTML = "&nbsp;";
	}, 1000);
}

function start(){
	recordatorioDificultad();
	temporizador = setInterval(function(){ moverNave(); }, dt * 1000);
}

function stop(){
	clearInterval(temporizador);
}

function moverNave(){
	
	// Cambian los Valores de Velocidad y Altura
	valorVelocidad += aceleracion * dt;
	valorAltura += valorVelocidad * dt;
	
	// Se actualiza la Velocidad en Escritorio
	valorRotacion = 43 + Math.abs(valorVelocidad * 9.25);
	if (valorRotacion > 312){
		valorRotacion = 312;
	}
	medidaRotacion = "rotate(" + valorRotacion + "deg)";
	indicadorVelocidadD.style.transform = medidaRotacion;
	
	// Se actualiza la Velocidad en Movil
	if (Math.abs(valorVelocidad) <= 5){
		document.getElementById("velM").src = "img/velocidadVerde.png";
	} else if (Math.abs(valorVelocidad) <= 10){
		document.getElementById("velM").src = "img/velocidadAmarillo.png";
	} else {
		document.getElementById("velM").src = "img/velocidadRojo.png";
	}
	
	// Se actualiza la Altura
	if (valorAltura > 0){
		medidaAltura = ((97 * valorAltura)/70) + "%";
	} else {
		medidaAltura = "1%";
	}
	indicadorAltura.style.top = medidaAltura;
	
	// Aterrizar la Nave al llegar a la luna
	if (valorAltura < 70){
		document.getElementById("divCentral").style.top = valorAltura + "%";
	} else {
		if (valorVelocidad > limiteVelocidad){
			document.getElementById("nave").src = "img/coheteExplosion.png";
			var cambiar = document.getElementById("textResNeg").innerHTML.replace("xxx", Math.round(valorVelocidad));
			document.getElementById("textResNeg").innerHTML = cambiar;
			document.getElementById("resultadoNeg").style.display = "block";
		} else {
			document.getElementById("nave").src = "img/cohete.png";
			var cambiar = document.getElementById("textResPos").innerHTML.replace("xxx", Math.round(valorVelocidad));
			document.getElementById("textResPos").innerHTML = cambiar;
			document.getElementById("resultadoPos").style.display = "block";
		}
		aterrizadoPausado = true;
		stop();
	}
}

function motorOn(){
	if (aterrizadoPausado == true || fuelOut == true){
		motorOff();
	} else {
		aceleracion = -gravedad;
		if (temporizadorFuel == null){
			temporizadorFuel = setInterval(function(){ actualizarFuel(); }, 10);
			document.getElementById("nave").src = "img/coheteFuegoGif.gif";
		}
	}
}

function motorOff(){
	aceleracion = gravedad;
	clearInterval(temporizadorFuel);
	temporizadorFuel = null;
	if (aterrizadoPausado == false){
		document.getElementById("nave").src = "img/cohete.png";
	}
}

function actualizarFuel(){
	valorFuel -= 0.1;
	if (valorFuel < 0){
		valorFuel = 0;
		fuelOut = true;
		motorOff();
	}
	medidaFuel = valorFuel + "%";
	indicadorFuel.style.height = medidaFuel;
	indicadorFuel.style.width = medidaFuel;
}

function restart(){
	clearInterval(temporizador);
	// Reseteo de imágenes y variables
	document.getElementById("resultadoPos").style.display = "none";
	document.getElementById("resultadoNeg").style.display = "none";
	document.getElementById("menu").style.display = "none";
	document.getElementById("botMenu").src = "img/botonMenuPause.png";
	document.getElementById("nave").src = "img/cohete.png";
	menuVisible = false;
	aterrizadoPausado = false;
	fuelOut = false;
	temporizador = null;
	temporizadorFuel = null;
	aceleracion = gravedad;
	// Reseteo de marcadores
	valorAltura = 5;
	valorVelocidad = 0;
	if (modoDificil == true){
		valorFuel = 50;
	} else {
		valorFuel = 100;
	}
	// Actualización de marcadores
	document.getElementById("divCentral").style.top = valorAltura + "%";
	medidaAltura = ((97 * valorAltura)/70) + "%";
	indicadorAltura.style.top = medidaAltura;
	valorRotacion = 43 + Math.abs(valorVelocidad * 9.25);
	medidaRotacion = "rotate(" + valorRotacion + "deg)";
	indicadorVelocidadD.style.transform = medidaRotacion;
	document.getElementById("velM").src = "img/velocidadVerde.png";
	medidaFuel = valorFuel + "%";
	indicadorFuel.style.height = medidaFuel;
	indicadorFuel.style.width = medidaFuel;
	// Empezamos de nuevo
	start();
}