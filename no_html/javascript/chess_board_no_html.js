window.addEventListener('load', mainFunc);

let pieces = []; //array that contains all the game pieces

function mainFunc() {
    const body = document.body;
    const table = document.createElement('table');
    table.setAttribute('id:', 'chess_table');

    body.appendChild(table);

    placePieces(); //adds the pieces to the array
    pieces.push(new c_piece(4, 1, 5, false, true)); //rook

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

function clickedTD(event, x, y) {
    //repaint the whole board
    repaintBoard();
    //color the current selected pixel
    event.currentTarget.classList.add('selected');

    //paint possible moves for selected piece
    showMoves(x, y);

}

function repaintBoard() {
    const table = document.getElementsByTagName("table");

    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            table[0].rows[y].cells[x].classList.remove('selected');
            table[0].rows[y].cells[x].classList.remove('moveSpot');
            table[0].rows[y].cells[x].classList.remove('eatSpot');
        }
    }
}

function showMoves(x, y) {
    let posMoves = [];
    const table = document.getElementsByTagName("table");
    //get possible moves for piece
    pieces.forEach(piece => {
        if (piece.x == x && piece.y == y) {
            posMoves = piece.possibleMoves(pieces);
        }
    });
    //paint possible moves on board
    const tds = document.getElementsByTagName("td");
    for (let i = 0; i < posMoves[0].length; i+=2) {
        // console.log("NOOt WOW: " + posMoves[0][i + 1] + " * 8 " + posMoves[0][i]);
        // console.log("Much WOW SUM: " + Number(posMoves[0][i + 1] * 8 + posMoves[0][i]));
        table[0].rows[posMoves[0][i + 1]].cells[posMoves[0][i]].classList.add('moveSpot');
    }

    for (let i = 0; i < posMoves[1].length; i+=2) {
        table[0].rows[posMoves[1][i + 1]].cells[posMoves[1][i]].classList.add('eatSpot');
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