window.addEventListener('load', mainFunc);

function mainFunc() {
    //remove the .style parts from here and remove the comment from the css file to make it work without
    //the css in the js
    const body = document.body;
    const table = document.createElement('table');
    body.appendChild(table);
    table.style.outline = '5px solid black';
    table.style.outlineOffset = '-2px';
    table.style.position = 'absolute';
    table.style.top = '50%';
    table.style.left = '50%';
    table.style.transform = 'translate(-50%, -50%)';

    for (let i = 0; i < 8; i++) {
        const tr = table.insertRow();
        tr.style.display = "flex";
        for (let j = 0; j < 8; j++) {
            const td = tr.insertCell();
            td.style.display = "flex";
            td.style.height = "80px";
            td.style.width = "80px";
            if (i % 2 == 0 && j % 2 != 0) {
                td.style.backgroundColor = "#779556"; 
            } else if (i % 2 != 0 && j % 2 == 0) {
                td.style.backgroundColor = "#779556"; 
            } else {
                td.style.backgroundColor = "#ebecd0"; 
            }
        }
        
    }

}