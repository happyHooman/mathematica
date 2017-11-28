class Point3D {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    generate() {
        this.x = Math.round(Math.random() * 200) - 101;
        this.y = Math.round(Math.random() * 200) - 101;
        this.z = Math.round(Math.random() * 200) - 101;
    }

    isCube() {
        return this.x === this.y && this.x === this.z;
    }

    isAscendent() {
        return this.x > this.y && this.y > this.z;
    }

    distanceTo(point) {
        return Math.sqrt(Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2) + Math.pow(point.z - this.z, 2));
    }

    double() {
        this.x = this.x * 2;
        this.y = this.y * 2;
        this.z = this.z * 2;
    }
}

let myPoint = new Point3D(10, 10, 10);
console.log(myPoint);

class MyArray extends Array {
    generate() {
        for (let i = 0; i < 30; i++) {
            this[i] = new Point3D();
            this[i].generate();
        }
    }

    hasCubes() {
        return this.some(point => point.isCube());
    }

    hasAscendendPoints() {
        return this.every(point => point.isAscendent());
    }

    nearestTo(point) {
        let distance = this[0].distanceTo(point),
            idOfNearest = 0;
        for (let i = 0; i < this.length; i++) {
            if (this[i].distanceTo(point) < distance) {
                distance = this[i].distanceTo(point);
                idOfNearest = i;
            }
        }
        return this[idOfNearest];
    }

    whereXIsEven() {
        return this.filter(point => !(point.x % 2));
    }
}

let someArray = new MyArray();
someArray.generate();

console.log(someArray);
console.log(someArray.hasCubes());

someArray.push(myPoint);
console.log(someArray);
console.log(someArray.hasCubes());
console.log(someArray.hasAscendendPoints());

someArray.splice(30, 1);
console.log(someArray);

const origin = new Point3D(0, 0, 0);

console.log(someArray.nearestTo(myPoint));


console.log(someArray.nearestTo(origin));
console.log(someArray.whereXIsEven());