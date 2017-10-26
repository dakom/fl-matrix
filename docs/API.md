# Fantasy-Land Matrix - API

## General concepts

The primary goal of `fl-matrix` is to provide [Fantasy-land](https://github.com/fantasyland/fantasy-land) and [Sanctuary](https://sanctuary.js.org/) compatibility for matrix composition - as well as a generic map/reduce for rolling your own transformations.

A secondary goal is specifically to ease development for webgl. For this reason, the data layout is column-major. Similarly, the `.elements` may be treated exactly as the matrices from other libraries if they are the same dimensions, and Float32Arrays may be loaded quickly into Matrix wrappers via `matrixFromElements()`

On that note - the map/reduce here are great for quick and powerful one-liners, but For faster common matrix operations, consider roundtripping data with [gl-matrix](http://glmatrix.net/) or [vec-la](https://github.com/francisrstokes/vec-la) or anything else you can feed into `matrixFromElements()`. This library intentionally does not provide utilities for common transformations like rotation, scale, translate, etc.

Every transformation returns a new copy of the class. The properties are marked read-only in Typescript though there is no deep-freezing.

`map()` and `reduce()` are not fl-compatible because they are given MatrixElements which have extra metadata like the column and row number. This is far more fun and useful than just the numbers alone in this case. For example:

```
const allOnes = emptyMatrix (3) (3).map(() => 1);
const seq = allOnes.map(el => el.index);

/* allOnes:
1 1 1
1 1 1
1 1 1
*/

/* seq: (column-major order like webgl)
0 3 6
1 4 7
2 5 8
*/
```

## Creating a matrix

1. Via functions: `emptyMatrix`, `matrixFromElements`, `identityMatrix`
2. Via class constructor: `new Matrix(nCols, nRows)` (same as emptyMatrix)

## MatrixElement

The MatrixElement interface is defined as such:
```
MatrixElement {
    value: number; //the actual value of the element
    index: number; //the index in the Matrix's elements array
    column: number; //the column index
    row: number; //the row index
}
```

## Available functions

All functions are unary and are therefore called like `foo (bar) (baz)`. For example, creating an empty Matrix of 4 columns by 3 rows is `emptyMatrix (4) (3)`

Every function is available as a generic function and, for convenience, as a method on a created Matrix object.
For the sake of brevity they are listed here in their method form

### Fantasy-land compatible transformations
* compose (fl-compatible): (other: any) => Matrix;
* concat (fl-compatible): (m2: Matrix) => Matrix;
* id (fl-compatible): () => Matrix;
* equals (fl-compatible): (m2: Matrix) => boolean;

### Non-fantasy-land functional transformations
* reduce: (fn: (m: Matrix) => (a: MatrixElement) => Matrix) => (dest: Matrix) => Matrix;
* map: (fn: (a: MatrixElement) => number) => Matrix;
* clone: () => Matrix;

### Helpers to access elements and values
* getIndexAtPosition: (c: number) => (r: number) => number;
* getElementAtPosition: (c: number) => (r: number) => MatrixElement;
* getValueAtIndex: (index: number) => number;
* getValueAtPosition: (c: number) => (r: number) => number;
* setElementAt: (c: number) => (r: number) => (val: number) => Matrix;

### Side effects
* toString: () => string;
* log: () => void;