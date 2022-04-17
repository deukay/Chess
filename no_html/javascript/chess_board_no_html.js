window.addEventListener('load', mainFunc);

function mainFunc() {
    const body = document.body;
    const table = document.createElement('table');
    body.appendChild(table);

    pieces = []; //array that contains all the game pieces
    placePieces(); //adds the pieces to the array

    for (let i = 0; i < 8; i++) {
        const tr = table.insertRow();
        for (let j = 0; j < 8; j++) {
            const td = tr.insertCell();
            td.onclick = () => {clickedTD(td, j, i)};
            if ((j + i) % 2 != 0) {
                td.className = "lightSquare"
            } else {
                td.className = "darkSquare"
            }
        }
    }

    pieces.forEach(piece => {
        const tds = document.getElementsByTagName("td");
        tds[piece.getArrPos()].style.backgroundImage = "url(assets/" + piece.getImg() + ".png)";
    });
}

function clickedTD(td, x, y) {
    //repaint the whole board
    repaintBoard();

    //color the current selected pixel
    td.style.backgroundColor = 'orange';
    td.style.outline = "4px solid black";
    td.style.outlineOffset = "-4px";

    //paint possible moves for selected piece
    showMoves(x, y);

}

function repaintBoard() {
    const tds = document.getElementsByTagName("td");
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            if ((x + y) % 2 != 0) {
                tds[y*8 + x].style.backgroundColor = "#779556";
            } else {
                tds[y*8 + x].style.backgroundColor = "#ebecd0";
            }
            tds[y*8 + x].style.outline = "";
            tds[y*8 + x].style.outlineOffset = "";
        }
    }
}

function showMoves(x, y) {
    let posMoves = [];
    //get possible moves for piece
    pieces.forEach(piece => {
        if (piece.getArrPos() == (y*8+x)) {
            posMoves = piece.possibleMoves();
        }
    });
    //paint possible moves on board
    const tds = document.getElementsByTagName("td");
    for (let i = 0; i < posMoves.length; i+=2) {
        // console.log("NOOt WOW: " + posMoves[i + 1] + " * 8 " + posMoves[i]);
        // console.log("Much WOW SUM: " + Number(posMoves[i + 1] * 8 + posMoves[i]));
        tds[posMoves[i + 1] * 8 + posMoves[i]].style.outline = "3px dashed gold";
        tds[posMoves[i + 1] * 8 + posMoves[i]].style.outlineOffset = "-25px";
    }

}

function placePieces() {
    for (let i = 0; i < 2; i++) {
        //i !== 0 is white(true) pieces so the line number would be able to be i * 7
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
            }
            if(j > 7 && i == 0) {
                pieces.push(new c_piece(j-8, 1, 5, false, true)); //pawn black
            } else if(j > 7 && i == 1) {
                pieces.push(new c_piece(j-8, 6, 5, true, true)); //pawn white
            }
        }
    }
}