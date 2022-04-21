class BoardData {
    constructor() {
        this.pieces = [];
        //maybe initialize pieces here instead of inside a func?
    }
    //TODO: make it so king cant move into danger zones
    //TODO: make it so king has to move when in danger
    //TODO: if king is in danger and cant move finish chess
    //TODO: if king isnt in danger but cant move stalemate
    //TOOD: add AI that chooses stuff at random?

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
        changeTurn();
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

}