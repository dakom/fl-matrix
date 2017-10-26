# Fantasy-Land Matrix - API

## General concepts

The primary goal of `fl-matrix` is to provide [Fantasy-land](https://github.com/fantasyland/fantasy-land) and [Sanctuary](https://sanctuary.js.org/) compatibility for matrix composition - as well as a generic map/reduce for rolling your own transformations.

For example:
```
const scaleBy = m => n => 
  S.compose
  (
    m.map(el => el.column === el.row ? n : 0),
    m
  );

const myIdentity = identityMatrix (3) (3)

scaleBy (myIdentity) (4).log();

/*
4 0 0
0 4 0
0 0 4
*/
```

A secondary goal is specifically to ease development for webgl. For this reason, the data layout is column-major. The `.elements` may be treated exactly as the matrices from other libraries if they are the same dimensions, and Float32Arrays may be loaded quickly into Matrix wrappers via `matrixFromElements()`

On that note - the map/reduce here are great for fun and powerful one-liners, but for faster common matrix operations, consider roundtripping data with [gl-matrix](http://glmatrix.net/) or [vec-la](https://github.com/francisrstokes/vec-la) or anything else you can feed into `matrixFromElements()`. This library intentionally does not provide utilities for common transformations like rotation, scale, translate, etc.

Every transformation returns a new copy of the class. The properties are marked read-only in Typescript though there is no deep-freezing.

The reason `map()` and `reduce()` are not fl-compatible is because they are given MatrixElements which have extra metadata like the column and row number. This is far more fun and useful than just the numbers alone in this case. For example:

```
const allOnes = emptyMatrix (3) (3).map(() => 1);
const seq = allOnes.map(el => el.index);
const seqId = seq.map(el => el.column === el.row ? 1 : 0);

// allOnes:
1 1 1
1 1 1
1 1 1

// seq:
0 3 6
1 4 7
2 5 8

//seqId:
1 0 0
0 1 0
0 0 1
```


## Typescript

The library is written in Typescript and all the definitions are exported.

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

### Top-level
* **emptyMatrix** :: (nCols: number) => (nRows: number) => Matrix;
  * Create an empty matrix
* **matrixFromElements** :: (nCols: number) => (nRows: number) => (elements: Float32Array) => Matrix;
  * Create a matrix from data
* **identityMatrix** : (nCols: number) => (nRows: number) => Matrix;
  * Create an identity matrix


The following functions are available as a generic function and, for convenience, as a method on a created Matrix object.

For the sake of brevity they are listed here only in their method form:

### Fantasy-land compatible transformations
* **compose** :: (other: any) => Matrix;
  * Multiplies this matrix by the other
* **concat** :: (m2: Matrix) => Matrix;
  * Adds the other to this matrix
* **id** :: () => Matrix;
  * Generates an identity matrix with the same dimensions
* **equals** :: (m2: Matrix) => boolean;
  * Returns whether the two matrices are equal

### Non-fantasy-land functional transformations
* **reduce** :: (fn: (m: Matrix) => (a: MatrixElement) => Matrix) => (dest: Matrix) => Matrix;
  * Maps over all the elements to return a new Matrix of any kind
  * Expects a MatrixElements->Matrix function to convert matrices
* **map** :: (fn: (a: MatrixElement) => number) => Matrix;
  * Maps over all the elements to return a new Matrix of the same dimensions
  * Expects a MatrixElements->number function to convert matrices
* **clone** :: () => Matrix;
  * Clones the data and the shape

### Helpers to access elements and values
* **getIndexAtPosition** :: (c: number) => (r: number) => number;
  * Returns the index in the `elements` based on the column/row position
* **getElementAtPosition** :: (c: number) => (r: number) => MatrixElement;
  * Returns the MatrixElement at a given column/row position
* **getValueAtIndex** :: (index: number) => number;
  * Returns a value at a given index in the `elements`
* **getValueAtPosition** :: (c: number) => (r: number) => number;
  * Returns a value at a given column/row position
* **setElementAtPosition** :: (c: number) => (r: number) => (val: number) => Matrix;
  * Sets the value of the element at a given column/row position

### Side effects
* **toString** :: () => string;
* **log** :: () => void;
* **elements[n]** :: the elements property itself is not frozen and may be changed directly