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

    cube() {
        return (this.x === this.y === this.z);
    }
}

var myPoint = new Point3D(10, 10, 10);
console.log(myPoint);

class MyArray extends Array {
    generate() {
        for (var i = 0; i < 30; i++) {
            this[i] = new Point3D();
            this[i].generate();
        }
    }

    hasCubes() {
        var number = 0;
        for (var i = 0; i < this.length; i++) {
            number = this[i].cube() ? number + 1 : number;
        }
        if (number) {
            return number
        } else {
            return false
        }
    }
}

var someArray = new MyArray();
someArray.generate();

console.log(someArray);
console.log(someArray.hasCubes());
console.log(someArray.length);
console.log(someArray[10].x);

someArray.push(myPoint);
console.log(someArray);
console.log(someArray.hasCubes());