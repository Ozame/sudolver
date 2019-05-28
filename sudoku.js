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

function addControls() {

    //Solve button
    let body = document.getElementsByTagName('body')[0];
    let sub = document.createElement('button');
    sub.onclick = solvePuzzle;
    sub.textContent = "Solve"
    body.insertBefore(sub, document.getElementsByTagName("main")[0]);

    //Test button
    let test = document.createElement('button');
    test.onclick = createTestPuzzle;
    test.textContent = "Fill in test puzzle"
    body.insertBefore(test, document.getElementsByTagName("main")[0]);
    
}

function createTestPuzzle() {

    let puzzle1 = [
        [8, "", "", "", "", "", "", "", ""],
        ["", "", 3, 6, "", "", "", "", ""],
        ["", 7, "", "", 9, "", 2, "", ""],
        ["", 5, "", "", "", 7, "", "", ""],
        ["", "", "", "", 4, 5, 7, "", ""],
        ["", "", "", 1, "", "", "", 3, ""],
        ["", "", 1, "", "", "", "", 6, 8],
        ["", "", 8, 5, "", "", "", 1, ""],
        ["", 9, "", "", "", "", 4, "", ""]
    ]

    fillWithPuzzle(puzzle1);
}


function fillWithPuzzle(puzzleAsList) {
    let cells = document.getElementsByTagName('td');
    var arr = Array.prototype.slice.call( cells );
    for (let i = 0; i < puzzleAsList.length; i++) {
        for (let j = 0; j < puzzleAsList[i].length; j++) {
            let cell = arr.shift();
            let content = puzzleAsList[i][j];
            if (content) {cell.classList.add('immutable');}
            cell.textContent = content;

            
        }
        
    }
}


function updateCounter(e) {
    let cell = e.target;
    let currentNumber = parseInt(cell.textContent);
    cell.classList.add('immutable');
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
            let cellObject = {number: cellNumber, immutable: cellNumber ? true : false, cellTarget: cells[j]};
            rowObjects.push(cellObject);
        }
        contents.push(rowObjects);      
    }
    return contents;
}


function solvePuzzle() {

    let rows = extractSudoku();
    let justNumbers = rows.map( sub => sub.map( row => row.number));
    //testValidityCheck(justNumbers);

    let isBacktracking = false;
    let jumpedRowBack = false;
    let i = 0;
    while (i < rows.length) {
        let j = jumpedRowBack ? 8 : 0;
        jumpedRowBack = false;

        while(j < rows[i].length) {
            console.log(i + " " + j);
            let cell = rows[i][j];

            if (!cell.immutable) {
                let candidate = isBacktracking ? cell.number === NaN ? 1 : cell.number + 1 : 1;
                let isValid = false;
                while (candidate <= 9) {
                    isValid = checkValidity(justNumbers, candidate, i, j);
                    if (isValid) {
                        justNumbers[i][j] = candidate;
                        cell.number = candidate;
                        cell.cellTarget.textContent = candidate; 
                        isBacktracking = false;
                        break;
                    } else {
                        candidate++;
                    }
                }

                if (!isValid) {     // needs to backtrack
                    
                    // sets current cell to empty
                    cell.number = NaN;              
                    cell.cellTarget.textContent = "";
                    justNumbers[i][j] = NaN;
                    isBacktracking = true;

                    //Changes the indexes so that next handled cell is the previous one
                    if (0 < j) {
                        j -= 2;
                    } else if (0 < i) {
                        i -= 2;
                        jumpedRowBack = true;
                        break;
                    } else {
                        return;
                    }
                }
            } else if (cell.immutable && isBacktracking) {  // if we're backtracking, we need to skip the immutable cells
                if (0 < j) {
                    j -= 2;
                } else if (0 < i) {
                    i -= 2;
                    jumpedRowBack = true;
                    break;
                } else {
                    return;
                }
            }
           j++; 
        }
        i++;
    }
}

function testValidityCheck(rows) {

    let value = 7;
    let y = 2;
    let x = 4;
    let results = checkValidity(rows, value, y, x);
    console.log(results);
    
}


function checkValidity(rows, value, iy, ix) {
    
    //check row
    if (0 <= rows[iy].indexOf(value)) {
        return false;
    }
    //check column
    for (let i = 0; i < rows.length; i++) {
        if (rows[i][ix] === value) {
            return false;
        }    
    } 
    //check small square
    let sx = Math.floor(ix / 3);
    let sy = Math.floor(iy / 3);

    let start_x = 3 * sx;
    let start_y = 3 * sy;

    for (let i = start_y; i < start_y + 3; i++) {
        for (let j = start_x; j < start_x + 3; j++) {
            if (rows[i][j] === value) {
                return false;
            }
        }
    }
    return true;

}




function main() {
    createPuzzle();
    addControls();
    
}

