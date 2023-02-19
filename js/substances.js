"use strict";

class Playground {
    arr = []
    table = document.querySelector("table");
    frameDelay = 500
    interval = null
    flowRate = 1

    constructor(height, width) {
        this.arr = Array(height).fill().map(() => Array(width).fill({substance: 'water', amount: 0}))
        this.displayPlayground()
    }

    displayPlayground() {
        this.arr.forEach(r => {
            const row = this.table.insertRow()
            r.forEach(c => {
                const cell = row.insertCell()
                cell.innerText = c.amount
            })
        })
    }

    updateValue(row, cell, value) {
        this.arr[row][cell].amount = value
        this.table.rows[row].cells[cell].innerText = value
    }

    updateSubstance(row, column, substance) {
        this.arr[row][column].substance = substance
        this.table.rows[row].cells[column].className = substance
    }

    runSimulation() {
        if (!this.interval) {
            this.interval = setInterval(() => {

                const val = this.arr[m][n].amount
                const amt = Math.min(val, this.flowRate)
                if (val > 0 && this.checkBelow(m, n)) {

                    if (amt === val) this.updateSubstance(m, n, 'none')
                    this.updateValue(m, n, val - amt)
                    const belowAmount = this.arr[m + 1][n].amount
                    if (belowAmount === 0) this.updateSubstance(m + 1, n, 'water')
                    this.updateValue(m + 1, n, belowAmount + this.flowRate)

                }

            }, this.frameDelay)
        } else {
            console.log('already running')
        }
    }

    checkBelow(row, column) {
        return (row + 1 < this.arr.length) && (this.arr[row + 1][column].amount < 100)
    }

    stopSimulation() {
        if (this.interval) {
            clearInterval(this.interval)
            this.interval = null
        }
    }

    reset() {
        a.updateValue(m, n, 20)
    }
}

let a = new Playground(10, 20)

const [m, n] = [1, 1]

a.updateValue(m, n, 20)
a.updateSubstance(m, n, 'water')