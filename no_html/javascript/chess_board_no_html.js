window.addEventListener('load', mainFunc);

let pieces = []; //array that contains all the game pieces
let selected = [];
let isWhiteTurn = true;

function mainFunc() {
    const body = document.body;
    const table = document.createElement('table');
    table.setAttribute('id:', 'chess_table');

    body.appendChild(table);

    placePieces(); //adds the pieces to the array
    // pieces.push(new c_piece(4, 5, 5, false, true)); //rook

    for (let i = 0; i < 8; i++) {
        const tr = table.insertRow(i);
        for (let j = 0; j < 8; j++) {
            const td = tr.insertCell(j);
            td.onclick = (e) => {clickedTD(e, j, i)};
            if ((j + i) % 2 != 0) {
                td.className = "lightSquare"
            } else {
                td.className = "darkSquare"
            }
        }
    }

    pieces.forEach(piece => {
        table.rows[piece.y].cells[piece.x].style.backgroundImage = "url(assets/" + piece.getImg() + ".png)";
    });
}

function movePiece(x, y) {
    isWhiteTurn = !isWhiteTurn;
    for (const piece of pieces) {
        if (piece.x == selected[1] && piece.y == selected[2]) {
            piece.x = x;
            piece.y = y;
            return false;
        }
    }
}

function eatPiece(x, y) {
    isWhiteTurn = !isWhiteTurn;
    for (const piece of pieces) {
        if (piece.x == x && piece.y == y) {
            console.log(pieces);
            pieces.splice(pieces.indexOf(piece), 1);
        }
        if (piece.x == selected[1] && piece.y == selected[2]) {
            piece.x = x;
            piece.y = y;
            return false;
        }
    }
}

function clickedTD(event, x, y) {
    
    let colorSelected = true;
    //try to move the piece
    if (selected.length !== 0 && selected[0] !== event.currentTarget) {
        //get moves of last select
        let lastMoves = getMoves(selected[1], selected[2]);

        //check if last clicked spot wasnt empty
        if(lastMoves.length > 0) {//check if clicked spot is a move spot
            for (let i = 0; i < lastMoves[0].length; i+=2) {
                if(lastMoves[0][i] == x && lastMoves[0][i+1] == y) {
                    colorSelected = movePiece(x, y);
                }
            }

            //check if clicked spot is a eat spot
            for (let i = 0; i < lastMoves[1].length; i+=2) {
                if(lastMoves[1][i] == x && lastMoves[1][i+1] == y) {
                    colorSelected = eatPiece(x, y);
                }
            }

        }
        //repaint the whole board
        repaintBoard();

        selected[0] = event.currentTarget;
        selected[1] = x;
        selected[2] = y;
        if(colorSelected) {
            //color the current selected pixel
            selected[0].classList.add('selected');
        
            //paint possible moves for selected piece
            showMoves(x, y);
        }

    //if there wasnt a selection before
    } else if(selected.length === 0) {
        selected[0] = event.currentTarget;
        selected[1] = x;
        selected[2] = y;

        //color the current selected pixel
        selected[0].classList.add('selected');
        
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
    pieces.forEach(piece => {
        table[0].rows[piece.y].cells[piece.x].style.backgroundImage = "url(assets/" + piece.getImg() + ".png)";
    });

}

function getMoves(x,y) {
    let output = [];
    //get possible moves for piece
    pieces.forEach(piece => {
        if (piece.x == x && piece.y == y) {
            piece.possibleMoves(pieces).forEach(move => {
                output.push(move);
            });
        }
    });
    return output;
}

function showMoves(x, y) {
    let posMoves = getMoves(x,y);
    const table = document.getElementsByTagName("table");
    //paint possible moves on board
    const tds = document.getElementsByTagName("td");
    if(posMoves.length > 0) {
        for (let i = 0; i < posMoves[0].length; i+=2) {
            table[0].rows[posMoves[0][i + 1]].cells[posMoves[0][i]].classList.add('moveSpot');
        }
    
        for (let i = 0; i < posMoves[1].length; i+=2) {
            table[0].rows[posMoves[1][i + 1]].cells[posMoves[1][i]].classList.add('eatSpot');
        }
    }
}

function placePieces() {
    for (let i = 0; i < 2; i++) {
        //i !== 0 is white(true) pieces so the line number would be able to be i * 7
        //purpose of i is 0 it places it in 0=y and when its 1 its y=7 cuz i*7
        for (let j = 0; j < 16; j++) {
            if(j == 0 || j == 7) {
                pieces.push(new c_piece(j, i * 7, 2, i !== 0, true)); //rook
            } else if(j == 1 || j == 6) {
                pieces.push(new c_piece(j, i * 7, 4, i !== 0, true)); //knight
            } else if(j == 2 || j == 5) {
                pieces.push(new c_piece(j, i * 7, 3, i !== 0, true)); //bishop
            } else if(j == 3) {
                pieces.push(new c_piece(j, i * 7, 1, i !== 0, true)); //queen
            } else if(j == 4) {
                pieces.push(new c_piece(j, i * 7, 0, i !== 0, true)); //king
            } else if(j > 7) {
                pieces.push(new c_piece(j-8, i*5 + 1, 5, i !== 0, true)); //pawn
            } 
        }
    }
}