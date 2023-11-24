// EL PESCAMINES EL JOC
// VARIABLES
let files = 0;
let columnes = 0;
let taullel = [];
let taullelInfo = [];
// FUNCIO EN LA QUE ES COMENÇA LA PARTIDA
function iniciarPartida() {
    files = parseInt(prompt("Numero de files (No pot ser menys de 10 o més de 30): "));
    columnes = parseInt(prompt("Numero de columnes (No pot ser menys de 10 o més de 30): "));

    files = Math.min(Math.max(files, 10), 30);
    columnes = Math.min(Math.max(columnes, 10), 30);

    crearTaullel();
}
// FUNCIO PER CREAR EL TAULELL (SENSE UTILITZAR EL )
function crearTaullel() {
    taullel = document.getElementById("taullel");
    let taullelHTML = "<table border='1'>";

    for (let i = 0; i < files; i++) {
        taullelHTML += "<tr>";

        for (let j = 0; j < columnes; j++) {
            taullelInfo [i * columnes * j] = {
                mina: false,
                nMinesCalculadas: 0
            };

            taullelHTML += `<td data-mina="false">`;
            taullelHTML += `<img src="fons20px.jpg" id="tapado" onclick="obreCasella(${i}, ${j})">`;
            taullelHTML += "</td>";
        }
        taullelHTML += "</tr>";
    }
    taullelHTML += "</table>";
    taullel.innerHTML = taullelHTML;

    setMines();
    calculaAdjancents(taullel);
}
// FUNCIO PER LES MINES
function setMines() {
    const casellesMines = files * columnes;
    const minesPercent = Math.floor(casellesMines * 0.17);

    for (let i = 0; i < minesPercent; i++) {
        let minesAleatories;
        do {
            minesAleatories = Math.floor(Math.random() * casellesMines);
        } while (taullelInfo[minesAleatories] && taullelInfo[minesAleatories].mina);

        if (taullelInfo[minesAleatories]) {
            taullelInfo[minesAleatories].mina = true;
        }
    }
}

//
function calculaAdjancents() {
    for (let i = 0; i < files; i++) {
        for (let j = 0; j < columnes; j++) {
            const cell = taullelInfo[i * columnes + j];

            if (cell && !cell.mina) {
                let numeroAdjancents = 0;

                for (let x = -1; x <= 1; x++) {
                    for (let y = -1; y <= 1; y++) {
                        const neighborRow = i + x;
                        const neighborCol = j + y;

                        if (
                            neighborRow >= 0 &&
                            neighborRow < files &&
                            neighborCol >= 0 &&
                            neighborCol < columnes
                        ) {
                            const neighborCell = taullelInfo[neighborRow * columnes + neighborCol];

                            if (neighborCell && neighborCell.mina) {
                                numeroAdjancents++;
                            }
                        }
                    }
                }

                setMinesAdjacents(i, j, numeroAdjancents);
            }
        }
    }
}
// FUNCIO PER A SITUAR LES CASELLES DE LES MINES
function esMina(x, y) {
    casella = document.getElementById('taullel').children[x * columnes * y];
    casella.dataset.mina === 'true';
}
// FUNCIO PER A CALCULAR DE FORMA CORRECTAMENT LES POSICIONS DE LES MINES
function setMinesAdjacents(x, y, nMinesCalculadas) {
    const cell = taullelInfo[x * columnes + y];
    if (cell) {
        cell.nMinesCalculadas = nMinesCalculadas;
    }
}
//
function obreCasella(x, y) {
    const casella = document.getElementById('taullel').children[x * columnes + y];
    const image = casella.querySelector('img');

    if (casella.getAttribute('casella-revelada') === "true" || casella.getAttribute('casella-seleccionada') === "true") {
        return;
    }

    img.src = 'fonsRevelat20px.png';
    img.onclick = null;
    casella.setAttribute('casella-revelada', 'true');

    const numeroDeMinas = parseInt(casella.getAttribute("numero-minas")) || 0;

    if (taullelInfo[x * columnes + y].mina) {
        alert("GAME OVER");
    } else {
        
    }
}
