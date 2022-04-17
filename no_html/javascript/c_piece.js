class c_piece {
    constructor(x, y, p_type, isWhite, isfirstMove) {
        this.x = x;
        this.y = y;
        this.p_type = p_type;
        this.isWhite = isWhite;
        this.isfirstMove = isfirstMove;
    }

    getArrPos() {
        return this.y * 8 + this.x;
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

    possibleMoves() {
        let movesPos = [];
        switch (this.p_type) {
            //black pieces 0-5
            case 0: //King moveset
                if(this.x < 7) {//right
                    movesPos.push(this.x + 1);
                    movesPos.push(this.y);
                    if(this.y < 7) {//down right
                        movesPos.push(this.x + 1);
                        movesPos.push(this.y + 1);
                    }
                    if(this.y > 0) {//top right
                        movesPos.push(this.x + 1);
                        movesPos.push(this.y - 1);
                    }
                }
                if(this.x > 0) {//left
                    movesPos.push(this.x - 1);
                    movesPos.push(this.y);
                    if(this.y < 7) {//down left
                        movesPos.push(this.x - 1);
                        movesPos.push(this.y + 1);
                    }
                    if(this.y > 0) {//top left
                        movesPos.push(this.x - 1);
                        movesPos.push(this.y - 1);
                    }
                }
                if(this.y < 7) {//down
                    movesPos.push(this.x);
                    movesPos.push(this.y + 1);
                }
                if(this.y > 0) {//up
                    movesPos.push(this.x);
                    movesPos.push(this.y - 1);
                }
                break;
            case 1: //Queen = Rook + Bishop movesets
                //TODO: maybe change the queen switch so it will call the func again instead
                //Rook move set
                if(this.x < 7) { // +x (right side)
                    for (let i = 1; i <= 7 - this.x; i++) {
                        movesPos.push(this.x + i);
                        movesPos.push(this.y);
                    }
                }
                if(this.x > 0) {// -x (left side)
                    for (let i = 1; i <= this.x; i++) {
                        movesPos.push(this.x - i);
                        movesPos.push(this.y);
                    }
                }
                if(this.y < 7) { // +y (right side)
                    for (let i = 1; i <= 7 - this.y; i++) {
                        movesPos.push(this.x);
                        movesPos.push(this.y + i);
                    }
                }
                if(this.y > 0) {// -y (left side)
                    for (let i = 1; i <= this.y; i++) {
                        movesPos.push(this.x);
                        movesPos.push(this.y - i);
                    }
                }
                //Bishop moveset
                if(this.y < 7 && this.x < 7) {
                    for (let i = 1; i < Math.min(8 - this.x, 8 - this.y); i++) { // +x +y (diag down right)
                        movesPos.push(this.x + i);
                        movesPos.push(this.y + i);
                    }
                }
                if(this.y < 7 && this.x > 0) {
                    for (let i = 1; i <= Math.min(this.x, 8 - (this.y+1)); i++) { // -x -y (diag down left)
                        movesPos.push(this.x - i);
                        movesPos.push(this.y + i);
                    }
                }
                if(this.y > 0 && this.x > 0) {
                    for (let i = 1; i <= Math.min(this.x, this.y); i++) { // -x -y (diag up left)
                        movesPos.push(this.x - i);
                        movesPos.push(this.y - i);
                    }
                }
                if(this.y > 0 && this.x < 7) {
                    for (let i = 1; i < Math.min(8 - this.x, this.y+1); i++) { // -x -y (diag up right)
                        movesPos.push(this.x + i);
                        movesPos.push(this.y - i);
                    }
                }
                break;
            case 2: //Rook moveset
                if(this.x < 7) { // +x (right side)
                    for (let i = 1; i <= 7 - this.x; i++) {
                        movesPos.push(this.x + i);
                        movesPos.push(this.y);
                    }
                }
                if(this.x > 0) {// -x (left side)
                    for (let i = 1; i <= this.x; i++) {
                        movesPos.push(this.x - i);
                        movesPos.push(this.y);
                    }
                }
                if(this.y < 7) { // +y (right side)
                    for (let i = 1; i <= 7 - this.y; i++) {
                        movesPos.push(this.x);
                        movesPos.push(this.y + i);
                    }
                }
                if(this.y > 0) {// -y (left side)
                    for (let i = 1; i <= this.y; i++) {
                        movesPos.push(this.x);
                        movesPos.push(this.y - i);
                    }
                }
                break
            case 3: //Bishop moveset
                if(this.y < 7 && this.x < 7) {
                    for (let i = 1; i < Math.min(8 - this.x, 8 - this.y); i++) { // +x +y (diag down right)
                        movesPos.push(this.x + i);
                        movesPos.push(this.y + i);
                    }
                }
                if(this.y < 7 && this.x > 0) {
                    for (let i = 1; i <= Math.min(this.x, 8 - (this.y+1)); i++) { // -x -y (diag down left)
                        movesPos.push(this.x - i);
                        movesPos.push(this.y + i);
                    }
                }
                if(this.y > 0 && this.x > 0) {
                    for (let i = 1; i <= Math.min(this.x, this.y); i++) { // -x -y (diag up left)
                        movesPos.push(this.x - i);
                        movesPos.push(this.y - i);
                    }
                }
                if(this.y > 0 && this.x < 7) {
                    for (let i = 1; i < Math.min(8 - this.x, this.y+1); i++) { // -x -y (diag up right)
                        movesPos.push(this.x + i);
                        movesPos.push(this.y - i);
                    }
                }
                break;
            case 4: //Knight moveset
                if(this.x - 1 >= 0 && this.y - 2 >= 0)
                {
                    movesPos.push(this.x - 1);
                    movesPos.push(this.y - 2);
                }
                if(this.x + 1 <= 8 && this.y - 2 >= 0)
                {
                    movesPos.push(this.x + 1);
                    movesPos.push(this.y - 2);
                }
                if(this.x - 1 >= 0 && this.y + 2 <= 8)
                {
                    movesPos.push(this.x - 1);
                    movesPos.push(this.y + 2);
                }
                if(this.x + 1 <= 8 && this.y + 2 <= 8)
                {
                    movesPos.push(this.x + 1);
                    movesPos.push(this.y + 2);
                }
                break;
            case 5: //Pawn moveset
                if(this.isWhite) {
                    movesPos.push(this.x);
                    movesPos.push(this.y - 1);
                    if(this.isfirstMove) {
                        movesPos.push(this.x);
                        movesPos.push(this.y - 2);
                    }
                } else {
                    movesPos.push(this.x);
                    movesPos.push(this.y + 1);
                    if(this.isfirstMove) {
                        movesPos.push(this.x);
                        movesPos.push(this.y + 2);
                    }
                }
                break;
            default:
                console.log("p_type out of bounds");
                break;
        }

        return movesPos;
    }
}