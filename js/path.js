"use strict";

let drum = [];
let registru = [];

function displayArray(title = 'title') {
    let n = array.length;
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
    for (let i = 0; i < drum.length; i++) {
        changeColor(drum[i][0], drum[i][1]);
    }
}

function findPath() {
    drum.push([0, 0]); //starting point
    let weight = array[0][0];
    registru[0][1] = weight;
    // console.log(weight);
    chechNeighbours(0, 0);
}

function chechNeighbours(row, col) {
    let n = array.length;
    if (row === 0) {
        //no top
    } else {
        //row-1
        registru[(row - 1) * n + col][1] = registru[row * n + col][1] + array[row - 1][col];
        registru[(row - 1) * n + col].push([row, col]);
    }

    if (row === array.length - 1) {
        //no botttom
    } else {
        //row+1
        registru[(row + 1) * n + col][1] = registru[row * n + col][1] + array[row + 1][col];
        registru[(row + 1) * n + col].push([row, col]);
    }

    if (col === 0) {
        //no left
    } else {
        //col-1
        registru[row * n + col - 1][1] = registru[row * n + col][1] + array[row][col - 1];
        registru[row * n + col - 1].push([row,col]);
    }

    if (col === array.length - 1) {
        //no right
    } else {
        //col+1
        registru[row * n + col + 1][1] = registru[row * n + col][1] + array[row][col + 1];
        registru[row * n + col + 1].push([row,col]);
    }
}


function colorMap() {
    let n = array.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (array[i][j] < 25) {
                changeColor(i, j, 'plane');
            } else if (array[i][j] < 50) {
                changeColor(i, j, 'hill');
            } else if (array[i][j] < 75) {
                changeColor(i, j, 'mountain');
            } else {
                changeColor(i, j, 'highMountain');
            }
        }
    }
}

function loadRegistry() {
    let n = array.length;
    let el = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            el.push([i, j]);
            el.push(Infinity);
            registru.push(el);
            el = [];
        }
    }
}

let array = generateArray(3);
displayArray();
colorMap();

loadRegistry();
console.log(registru);
findPath();
displayTrail();


// algorithm
// create arrays of visited and unvisited points
// 1. visit starting point
// 2. calculate distance all unvisited neighbours
// 3. if the distance to the neighbour is less than the saved one, then update the distance and last point
//
//
//
//

















