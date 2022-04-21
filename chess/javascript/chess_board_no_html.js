window.addEventListener('load', mainFunc);

let boardData = new BoardData();
let selected = [];
let isWhiteTurn = true;

//TODO: add paintBoard class? or move the other funcs to boardData too
function mainFunc() {
    const body = document.body;
    const table = document.createElement('table');
    table.setAttribute('id:', 'chess_table');

    body.appendChild(table);

    boardData.placePieces(); //adds the pieces to the array

    for (let i = 0; i < 8; i++) {
        const tr = table.insertRow(i);

        for (let j = 0; j < 8; j++) {
            const td = tr.insertCell(j);
            if(i == 0) { //(first row - a to h)
                const positionElement = document.createElement('h6');
                positionElement.innerText = String.fromCharCode(65 + j); //65 is A in ascii
                positionElement.classList.add('positionElementLetter');
                td.appendChild(positionElement);
            }
            if(j == 0) { //(first column - 1 to 8)
                const positionElement = document.createElement('h6');
                positionElement.innerText = i + 1;
                positionElement.classList.add('positionElementNumber');
                td.appendChild(positionElement);
            }
            td.onclick = (e) => {clickedTD(e, j, i)};
            if ((j + i) % 2 != 0) {
                td.className = "lightSquare"
            } else {
                td.className = "darkSquare"
            }
        }
    }

    boardData.pieces.forEach(piece => {
        table.rows[piece.y].cells[piece.x].style.backgroundImage = "url(assets/" + piece.getImg() + ".png)";
    });
}

function clickedTD(event, x, y) {
    
    let colorSelected = true;

    let lastSelectedPiece; //lastSelectedPiece
    let selectedPiece; //SelectedPiece
    for (const piece of boardData.pieces) {
        if (piece.x == selected[1] && piece.y == selected[2]) {
            lastSelectedPiece = piece;
        }
        if (piece.x == x && piece.y == y) {
            selectedPiece = piece;
        }
    }
    //try to move the piece if there was selection before 
    if (selected.length !== 0) {
        //get moves of last select
        let lastMoves = boardData.getMoves(selected[1], selected[2]);

        //check if last clicked spot wasnt empty & right turn
        if(lastMoves.length > 0 && lastSelectedPiece.isWhite === isWhiteTurn) { //check if clicked spot is a move spot
            for (let i = 0; i < lastMoves[0].length; i+=2) {
                if(lastMoves[0][i] == x && lastMoves[0][i+1] == y) {
                    boardData.movePiece(lastSelectedPiece, x, y);
                    colorSelected = false;
                }
            }

            //check if clicked spot is a eat spot
            for (let i = 0; i < lastMoves[1].length; i+=2) {
                if(lastMoves[1][i] == x && lastMoves[1][i+1] == y) {
                    boardData.eatPiece(lastSelectedPiece, selectedPiece, x, y);
                    colorSelected = false;
                }
            }

        }
        if (selectedPiece !== undefined) {
            if (selectedPiece.isWhite === isWhiteTurn) {
                finishFrame(event.currentTarget, colorSelected, x, y);
            } else {
                //repaint the whole board
                finishFrame(event.currentTarget, false, x, y);
            }
        } else { //if the currentTarget is not containing any piece
            finishFrame(event.currentTarget, colorSelected, x, y);
        }

    //if there wasnt a selection before
    } else if(selected.length === 0) {
        if (selectedPiece !== undefined) {
            if (selectedPiece.isWhite === isWhiteTurn) {
                finishFrame(event.currentTarget, true, x, y);
            } else {
                finishFrame(event.currentTarget, false, x, y);
            }
        } else { //if the currentTarget is not containing any piece
            finishFrame(event.currentTarget, true, x, y);
        }
    }
}

function finishFrame(currentTarget, paintSelected, x, y) {
    selected[0] = currentTarget;
    selected[1] = x;
    selected[2] = y;

    //repaint the whole board
    repaintBoard();

    if(paintSelected) {
        //color the current selected pixel
        currentTarget.classList.add('selected');
            
        //paint possible moves for selected piece
        showMoves(x, y);
    }

}


function repaintBoard() {
    const table = document.getElementsByTagName("table");

    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            table[0].rows[y].cells[x].classList.remove('selected');
            table[0].rows[y].cells[x].classList.remove('moveSpot');
            table[0].rows[y].cells[x].classList.remove('eatSpot');
            table[0].rows[y].cells[x].style.backgroundImage = "";
        }
    }
    boardData.pieces.forEach(piece => {
        table[0].rows[piece.y].cells[piece.x].style.backgroundImage = "url(assets/" + piece.getImg() + ".png)";
    });

}

function showMoves(x, y) {
    let posMoves = boardData.getMoves(x,y);
    const table = document.getElementsByTagName("table");
    //paint possible moves on board
    const tds = document.getElementsByTagName("td");
    if(posMoves.length > 0) {
        //possible moves
        for (let i = 0; i < posMoves[0].length; i+=2) {
            table[0].rows[posMoves[0][i + 1]].cells[posMoves[0][i]].classList.add('moveSpot');
        }
        
        // eat moves
        for (let i = 0; i < posMoves[1].length; i+=2) {
            table[0].rows[posMoves[1][i + 1]].cells[posMoves[1][i]].classList.add('eatSpot');
        }
    }
}

function changeTurn() {
    if(isWhiteTurn) {
        const turn_display = document.getElementById("turn_display");
        turn_display.innerText = "Black's Move";
        turn_display.classList.add('blackMove');
        turn_display.classList.remove('whiteMove');
    } else {
        const turn_display = document.getElementById("turn_display");
        turn_display.innerText = "White's Move";
        turn_display.classList.add('whiteMove');
        turn_display.classList.remove('blackMove');
    }
    isWhiteTurn = !isWhiteTurn;
}