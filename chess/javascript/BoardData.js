class BoardData {
    constructor() {
        this.pieces = [];
        this.selected = [];
        this.isWhiteTurn = true;
        //maybe initialize pieces here instead of inside a func?
    }

    /** funcs that change data **/
    getPiece(x, y) {
        for (const piece of this.pieces) {
            if (piece.x == x && piece.y == y) {
                return piece;
            }
        }
        return undefined;        
    }

    removePiece(pieceToRemove) {
        this.pieces.splice(this.pieces.indexOf(pieceToRemove), 1);
    }

    eatPiece(lastSelectedPiece, selectedPiece, x, y) {
        this.removePiece(selectedPiece);
        this.movePiece(lastSelectedPiece, x, y);
    }

    movePiece(lastSelectedPiece, x, y) {
        this.changeTurn();
        lastSelectedPiece.x = x;
        lastSelectedPiece.y = y;
        lastSelectedPiece.isfirstMove = false;
    }

    getMoves(x, y) {
        let output = [];
        //get possible moves for piece
        let piece = this.getPiece(x, y);

        if(piece != undefined) {
            piece.possibleMoves(this.pieces).forEach(move => {
                output.push(move);
            });
        }
        return output;
    }

    pushPiece(x, y, p_type, isWhite, isfirstMove) {
        this.pieces.push(new c_piece(x, y, p_type, isWhite, isfirstMove));
    }

    placePieces() {
        for (let i = 0; i < 2; i++) {
            //i !== 0 is white(true) pieces so the line number would be able to be i * 7
            //purpose of i is 0 it places it in 0=y and when its 1 its y=7 cuz i*7
            for (let j = 0; j < 16; j++) {
                if(j == 0 || j == 7) {
                    this.pushPiece(j, i * 7, 2, i !== 0, true); //rook
                } else if(j == 1 || j == 6) {
                    this.pushPiece(j, i * 7, 4, i !== 0, true); //knight
                } else if(j == 2 || j == 5) {
                    this.pushPiece(j, i * 7, 3, i !== 0, true); //bishop
                } else if(j == 3) {
                    this.pushPiece(j, i * 7, 1, i !== 0, true); //queen
                } else if(j == 4) {
                    this.pushPiece(j, i * 7, 0, i !== 0, true); //king
                } else if(j > 7) {
                    this.pushPiece(j-8, i*5 + 1, 5, i !== 0, true); //pawn
                } 
            }
        }
    }
    
    changeTurn() {
        if(this.isWhiteTurn) {
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
        this.isWhiteTurn = !this.isWhiteTurn;
    }

    /** funcs that paint the board **/
    showMoves(x, y) {
        let posMoves = this.getMoves(x,y);
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

    repaintBoard() {
        const table = document.getElementsByTagName("table");

        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                table[0].rows[y].cells[x].classList.remove('selected');
                table[0].rows[y].cells[x].classList.remove('moveSpot');
                table[0].rows[y].cells[x].classList.remove('eatSpot');
                table[0].rows[y].cells[x].style.backgroundImage = "";
            }
        }

        this.placePictures();

    }

    placePictures() {
        const table = document.getElementsByTagName("table");
        this.pieces.forEach(piece => {
            table[0].rows[piece.y].cells[piece.x].style.backgroundImage = "url(assets/" + piece.getImg() + ".png)";
        });
    }

    finishFrame(currentTarget, paintSelected, x, y) {
        this.selected[0] = currentTarget;
        this.selected[1] = x;
        this.selected[2] = y;
    
        //repaint the whole board
        this.repaintBoard();
    
        if(paintSelected) {
            //color the current selected pixel
            currentTarget.classList.add('selected');
                
            //paint possible moves for selected piece
            this.showMoves(x, y);
        }
    
    }

}