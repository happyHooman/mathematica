"use strict";

let trail = [];
let registry = [];
let startTime;
let animation = false;
let n = 30;   //array size
let animationDelay = 10; //less than 5 won't be faster
let array;
let maxHeight;
const defaultColor = '#041c56';
const verticesAmount = 200;
const mountainRadius = 4;

generateArray(n);

function onFinish() { //callback to run when findPath has finished
    pickTrail();
    displayTrail();
    console.log('Time elapsed:', new Date() - startTime);
    toggleButtons('on');
}

//todo
// 1. add all apps in one page site
// 2. add buttons to edit: animation, animation delay, arraySize
// 3. click on table to select starting and ending points
// 4. show top 10 shortest paths and their length - on mouseover the length that path shall be displayed
// 5. use other path finding algorithms


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
    document.getElementById('main-content').innerHTML = html;
}

function generateArray(n) {
    const vertices = [];
    trail = [];
    registry = [];

    let a = [];
    for (let i = 0; i < n; i++) {
        a[i] = [];
        for (let j = 0; j < n; j++) {
            a[i][j] = Math.round(Math.random() * 20);
        }
    }

    for (let i = 0; i < verticesAmount; i++) {
        vertices.push(Math.round(Math.random() * n * n))
    }

    console.log(vertices)

    vertices.forEach(vertex => {
        const i = Math.trunc(vertex / n);
        const j = vertex % n;
        let height = Math.round(Math.random() * 60) + 20;
        const slope = 1 - 1 / mountainRadius;
        a[i][j] += height;
        height = Math.round(height * slope);
        let k = 1
        while (height > 10 && k < mountainRadius) {
            radius(i, j, k).forEach(c => {
                a[c[0]][c[1]] += height;
            })
            k++;
            height = Math.round(height * slope);
        }
    })

    const maxHeightArray = [];
    for (let i = 0; i < a.length; i++) {
        maxHeightArray.push(Math.max(...a[i]))
    }

    maxHeight = Math.max(...maxHeightArray) + 30;

    array = a;
    displayArray();
    colorMap();
}

function radius(cx, cy, r) {
    const cells = []
    let x = cx - r, y = cy - r;

    for (let i = 0; i < 2 * r; i++) {
        y += 1
        if (x >= 0 && y >= 0 && x < n && y < n) cells.push([x, y]);
    }
    for (let i = 0; i < 2 * r; i++) {
        x += 1
        if (x >= 0 && y >= 0 && x < n && y < n) cells.push([x, y]);
    }
    for (let i = 0; i < 2 * r; i++) {
        y -= 1
        if (x >= 0 && y >= 0 && x < n && y < n) cells.push([x, y]);
    }
    for (let i = 0; i < 2 * r; i++) {
        x -= 1
        if (x >= 0 && y >= 0 && x < n && y < n) cells.push([x, y]);
    }

    return cells
}

function changeColor(color, row, column, val) {
    let table = document.getElementById('myTable');
    let rows = table.getElementsByTagName('tr')[row];
    let col = rows.getElementsByTagName('td')[column];

    if (color === false) {
        val = val > maxHeight ? maxHeight - 1 : val;
        const ratio = val / maxHeight;

        col.style.backgroundColor = '#' +
            Math.round(255 - (255 - parseInt(defaultColor.slice(1, 3), 16)) * ratio).toString(16) +
            Math.round(255 - (255 - parseInt(defaultColor.slice(3, 5), 16)) * ratio).toString(16) +
            Math.round(255 - (255 - parseInt(defaultColor.slice(5), 16)) * ratio).toString(16);
    } else {
        col.className = color;
    }
}

function displayTrail() {
    for (let i = 0; i < trail.length; i++) {
        changeColor('trail', trail[i][0], trail[i][1]);
    }
}

function findPath(startRow = 0, startCol = 0) {
    toggleButtons('off');
    loadRegistry(); //table used for Dijkstra's algorithm
    startTime = new Date();

    registry[startRow * array.length + startCol][1] = array[startRow][startCol];
    registry[startRow * array.length + startCol][2] = false;

    checkNeighbours(startRow, startCol);
}

function toggleButtons(state) {
    const buttons = document.querySelectorAll('#dijkstra button');
    buttons.forEach(btn => {
        btn.disabled = state === 'off';
    })
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
        changeColor('hill', row, col, 'hill');
    }

    cell = registry[(row - 1) * n + col];
    if (row === 0 || cell[3]) {
    } else {
        weight = registry[row * n + col][1] + array[row - 1][col];

        if (weight < cell[1]) {
            cell[1] = weight;
            cell.push([row, col]);
        }

        if (animation) {
            changeColor('plain', row - 1, col);
        }
    }

    cell = registry[(row + 1) * n + col];
    if (row === array.length - 1 || cell[3]) {
    } else {
        weight = registry[row * n + col][1] + array[row + 1][col];

        if (weight < cell[1]) {
            cell[1] = weight;
            cell.push([row, col]);
        }

        if (animation) {
            changeColor('plain', row + 1, col);
        }
    }


    cell = registry[row * n + col - 1];
    if (col === 0 || cell[3]) {
    } else {
        weight = registry[row * n + col][1] + array[row][col - 1];

        if (weight < cell[1]) {
            cell[1] = weight;
            cell.push([row, col]);
        }
        if (animation) {
            changeColor('plain', row, col - 1);
        }
    }

    cell = registry[row * n + col + 1];
    if (col === array.length - 1 || cell[3]) {
    } else {
        weight = registry[row * n + col][1] + array[row][col + 1];

        if (weight < cell[1]) {
            cell[1] = weight;
            cell.push([row, col]);
        }
        if (animation) {
            changeColor('plain', row, col + 1);
        }
    }
    registry[row * n + col].push(true); //for visited

    next = nextPoint();
    if (next) {
        if (animation) {
            setTimeout(() => {
                checkNeighbours(next[0], next[1]);
            }, animationDelay);
        } else {
            checkNeighbours(next[0], next[1]);
        }
    } else {
        onFinish();
    }
}

function colorMap() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            changeColor(false, i, j, array[i][j]);
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