function createPuzzle() {
    let puzzle = document.getElementById("puzzle");
    let table = document.createElement('table');
    
    for (let i = 0; i < 9; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < 9; j++) {
            let td = document.createElement('td');
            td.onclick = updateCounter;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    
    puzzle.appendChild(table);
}

function addSubmit() {
    let body = document.getElementsByTagName('body')[0];
    let sub = document.createElement('button');
    sub.onclick = solvePuzzle;
    sub.textContent = "Solve"
    body.appendChild(sub);
}

function updateCounter(e) {
    let cell = e.target;
    let currentNumber = parseInt(cell.textContent);
    if (currentNumber == 9) {
        cell.textContent = "";
    } else if (currentNumber) {
        cell.textContent = currentNumber + 1;
    } else {
        cell.textContent = 1;
    }
}

function extractSudoku() {

    let puzzle = document.getElementsByTagName('table')[0];
    let rows = puzzle.getElementsByTagName('tr');
    let contents = [];
    for (let i = 0; i < rows.length; i++) {
        let rowObjects = [];
        let cells  = rows[i].getElementsByTagName('td');
        for (let j = 0; j < cells.length; j++) {
            let cellNumber = parseInt(cells[j].textContent);
            let cellObject = {number: cellNumber, immutable: true, cellTarget: cells[j]};
            rowObjects.push(cellObject);
        }
        contents.push(rowObjects);      
    }
    return contents;
}



function solvePuzzle() {

    let rows = extractSudoku();
    
    let i = 0;
    while (i < rows.length) {
        let j = 0;
        while (j < rows[i].length) {
            let cell = rows[i][j];
            if (!cell.immutable) {
                let candidate = 1;
                let isValid = false;
                
                while (candidate <= 9 && validWasFound) {
                    cell.cellNumber = candidate;
                    cell.cellTarget = candidate;
                    isValid = checkValidity(rows, candidate, i, j);
                }
                if (!isValid) {
                    if (0 < j) {
                        j--;
                    } else {
                        i--;
                        break;
                    }
                }
                
                
                
            }
            
            j++;
        }
        i++;
    }
}


function checkValidity(puzzle, value, iy, ix) {
    
}




function main() {
    createPuzzle();
    addSubmit();
}


