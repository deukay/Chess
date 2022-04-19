class c_piece {
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
                    return 2;
                }
                return 1;
            }
        }
        return 0;
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
            for (let i = 1; i <= 7 - this.x; i++) {
                if(this.detectionHandler(pieces, movesPos, eatPos, i, 0)) {
                    break;
                } 
            }
        }
        if(this.x > 0) {// -x (left side)
            for (let i = 1; i <= this.x; i++) {
                if(this.detectionHandler(pieces, movesPos, eatPos, -i, 0)) {
                    break;
                } 
            }
        }
        if(this.y < 7) { // +y (right side)
            for (let i = 1; i <= 7 - this.y; i++) {
                if(this.detectionHandler(pieces, movesPos, eatPos, 0, i)) {
                    break;
                } 
            }
        }
        if(this.y > 0) {// -y (left side)
            for (let i = 1; i <= this.y; i++) {
                if(this.detectionHandler(pieces, movesPos, eatPos, 0, -i)) {
                    break;
                } 
            }
        }
    }

    getBishopPosMoves(pieces, movesPos, eatPos) {
        if(this.y < 7 && this.x < 7) {
            for (let i = 1; i < Math.min(8 - this.x, 8 - this.y); i++) { // +x +y (diag down right)
                if(this.detectionHandler(pieces, movesPos, eatPos, i, i)) {
                    break;
                } 
                
            }
        }
        if(this.y < 7 && this.x > 0) {
            for (let i = 1; i <= Math.min(this.x, 8 - (this.y+1)); i++) { // -x -y (diag down left)
                if(this.detectionHandler(pieces, movesPos, eatPos, -i, i)) {
                    break;
                } 
            }
        }
        if(this.y > 0 && this.x > 0) {
            for (let i = 1; i <= Math.min(this.x, this.y); i++) { // -x -y (diag up left)
                if(this.detectionHandler(pieces, movesPos, eatPos, -i, -i)) {
                    break;
                } 
            }
        }
        if(this.y > 0 && this.x < 7) {
            for (let i = 1; i < Math.min(8 - this.x, this.y+1); i++) { // -x -y (diag up right)
                if(this.detectionHandler(pieces, movesPos, eatPos, i, -i)) {
                    break;
                } 
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
        if(this.x <= 4 && this.y >= 1)
        {
            this.detectionHandler(pieces, movesPos, eatPos, 2, -1);
        }
        if(this.x <= 4 && this.y <= 6)
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
                if (!this.detectionHandler(pieces, movesPos, eatPos, 0, -1)) {
                    if (this.y > 1 && this.isfirstMove) {
                        this.detectionHandler(pieces, movesPos, eatPos, 0, -2);
                    }
                }
            }
        } else {
            if(this.y < 7) {
                if (!this.detectionHandler(pieces, movesPos, eatPos, 0, 1)) {
                    if (this.y < 6 && this.isfirstMove) {
                        this.detectionHandler(pieces, movesPos, eatPos, 0, 2);
                    }
                }
            }
        }
    }
}