class Game {

    constructor(isWhiteFirst) {
        this.boardData = new BoardData(isWhiteFirst);
    }

    /** funcs that paint the board **/
    showMoves(x, y) {
        let posMoves = this.boardData.getMoves(x,y);
        const table = document.getElementById("chess_table");
        //paint possible moves on board
        const tds = document.getElementsByTagName("td");
        if(posMoves.length > 0) {
            //possible moves
            for (let i = 0; i < posMoves[0].length; i+=2) {
                table.rows[posMoves[0][i + 1]].cells[posMoves[0][i]].classList.add('moveSpot');
            }
            
            // eat moves
            for (let i = 0; i < posMoves[1].length; i+=2) {
                table.rows[posMoves[1][i + 1]].cells[posMoves[1][i]].classList.add('eatSpot');
            }
        }
    }

    repaintBoard() {
        const table = document.getElementById("chess_table");

        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                table.rows[y].cells[x].classList.remove('selected');
                table.rows[y].cells[x].classList.remove('moveSpot');
                table.rows[y].cells[x].classList.remove('eatSpot');
                table.rows[y].cells[x].style.backgroundImage = "";
            }
        }

        this.placePictures();

    }

    placePictures() {
        const table = document.getElementById("chess_table");
        this.boardData.pieces.forEach(piece => {
            table.rows[piece.y].cells[piece.x].style.backgroundImage = "url(assets/" + piece.getImg() + ".png)";
        });
    }

    finishFrame(currentTarget, paintSelected, x, y) {
        this.boardData.selected[0] = currentTarget;
        this.boardData.selected[1] = x;
        this.boardData.selected[2] = y;
    
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