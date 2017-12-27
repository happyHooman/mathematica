"use strict";

let trail = [];
let registry = [];
let animation = true;
let n = 10;   //array size
let animationDelay = 5; //less than 5 won't be faster
let array = generateArray(n);

let delay, d1,d2;

displayArray(); //
colorMap(); //change background color of cell depending on cell value

loadRegistry(); //table used for Dijkstra's algorithm
d1 = new Date();
console.log(d1);
findPath(0, 0);

function onFinish(){ //callback to run when findPath has finished
    pickTrail();
    displayTrail();
    d2 = new Date();
    console.log(d2);
    delay = d2-d1;
    console.log(delay);

}

//todo
// 1. add all apps in one page site
// 2. add buttons to edit: animation, animation delay, arraySize
// 3. click on table to select starting and ending points






function displayArray() {
    let html = "";
    html += "<table id='myTable'>";

    for (let i = 0; i < n; i++) {
        html += "<tr>";
        for (let j = 0; j < n; j++) {
            html += "<td>" + array[i][j] + "</td>";
        }
        html += "</tr>";
    }
    html += "</table>";
    document.getElementById('container').innerHTML += html;
}

function generateArray(n) {
    let a = [];
    for (let i = 0; i < n; i++) {
        a[i] = [];
        for (let j = 0; j < n; j++) {
            a[i][j] = Math.round(Math.random() * 99);
        }
    }
    return a
}

function changeColor(row, column, color = 'trail') {
    let table = document.getElementById('myTable');
    let rows = table.getElementsByTagName('tr')[row];
    let col = rows.getElementsByTagName('td')[column];
    col.className = color;
}

function displayTrail() {
    for (let i = 0; i < trail.length; i++) {
        changeColor(trail[i][0], trail[i][1]);
    }
}

function findPath(startRow = 0, startCol = 0) {
    registry[startRow * array.length + startCol][1] = array[startRow][startCol];
    registry[startRow * array.length + startCol][2] = false;

    checkNeighbours(startRow, startCol);
}

function pickTrail(endRow = array.length - 1, endCol = array.length - 1) {
    trail.push([endRow, endCol]);

    while (registry[endRow * n + endCol][2]) {
        trail.push(registry[endRow * n + endCol][2]);
        [endRow, endCol] = registry[endRow * n + endCol][2];
    }
}

function nextPoint() {
    let distances = registry.map(m => m[3] ? Infinity : m[1]);
    let idOfMin = 0;

    if (distances.find(x => x !== Infinity)) {
        for (let i = 0; i < distances.length; i++) {
            idOfMin = distances[i] < distances[idOfMin] ? i : idOfMin;
        }
        let col = idOfMin % n;
        idOfMin -= col;
        let row = idOfMin / n;
        return [row, col];
    } else {
        return false;
    }

}

function checkNeighbours(row, col) {
    let weight = 0,
        cell, //current cell position in the registry
        next; //next cell

    if (animation) {
        changeColor(row, col, 'hill');
    }

    cell = registry[(row - 1) * n + col];
    if (row === 0 || cell[3]) {
        //no top
        // console.log('no top or visited');
    } else {
        //row-1
        // console.log('look on top');
        weight = registry[row * n + col][1] + array[row - 1][col];

        if (weight < cell[1]) {
            cell[1] = weight;
            cell.push([row, col]);
            // console.log('updated', weight);
        }

        if (animation) {
            changeColor(row - 1, col, 'plain');
        }
    }

    cell = registry[(row + 1) * n + col];
    if (row === array.length - 1 || cell[3]) {
        //no botttom
        // console.log('no bot or visited');
    } else {
        //row+1
        // console.log('look on bot');
        weight = registry[row * n + col][1] + array[row + 1][col];

        if (weight < cell[1]) {
            cell[1] = weight;
            cell.push([row, col]);
            // console.log('updated', weight);
        }

        if (animation) {
            changeColor(row + 1, col, 'plain');
        }
    }


    cell = registry[row * n + col - 1];
    if (col === 0 || cell[3]) {
        //no left
        // console.log('no left or visited');
    } else {
        //col-1
        // console.log('look left');
        weight = registry[row * n + col][1] + array[row][col - 1];

        if (weight < cell[1]) {
            cell[1] = weight;
            cell.push([row, col]);
            // console.log('updated', weight);
        }
        if (animation) {
            changeColor(row, col - 1, 'plain');
        }
    }

    cell = registry[row * n + col + 1];
    if (col === array.length - 1 || cell[3]) {
        //no right
        // console.log('no right or visited');
    } else {
        //col+1
        // console.log('look right');
        weight = registry[row * n + col][1] + array[row][col + 1];

        if (weight < cell[1]) {
            cell[1] = weight;
            cell.push([row, col]);
            // console.log('updated', weight);
        }
        if (animation) {
            changeColor(row, col + 1, 'plain');
        }
    }
    registry[row * n + col].push(true); //for visited

    next = nextPoint();
    if (next) {
        if (animation) {
            setTimeout(() => {
                // console.log('Checking cell', next);
                checkNeighbours(next[0], next[1]);
            }, animationDelay);
        } else {
            checkNeighbours(next[0], next[1]);
        }
    }else {
        onFinish();
    }
}

function colorMap() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (array[i][j] < 11) {
                changeColor(i, j, 'veryverylow');
            } else if (array[i][j] < 22) {
                changeColor(i, j, 'verylow');
            } else if (array[i][j] < 33) {
                changeColor(i, j, 'low');
            } else if (array[i][j] < 44) {
                changeColor(i, j, 'mediumlow');
            } else if (array[i][j] < 55) {
                changeColor(i, j, 'medium');
            } else if (array[i][j] < 66) {
                changeColor(i, j, 'mediumhigh');
            } else if (array[i][j] < 77) {
                changeColor(i, j, 'high');
            } else if (array[i][j] < 88) {
                changeColor(i, j, 'veryhigh');
            } else {
                changeColor(i, j, 'veryveryhigh');
            }
        }
    }
}

function loadRegistry() {
    let el = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            el.push([i, j]);
            el.push(Infinity);
            registry.push(el);
            el = [];
        }
    }
}