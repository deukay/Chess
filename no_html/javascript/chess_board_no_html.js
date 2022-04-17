window.addEventListener('load', mainFunc);

function mainFunc() {
    const body = document.body;
    const table = document.createElement('table');
    body.appendChild(table);

    pieces = []; //array that contains all the game pieces
    placePieces(); //adds the pieces to the array
    selected = [0, 0]; //reserved for selected td

    for (let i = 0; i < 8; i++) {
        const tr = table.insertRow();
        for (let j = 0; j < 8; j++) {
            const td = tr.insertCell();
            td.onclick = () => {clickedTD(td, i, j)};
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

function clickedTD(td, y, x) {
    //color the last selected pixel
    const tds = document.getElementsByTagName("td");
    if ((selected[0] + selected[1]) % 2 != 0) {
        tds[selected[1]*8 + selected[0]].style.backgroundColor = "#779556";
    } else {
        tds[selected[1]*8 + selected[0]].style.backgroundColor = "#ebecd0";
    }
    tds[selected[1]*8 + selected[0]].style.outline = "";
    tds[selected[1]*8 + selected[0]].style.outlineOffset = "";
    //color the current selected pixel
    selected = [x, y];
    td.style.backgroundColor = 'orange';
    td.style.outline = "4px solid black";
    td.style.outlineOffset = "-4px";

    //td.style.opacity = '0.7';
}

function placePieces() {
    //black pieces
    for (let i = 0; i < 16; i++) {
        if(i == 0 || i == 7) {
            pieces.push(new c_piece(i, 0, 8)); //rb
        } else if(i == 1 || i == 6) {
            pieces.push(new c_piece(i, 0, 10)); //nb
        } else if(i == 2 || i == 5) {
            pieces.push(new c_piece(i, 0, 9)); //bb
        } else if(i == 3) {
            pieces.push(new c_piece(i, 0, 7)); //qb
        } else if(i == 4) {
            pieces.push(new c_piece(i, 0, 6)); //kb
        }
        if(i > 7) {
            pieces.push(new c_piece(i-8, 1, 11)); //pb
        }
    }

    //white pieces
    for (let i = 0; i < 16; i++) {
        if(i == 0 || i == 7) {
            pieces.push(new c_piece(i, 7, 2)); //rw
        } else if(i == 1 || i == 6) {
            pieces.push(new c_piece(i, 7, 4)); //nw
        } else if(i == 2 || i == 5) {
            pieces.push(new c_piece(i, 7, 3)); //bw
        } else if(i == 3) {
            pieces.push(new c_piece(i, 7, 1)); //qw
        } else if(i == 4) {
            pieces.push(new c_piece(i, 7, 0)); //kw
        }
        if(i > 7) {
            pieces.push(new c_piece(i-8, 6, 5)); //pw
        }
    }
}