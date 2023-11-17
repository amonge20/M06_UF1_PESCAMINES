//EL PESCAMINES EL JOC
//VARIABLES
let files = 0;
let columnes = 0;
let taullel = [];
let mines = 0;
//FUNCIO EN LA QUE ES COMENÇA LA PARTIDA
function iniciarPartida(){
    //DECLAREM EL NUMERO DE FILES I COLUMNES
    files = parseInt = prompt("Numero de files (No pot ser menys de 10 o més de 30): ");
    columnes = parseInt = prompt("Numero de columnes (No pot ser menys de 10 o més de 30): ");

    if (files < 10 || files > 30 || columnes < 10 || columnes > 30){
        alert("Numero de files i columnes es menys de 10 o més de 30. FIN DEL PROGRAMA");
    } else {
        crearTaullel();
    }
}

// FUNCIO PER CREAR EL TAULELL
function crearTaullel() {
    // DECLAREM EL "DOM" DEL TAULELL
    taullel = document.getElementById("taullel");
    let taullelHTML = "<table border='1'>";

    // PER CREAR LA TAULA, DECLAREM EL BUCLE PER LES FILES I COLUMNES
    // BUCLE PER LES FILES
    for (let i = 0; i < files; i++) {
        taullelHTML += "<tr>";

        // BUCLE PER LES COLUMNES
        for (let j = 0; j < columnes; j++) {
            taullelHTML += `<td data-mina="false">`;
            taullelHTML += `<img src="fons20px.jpg" id="tapado" onclick="obreCasella(${i}, ${j})">`;
            taullelHTML += "</td>";
        }
        taullelHTML += "</tr>";
    }
    taullelHTML += "</table>";
    taullel.innerHTML = taullelHTML;
}

//function minas(){}