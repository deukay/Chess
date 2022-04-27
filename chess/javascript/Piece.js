class Piece {
    constructor(x, y, p_type, isWhite, isfirstMove) {
        this.x = x;
        this.y = y;
        this.p_type = p_type;
        this.isWhite = isWhite;
        this.isfirstMove = isfirstMove;
    }

    getImg() {
        let output = "";
        switch (this.p_type) {
            //pieces type 0-5
            case 0:
                output = "k";
                break;
            case 1:
                output =  "q";
                break;
            case 2:
                output =  "r";
                break;
            case 3:
                output =  "b";
                break;
            case 4:
                output =  "n";
                break;
            case 5:
                output =  "p";
                break;
            default:
                console.log("p_type out of bounds");
                break;
        }
        if(this.isWhite) {
            return output + "w";
        } else {
            return output + "b";
        }
    }
    
    isEmpty(pieces, x, y) {
        for (const piece of pieces) {
            if(piece.x == x && piece.y == y) {
                if (piece.isWhite == this.isWhite) {
                    return 2; //same color
                }
                return 1; //other color piece
            }
        }
        return 0; //empty
    }

    pushPos(arr, x_move, y_move) {
        arr.push(this.x + x_move);
        arr.push(this.y + y_move);
    }

    detectionHandler(pieces, movesPos, eatPos, x_move, y_move) {
        switch (this.isEmpty(pieces, this.x + x_move, this.y + y_move)) {
            case 0:
                this.pushPos(movesPos, x_move, y_move);
                return false;
            case 1:
                this.pushPos(eatPos, x_move, y_move);
                return true;
            case 2:
                //nothing because its the same color
                return true;
            default:
                console.log('isEmpty out of bounds');
                return true;
        }
    }

    possibleMoves(pieces) {
        let movesPos = [];
        let eatPos = [];
        switch (this.p_type) {
            //black pieces 0-5
            case 0: //King moveset
                this.getKingPosMoves(pieces, movesPos, eatPos);
                break;
            case 1: //Queen = Rook + Bishop movesets
                this.getRookPosMoves(pieces, movesPos, eatPos);
                this.getBishopPosMoves(pieces, movesPos, eatPos);
                break;
            case 2: //Rook moveset
                this.getRookPosMoves(pieces, movesPos, eatPos);
                break;
            case 3: //Bishop moveset
                this.getBishopPosMoves(pieces, movesPos, eatPos);
                break;
            case 4: //Knight moveset
                this.getKnightPosMoves(pieces, movesPos, eatPos);
                break;
            case 5: //Pawn moveset
                this.getPawnsPosMoves(pieces, movesPos, eatPos);
                break;
            default:
                console.log("p_type out of bounds");
                break;
        }

        return [movesPos, eatPos];
    }

    getKingPosMoves(pieces, movesPos, eatPos) {
        if(this.x < 7) {//right
            this.detectionHandler(pieces, movesPos, eatPos, 1, 0);
            if(this.y < 7) {//down right
                this.detectionHandler(pieces, movesPos, eatPos, 1, 1);
            }
            if(this.y > 0) {//top right
                this.detectionHandler(pieces, movesPos, eatPos, 1, -1);
            }
        }
        if(this.x > 0) {//left
            this.detectionHandler(pieces, movesPos, eatPos, -1, 0);
            if(this.y < 7) {//down left
                this.detectionHandler(pieces, movesPos, eatPos, -1, 1);
            }
            if(this.y > 0) {//top left
                this.detectionHandler(pieces, movesPos, eatPos, -1, -1);
            }
        }
        if(this.y < 7) {//down
            this.detectionHandler(pieces, movesPos, eatPos, 0, 1);
        }
        if(this.y > 0) {//up
            this.detectionHandler(pieces, movesPos, eatPos, 0, -1);
        }
    }

    getRookPosMoves(pieces, movesPos, eatPos) {
        if(this.x < 7) { // +x (right side)
            this.getMovesInDirection(8 - this.x, 1, 0, pieces, movesPos, eatPos);
        }
        if(this.x > 0) {// -x (left side)
            this.getMovesInDirection(this.x + 1, -1, 0, pieces, movesPos, eatPos);
        }
        if(this.y < 7) { // +y (right side)
            this.getMovesInDirection(8 - this.y, 0, 1, pieces, movesPos, eatPos);
        }
        if(this.y > 0) {// -y (left side)
            this.getMovesInDirection(this.y + 1, 0, -1, pieces, movesPos, eatPos);
        }
    }

    getBishopPosMoves(pieces, movesPos, eatPos) {
        if(this.y < 7 && this.x < 7) {
            // +x +y (diag down right)
            this.getMovesInDirection(Math.min(8 - this.x, 8 - this.y), 1, 1, pieces, movesPos, eatPos);
        }
        if(this.y < 7 && this.x > 0) {
            // -x +y (diag down left)
            this.getMovesInDirection(Math.min(this.x, 8 - (this.y+1)) + 1, -1, 1, pieces, movesPos, eatPos);
        }
        if(this.y > 0 && this.x > 0) {
            // -x -y (diag up left)
            this.getMovesInDirection(Math.min(this.x, this.y) + 1, -1, -1, pieces, movesPos, eatPos);
        }
        if(this.y > 0 && this.x < 7) {
            // -x -y (diag up right)
            this.getMovesInDirection(Math.min(8 - this.x, this.y+1), 1, -1, pieces, movesPos, eatPos);
        }
    }

    getMovesInDirection(loop_length, x_multiplier, y_multiplier, pieces, movesPos, eatPos) {
        //x,y multipliers => -1 = move negative | 0 = dont move | 1 = move positive
        for (let i = 1; i < loop_length; i++) { 
            if(this.detectionHandler(pieces, movesPos, eatPos, i * x_multiplier, i * y_multiplier)) {
                break;
            } 
        }
    }

    getKnightPosMoves(pieces, movesPos, eatPos) {
        //up T
        if(this.x - 1 >= 0 && this.y - 2 >= 0)
        {
            this.detectionHandler(pieces, movesPos, eatPos, -1, -2);
        }
        if(this.x + 1 <= 7 && this.y - 2 >= 0)
        {
            this.detectionHandler(pieces, movesPos, eatPos, 1, -2);
        }
        //down T
        if(this.x - 1 >= 0 && this.y + 2 <= 7)
        {
            this.detectionHandler(pieces, movesPos, eatPos, -1, 2);
        }
        if(this.x + 1 <= 7 && this.y + 2 <= 7)
        {
            this.detectionHandler(pieces, movesPos, eatPos, 1, 2);
        }
        //right T
        if(this.x <= 5 && this.y >= 1)
        {
            this.detectionHandler(pieces, movesPos, eatPos, 2, -1);
        }
        if(this.x <= 5 && this.y <= 6)
        {
            this.detectionHandler(pieces, movesPos, eatPos, 2, 1);
        }
        //left T
        if(this.x > 1 && this.y > 0)
        {
            this.detectionHandler(pieces, movesPos, eatPos, -2, -1);
        }
        if(this.x > 1 && this.y < 7)
        {
            this.detectionHandler(pieces, movesPos, eatPos, -2, 1);
        }
    }

    getPawnsPosMoves(pieces, movesPos, eatPos) {
        if(this.isWhite) {
            if(this.y > 0) {
                //move positions
                if(this.isEmpty(pieces, this.x, this.y - 1) === 0) {
                    this.pushPos(movesPos, 0, -1);
                    if (this.y > 1 && this.isfirstMove 
                        && this.isEmpty(pieces, this.x, this.y - 2) === 0) {
                        this.pushPos(movesPos, 0, -2);
                    }
                }
                //eat positions
                if(this.x > 0) {
                    if(this.isEmpty(pieces, this.x - 1, this.y - 1) === 1) {
                        this.pushPos(eatPos, -1, -1);
                    }
                }
                if(this.x < 7) {
                    if(this.isEmpty(pieces, this.x + 1, this.y - 1) === 1) {
                        this.pushPos(eatPos, 1, -1);
                    }
                }
            }
        } else {
            if(this.y < 7) {
                //move positions
                if(this.isEmpty(pieces, this.x, this.y + 1) === 0) {
                    this.pushPos(movesPos, 0, 1);
                    if (this.y < 6 && this.isfirstMove
                        && this.isEmpty(pieces, this.x, this.y + 2) === 0) {
                            this.pushPos(movesPos, 0, 2);
                    }
                }
                //eat positions
                if(this.x > 0) {
                    if(this.isEmpty(pieces, this.x - 1, this.y + 1) === 1) {
                        this.pushPos(eatPos, -1, 1);
                    }
                }
                if(this.x < 7) {
                    if(this.isEmpty(pieces, this.x + 1, this.y + 1) === 1) {
                        this.pushPos(eatPos, 1, 1);
                    }
                }
            }
        }
    }
}