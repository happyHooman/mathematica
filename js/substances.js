"use strict";

class Playground {
    arr = []
    table = document.querySelector("table");
    frameDelay = 500
    interval = null

    constructor(height, width) {
        this.arr = Array(height).fill().map(() => Array(width).fill(0))
        this.displayPlayground()
    }

    displayPlayground() {
        this.arr.forEach(r => {
            const row = this.table.insertRow()
            r.forEach(c => {
                const cell = row.insertCell()
                cell.innerText = c
            })
        })
    }

    updateValue(row, cell, value) {
        this.arr[row][cell] = value
        this.table.rows[row].cells[cell].innerText = value
    }

    changeColor(row, column, color) {
        const cell = this.table.rows[row].cells[column];
        cell.className = color
    }

    runSimulation() {
        if(!this.interval) {
            this.interval = setInterval(() => {
                const val = this.arr[9][0]
                this.updateValue(9, 0, val -1)

            }, this.frameDelay)
        } else {
            console.log('already running')
        }
    }

    stopSimulation() {
        if (this.interval) {
            clearInterval(this.interval)
            this.interval = null
        }
    }

    reset() {
        a.updateValue(9, 0, 20)
    }
}

let a = new Playground(10, 20)

a.updateValue(9, 0, 20)
a.changeColor(9, 0, 'water')