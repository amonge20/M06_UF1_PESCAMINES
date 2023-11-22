// EL PESCAMINES EL JOC
// VARIABLES
let files = 0;
let columnes = 0;
let minas = 0;
let minaPor = 17;
let taullel = [];
let celdaMina = [];
let minaIn = [];
let celdaCM = [];

// FUNCIO EN LA QUE ES COMENÇA LA PARTIDA
function iniciarPartida() {
    // DECLAREM EL NUMERO DE FILES I COLUMNES
    files = parseInt(prompt("Numero de files (No pot ser menys de 10 o més de 30): "));
    columnes = parseInt(prompt("Numero de columnes (No pot ser menys de 10 o més de 30): "));

    // SI EL NUMERO DE FILES o COLUMNES ES MENYS DE 10 o MÉS DE 30, S'IGNORA I FA 10 o 30 JUSTOS
    files = Math.min(Math.max(files, 10), 30);
    columnes = Math.min(Math.max(columnes, 10), 30);

    // TRUCA A LA FUNCIO PER CREAR EL TAULLEL
    crearTaullel();
}

// FUNCIO PER CREAR EL TAULELL
function crearTaullel() {
    // DECLAREM EL "DOM" DEL TAULELL, CREANT LA TAULA
    taullel = document.getElementById("taullel");
    let taullelHTML = "<table border='1'>";

    // PER CREAR LA TAULA, DECLAREM EL BUCLE PER LES FILES I COLUMNES
    // BUCLE PER LES FILES
    for (let i = 0; i < files; i++) {
        // COMENÇAMENT DEL TAG NAME DINS DELA TAULA
        taullelHTML += "<tr>";

        // BUCLE PER LES COLUMNES
        for (let j = 0; j < columnes; j++) {
            // PER CADA CASELLA N'HI HAURA MINES
            taullelHTML += `<td data-mina="false">`;
            taullelHTML += `<img src="fons20px.jpg" id="tapado" onclick="obreCasella(${i}, ${j})">`;
            taullelHTML += "</td>";
        }
        // FI DINS DE LA TAULA
        taullelHTML += "</tr>";
    }
    // FI DE LA TAULA
    taullelHTML += "</table>";
    taullel.innerHTML = taullelHTML;

    // TRUCA A LA FUNCIO PER LES MINES
    mines();
    // TRUCA A LA FUNCIO PER CALCULAR MINES ADJACENTS
    calculaMinas(taullel);
}

// FUNCIO PER LES MINES
function mines() {
    // DECLAREM EL TAG NAME PER LES MINES I TAMBE CALCULEM EL 17% DE LES MINES
    celdaMina = document.getElementsByTagName("td");
    minas = Math.round(celdaMina.length * minaPor / 100);

    // CONVERTIR celdaMina EN UN ARRAY
    celdaMina = Array.from(celdaMina);

    // BUCLE PER LES MINES
    while (minaIn.length < minas) {
        let ind = Math.floor(Math.random() * celdaMina.length);
        if (!minaIn.includes(ind)) {
            minaIn.push(ind);
        }
    }
    // ESTABLEIX EL NUMERO DE MINES PER INDEX
    minaIn.forEach(ind => {
        celdaMina[ind].setAttribute("data-mina", "true");
    });
}

// FUNCIO PER A RECORRE TOT EL TAULLEL I DINS DEL TAULLEL TE QUE TENIR 17% DE LES MINES 
function calculaMinas(taullel) {
    celdaCM = document.getElementsByTagName("td");

    for (let i = 0; i < celdaCM.length; i++) {
        let fila = Math.floor(i / columnes);
        let columna = i % columnes;

        // TRUCA A LA FUNCIO PER A CALCULAR DE FORMA CORRECTAMENT LES POSICIONS DE LES MINES
        setMinesAdjacents(fila, columna, 0);
    }
}

// FUNCIO PER A SITUAR LES CASELLES DE LES MINES
function esMina(x, y) {
    const casella = taullel.rows[x].cells[y];
    return casella.getAttribute("data-mina") === "true";
}

// FUNCIO PER A CALCULAR DE FORMA CORRECTAMENT LES POSICIONS DE LES MINES
function setMinesAdjacents(x, y, nMinesCalculadas) {
    // Verifica las 8 posiciones adyacentes
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const filaVecina = x + i;
            const columnaVecina = y + j;

            // Verifica si la posición está dentro del rango del tablero
            if (
                filaVecina >= 0 &&
                filaVecina < files &&
                columnaVecina >= 0 &&
                columnaVecina < columnes
            ) {
                // Incrementa el número de minas adyacentes en esa posición
                const casellaVecina = taullel.rows[filaVecina].cells[columnaVecina];
                const numMinasVecinas = parseInt(casellaVecina.getAttribute("data-num-mines")) || 0;
                casellaVecina.setAttribute("data-num-mines", numMinasVecinas + 1);
            }
        }
    }
}

function obreCasella(x,y){
    const casella = taullel.rows[x].cells[y];
    const image = casella.querySelector('img');

    if (casella.getAttribute('casella-revelada') === "true" || casella.getAttribute('casella-seleccionada') === true){
        return;
    }

    img.src = 'fonsRevelat20px.png';
    img.onclick = null;
    casella.getAttribute('casella-revelada','true');

    const numeroDeMinas = parseInt (casella.getAttribute("numero-minas")) || 0
}