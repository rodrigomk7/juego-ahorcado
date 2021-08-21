var palabras;
var palabraPensada;
var palabraOculta;
var imagen = document.getElementById("imagenAhorcado");
var cuadroGris = document.getElementById("resultado");
var intento = 1;
var banderaInicio = false;
//
//pensarPalabra(arrNombres);
//capturarTeclas();




function comenzar() {
    //console.log("botn accion");
    var ini = document.getElementById("selec").value;
    //console.log(ini);

    if (ini != "" && banderaInicio != true) {
        document.getElementById("mensajeInicio").innerHTML = "Presiona una letra! ";

        imagen.src = "img/" + 0 + ".png";
        intento = 1;
        //  console.log("entraa");
        banderaInicio = true;
        if (ini == "Nombres") {
            pensarPalabra(Nombres);
            capturarTeclas();
        } else if (ini == "Continentes") {
            pensarPalabra(Continentes);
            capturarTeclas();
        } else if (ini == "Paises") {
            pensarPalabra(Paises);
            capturarTeclas();


        }
    }
}

function finalizar() {
    if (banderaInicio) {
        banderaInicio = false;
        dejarDeCapturar();

        document.getElementById("intentos").innerHTML = "Intentos restantes: " + 0; //intentos a 0
        setTimeout(function() { alert("Perdiste. Era: " + palabraPensada); }, 300);

        document.getElementById("selec").value = "";
        document.getElementById("mensajeInicio").innerHTML = "";

        //imagen.src = "img/" + 0 + ".png";
    }

}


function intentosRestantes() {
    document.getElementById("intentos").innerHTML = "Intentos restantes: " + (7 - intento);
}


function pensarPalabra(fuente) {

    //console.log("entra a buscar palabla:  " + fuente);

    palabras = fuente;

    //console.log(palabras[1]);

    palabraPensada = obtenerPalabra();
    palabraOculta = ocultar(palabraPensada);

    cuadroGris.innerText = palabraOculta;
}






function ejecutar(letraDelUsuario) {
    if (intento <= 6) {
        if (esta(letraDelUsuario)) {
            encontrar(letraDelUsuario);
            cuadroGris.innerText = palabraOculta;
            if (palabraOculta == palabraPensada) {
                dejarDeCapturar();
                document.getElementById("mensajeInicio").innerHTML = "";
                setTimeout(function() { alert("Ganaste !"); }, 450);
                document.getElementById("selec").value = "";

            }
        } else {
            imagen.src = "img/" + intento + ".png";
            intento++;
            if (intento == 7) {
                dejarDeCapturar();
                document.getElementById("mensajeInicio").innerHTML = "";
                setTimeout(function() { alert("Perdiste. Era: " + palabraPensada); }, 450);
                document.getElementById("selec").value = "";
            }
        }
    }
}
m



function esta(caracter) {
    for (var pos = 0; pos < palabraPensada.length; pos++) {
        if (palabraPensada.charAt(pos) == caracter) {
            return true;
        }
    }

    return false;
}




function ocultar(p) {
    return p.replace(/[A-Z]/gi, "_");
}




function encontrar(c) {
    var cadenaComoArreglo = palabraOculta.split("");

    for (var i = 0; i < cadenaComoArreglo.length; i++) {
        if (palabraPensada.charAt(i) == c) {
            cadenaComoArreglo[i] = c;
        }
    }

    palabraOculta = cadenaComoArreglo.join("");
}



function obtenerPalabra() {
    return palabras[Math.trunc(Math.random() * palabras.length)];
}




function dejarDeCapturar() {
    banderaInicio = false;
    document.body.onkeydown = null;
}



// funcion para capturrar teclas apretadas 
function capturarTeclas() {
    if (banderaInicio == true) {
        document.body.onkeydown = (
            function(evento) {
                var nroTecla = evento.which;
                if (nroTecla >= 65 && nroTecla <= 90) {
                    ejecutar(String.fromCharCode(evento.which));
                }

                evento.preventDefault();
                intentosRestantes();
            })
    }
}