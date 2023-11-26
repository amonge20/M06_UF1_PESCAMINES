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
            taullelInfo[i * columnes + j] = {
                mina: false,
                nMinesCalculadas: 0,
                revelada: false 
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
    calculaAdjancents();
}

// FUNCIO PER LES MINES
function setMines() {
    const casellesMines = files * columnes;
    const minesPercent = Math.floor(casellesMines * 0.17);

    for (let i = 0; i < minesPercent; i++) {
        let minesAleatories;
        do {
            minesAleatories = Math.floor(Math.random() * casellesMines);
        } while (taullelInfo[minesAleatories].mina);
        taullelInfo[minesAleatories].mina = true;
    }
}
// FUNCIO PER A CALCULAR DE FORMA CORRECTAMENT LES POSICIONS DE LES MINES
function calculaAdjancents() {
    for (let i = 0; i < files; i++) {
        for (let j = 0; j < columnes; j++) {
            const cell = taullelInfo[i * columnes + j];
            
            if (!cell.mina) {
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
    return taullelInfo[x * columnes + y].mina;
}

// FUNCIO PER A CALCULAR DE FORMA CORRECTAMENT LES POSICIONS DE LES MINES
function setMinesAdjacents(x, y, nMinesCalculadas) {
    const cell = taullelInfo[x * columnes + y];
    if (cell) {
        cell.nMinesCalculadas = nMinesCalculadas;
    }
}
//FUNCIO PER A QUAN CLIQUES LA CASELLA DONCS CONTINUES O PERDS
function obreCasella(x, y) {
    const casella = taullelInfo[x * columnes + y];

    if (casella && !casella.revelada) {
        const cell = document.querySelector(`#taullel tr:nth-child(${x + 1}) td:nth-child(${y + 1})`);

        if (cell) {
            casella.revelada = true;
            const image = cell.querySelector('img');

            if (casella.mina) {
                image.src = 'mina20px.jpg';
                mostrarMinas();
            } else {
                const numeroDeMinas = casella.nMinesCalculadas;

                if (numeroDeMinas === 0) {
                    image.src = 'fonsRevelat20px.png';
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            const filaAdyacente = x + i;
                            const columnaAdyacente = y + j;

                            if (
                                filaAdyacente >= 0 &&
                                filaAdyacente < files &&
                                columnaAdyacente >= 0 &&
                                columnaAdyacente < columnes
                            ) {
                                obreCasella(filaAdyacente, columnaAdyacente);
                            }
                        }
                    }
                } else {
                    image.src = '';
                    const numeroMinasSpan = document.createElement('span');
                    numeroMinasSpan.classList.add('numeroMinas');
                    numeroMinasSpan.textContent = numeroDeMinas.toString();
                    cell.appendChild(numeroMinasSpan);
                }
            }
        }
    }
}
//QUAN CLIQUES UNA CASELLA AMB UNA MINA S'HA ACABA EL JOC I ET MOSTRA LES POSICIONES DELES MINES
function mostrarMinas() {
    for (let i = 0; i < files; i++) {
        for (let j = 0; j < columnes; j++) {
            const casella = taullelInfo[i * columnes + j];
            const cell = document.querySelector(`#taullel tr:nth-child(${i + 1}) td:nth-child(${j + 1})`);
            const image = cell.querySelector('img');

            if (casella.mina) {
                image.src = 'mina20px.jpg'; 
            }
        }
    }
}