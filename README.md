# Mathematica


## [Dijkstra's shortest path algorithm](https://rawgit.com/happyHooman/Mathematica/master/path.html )
Finds the shortest path between 2 oposite corners of a random generated array.
Adding a slightly short delay in the execution of every step helps avoid JavaScript runtime errors when finding the path in a big array (80x80 and bigger).


## [Rotate an Array](https://rawgit.com/happyHooman/Mathematica/master/rotate.html)
Rotate an array 90 degrees without creating another array.
Very useful in big arrays that when RAM space is crucial.
Below is the code.

```
function rotate2(array) {
    var swap;
    var n = array.length;
    var odd = n % 2;
    var h = Math.round(n / 2); //half length
    for (var i = 0; i < h - odd; i++) {
        for (var j = 0; j < h; j++) {
            swap = array[i][j];
            array[i][j] = array[n - 1 - j][i];
            array[n - 1 - j][i] = array[n - 1 - i][n - 1 - j];
            array[n - 1 - i][n - 1 - j] = array[j][n - 1 - i];
            array[j][n - 1 - i] = swap;
        }
    }
    return array;
}
```
Explanation will follow soon ))
