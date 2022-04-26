window.addEventListener('load', mainFunc);

let game = new Game(true);
let boardData = game.boardData;

function mainFunc() {
    const body = document.body;
    const table = document.createElement('table');
    table.id = "chess_table";

    body.appendChild(table);

    boardData.placePieces(); //adds the pieces to the array

    //create the table
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
                td.className = "darkSquare";
            } else {
                td.className = "lightSquare";
            }
        }
    }

    game.placePictures();
}

//called when a cell(td) is clicked
function clickedTD(event, x, y) {
    
    let colorSelected = true;

    let lastSelectedPiece = boardData.getPiece(boardData.selected[1], boardData.selected[2]);
    let selectedPiece = boardData.getPiece(x, y);

    //try to move the piece if there was selection before 
    if (boardData.selected.length !== 0) {
        //get moves of last select
        let lastMoves = boardData.getMoves(boardData.selected[1], boardData.selected[2]);

        //check if last clicked spot wasnt empty & piece color == turn color
        if(lastMoves.length > 0 && lastSelectedPiece.isWhite === boardData.isWhiteTurn) { //check if clicked spot is a move spot
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
            if (selectedPiece.isWhite === boardData.isWhiteTurn) {
                game.finishFrame(event.currentTarget, colorSelected, x, y);
            } else {
                //repaint the whole board
                game.finishFrame(event.currentTarget, false, x, y);
            }
        } else { //if the currentTarget is not containing any piece
            game.finishFrame(event.currentTarget, colorSelected, x, y);
        }

    //if there wasnt a selection before
    } else if(boardData.selected.length === 0) {
        if (selectedPiece !== undefined) {
            if (selectedPiece.isWhite === boardData.isWhiteTurn) {
                game.finishFrame(event.currentTarget, true, x, y);
            } else {
                game.finishFrame(event.currentTarget, false, x, y);
            }
        } else { //if the currentTarget is not containing any piece
            game.finishFrame(event.currentTarget, true, x, y);
        }
    }
}