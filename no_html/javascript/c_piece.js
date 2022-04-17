class c_piece {
    constructor(x, y, p_type) {
        this.x = x;
        this.y = y;
        this.p_type = p_type;
    }

    getArrPos() {
        return this.y * 8 + this.x;
    }

    getImg() {
        switch (this.p_type) {
            //white pieces 0-5
            case 0:
                return "kw";
            case 1:
                return "qw";
            case 2:
                return "rw";
            case 3:
                return "bw";
            case 4:
                return "nw";
            case 5:
                return "pw";
            //black pieces 5-11
            case 6:
                return "kb";
            case 7:
                return "qb";
            case 8:
                return "rb";
            case 9:
                return "bb";
            case 10:
                return "nb";
            case 11:
                return "pb";
            default:
                console.log("p_type out of bounds");
                break;
        }
    }
}