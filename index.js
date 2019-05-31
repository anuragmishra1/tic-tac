/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

const GRID_LENGTH = 3;
let grid = [];
let turn = 'X';

function initializeGrid() {
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';

    for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum % 2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if (gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="' + colIdx + '" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function computerTurn() {
    const indexes = [];
    for (let i = 0; i < GRID_LENGTH; i++) {
        for (let j = 0; j < GRID_LENGTH; j++) {
            if (grid[i][j] === 0) {
                indexes.push({ col: i, row: j });
            }
        }
    }
    if (indexes.length > 0) {
        const index = Math.floor(Math.random() * indexes.length);
        grid[indexes[index].col][indexes[index].row] = 2;
    } else {
        const winnerElement = document.getElementById("winner");
        winnerElement.innerHTML = '<p> MATCH DRAW! </p>';
        winnerElement.style.display = 'block';
    }
}

function checkWinner() {
    for (let i = 0; i < GRID_LENGTH; i++) {
        let rowSum = 0;
        rowSum = grid[i][0] && grid[i][0] !== 0 ? rowSum + grid[i][0] : 0;
        rowSum = grid[i][1] && grid[i][1] !== 0 && rowSum !== 0 ? rowSum + grid[i][1] : 0;
        rowSum = grid[i][2] && grid[i][2] !== 0 && rowSum !== 0 ? rowSum + grid[i][2] : 0;

        let colSum = 0;
        colSum = grid[0][i] && grid[0][i] !== 0 ? colSum + grid[0][i] : 0;
        colSum = grid[1][i] && grid[1][i] !== 0 && colSum !== 0 ? colSum + grid[1][i] : 0;
        colSum = grid[2][i] && grid[2][i] !== 0 && colSum !== 0 ? colSum + grid[2][i] : 0;
        if (colSum === 3 || rowSum === 3) {
            const winnerElement = document.getElementById("winner");
            winnerElement.innerHTML = '<p> YOU WIN! </p>';
            winnerElement.style.display = 'block';
            return true;
        }
        if (colSum === 6 || rowSum === 6) {
            const winnerElement = document.getElementById("winner");
            winnerElement.innerHTML = '<p> COMPUTER WINS! </p>';
            winnerElement.style.display = 'block';
            return true;
        }
    }

    let crossSumRight = 0;
    crossSumRight = grid[0][0] && grid[0][0] !== 0 ? crossSumRight + grid[0][0] : 0;
    crossSumRight = grid[1][1] && grid[1][1] !== 0 && crossSumRight !== 0 ? crossSumRight + grid[1][1] : 0;
    crossSumRight = grid[2][2] && grid[2][2] !== 0 && crossSumRight !== 0 ? crossSumRight + grid[2][2] : 0;

    let crossSumLeft = 0;
    crossSumLeft = grid[0][2] && grid[0][2] !== 0 ? crossSumLeft + grid[0][2] : 0;
    crossSumLeft = grid[1][1] && grid[1][1] !== 0 && crossSumLeft !== 0 ? crossSumLeft + grid[1][1] : 0;
    crossSumLeft = grid[2][0] && grid[2][0] !== 0 && crossSumLeft !== 0 ? crossSumLeft + grid[2][0] : 0;

    if (crossSumRight === 3 || crossSumLeft === 3) {
        const winnerElement = document.getElementById("winner");
        winnerElement.innerHTML = '<p> YOU WIN! </p>';
        winnerElement.style.display = 'block';
        return true;
    }

    if (crossSumRight === 6 || crossSumLeft === 6) {
        const winnerElement = document.getElementById("winner");
        winnerElement.innerHTML = '<p> COMPUTER WINS! </p>';
        winnerElement.style.display = 'block';
        return true;
    }

    return false;
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = 1;
    grid[colIdx][rowIdx] = newValue;
    renderMainGrid();
    if (checkWinner()) return;
    setTimeout(() => {
        computerTurn();
        renderMainGrid();
        if (checkWinner()) return;
        addClickHandlers();
    }, 200);
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

function restart() {
    grid = [];
    document.getElementById("winner").style.display = 'none';
    initializeGrid();
    renderMainGrid();
    addClickHandlers();
}

restart();
