
let puzzle = document.getElementById("puzzle");

let table = document.createElement('table');
for (let i = 0; i < 9; i++) {
    let tr = document.createElement('tr');
    for (let j = 0; j < 9; j++) {
        let td = document.createElement('td');
        tr.appendChild(td);
    }
    table.appendChild(tr);
}

puzzle.appendChild(table);




