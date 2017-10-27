# Fantasy-Land Matrix - API

## General concepts

The primary goal of `fl-matrix` is to provide [Fantasy-land](https://github.com/fantasyland/fantasy-land) and [Sanctuary](https://sanctuary.js.org/) compatibility for matrix composition - as well as a generic map/reduce for rolling your own transformations.

For example:
```
// Compose a generic scaling function
const scaleBy = m => n => 
S.compose
(
  m.map(el => el.column === el.row ? n : 0),
  m,
);

// Create a matrix of some predefined data
const myData = matrixFromElements (3) (3) ([0,1,2, 3,4,5, 6,7,8])

// Scale it
const scaledData = scaleBy (myData) (2);

// View Results: (via myData.log() and scaledData.log())
// 0 3 6       00 06 12
// 1 4 7  -->  02 08 14
// 2 5 8       04 10 16

```

A secondary goal is specifically to ease development for webgl. For this reason, the data layout is column-major. The `.elements` may be treated exactly as the matrices from other libraries if they are the same dimensions, and Float32Arrays may be loaded quickly into Matrix wrappers via `matrixFromElements() or matrixFromElementsDirect()`

On that note - the map/reduce here are great for fun and powerful one-liners, but for faster common matrix operations, consider roundtripping data with [gl-matrix](http://glmatrix.net/) or [vec-la](https://github.com/francisrstokes/vec-la) or anything else you use to generate a column-major Float32Array. This library intentionally does not provide utilities for common transformations like rotation, scale, translate, etc.

In terms of immutability - every transformation returns a new copy of the class and the properties are marked read-only in Typescript. However, there is no deep-freezing and it's the responsibility of the caller to deal with `.elements` however they see fit. Additionally, for the sake of efficiency, several functions have a "preAllocated" version which allow compromising functional purity for the sake of lower memory footprint and saving gc cycles.

The reason `map()` and `reduce()` are not fl-compatible, however, is not due to that reason (e.g. they _are_ pure), but rather because they are given MatrixElements which have extra metadata like the column and row number. This is far more fun and useful than just the numbers alone in this case. For example:

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

## Vectors

Vectors are nothing more than 1-column matrices, however they are very commonly used and it's helpful to have some easy abstractions like v.a, v.w, etc. so a helper class and some functions are provided to make this more convenient.

# API

## MatrixElement

MatrixElements contain no functions, they are pure objects with the following properties:

* **value** :: number;
  * actual value of the element
* **index** : number;
  * index in the Matrix's elements array
* **column** :: number
  * column index
* **row** :: number
  * row index

## Matrix

The Matrix object contains the following properties:

* **elements[n]** :: Float64Array
  * the elements property itself is not frozen and may be changed directly
* **nCols** :: number (readonly)
  * the number of columns in a matrix
* **nRows** :: number (readonly)
  * the number of rows in a matrix

## Creating a Matrix

There are a few different ways to create a Matrix object:

* **Matrix constructor** :: (nCols: number, nRows: number, elements?: Float32Array)
  * If `elements` is provided it is set directly (without copying). Note that this is an impure approach as changes to the underlying data of this matrix will affect the other copies.
* **emptyMatrix** :: (nCols: number) => (nRows: number) => Matrix;
  * Create an empty matrix
* **matrixFromElements** :: (nCols: number) => (nRows: number) => (elements: ArrayLike<number>) => Matrix;
  * Create a matrix from a copy of the data (which may be any ArrayLike<number>)
* **matrixFromElementsDirect** :: (nCols: number) => (nRows: number) => (elements: Float32Array) => Matrix
  * Same as providing `elements` to the constructor
* **identityMatrix** : (nCols: number) => (nRows: number) => Matrix;
  * Create an identity matrix
* **zeroMatrix** :: (nCols: number) => (nRows: number) => Matrix;
  * Creates a matrix filled with 0s

## Functions

The following functions are available as a generic function and, for convenience, as a method on a created Matrix object.

For the sake of brevity they are listed here only in their method form.

Additionally, several functions have a "preAllocated" version. Those that do are identical to their pure counterpart, only that they take a pre-allocated matrix in as the first parameter (hidden in the signatures here). Typically this would be used for partial application and re-use (otherwise it's no different than using the pure version). Similarly, functions that modify elements may have a "direct" version which modifies the `.elements` directly rather than making a copy

### Fantasy-land compatible transformations
* **compose** / **composePreAllocated** :: (other: any) => Matrix;
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
* **map** / **mapPreAllocated** :: (fn: (a: MatrixElement) => number) => Matrix;
  * Maps over all the elements to return a new Matrix of the same dimensions
  * Expects a MatrixElements->number function to convert matrices
* **transpose** / **transposePreAllocated** :: transpose: () => Matrix;
  * Flips the rows and columns
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
* **setValueAtPosition** / **setValueAtPositionDirect** :: (c: number) => (r: number) => (val: number) => Matrix;
  * Sets the value of the element at a given column/row position

### Side effects
* **toString** :: () => string;
* **log** :: () => void;

----

## Vector
Vector extends Matrix and therefore contains all the above methods.

To create a Vector, use one of these functions which are simply the counterpart to Matrix:

* **Vector Constructor** :: (nRows: number, elements?: Float32Array)
* **emptyVector** :: (nRows: number) => Vector;
* **vectorFromElements** :: (elements: ArrayLike<number>) => Vector;
* **zeroVector** :: (nRows: number) => Vector;
* **vectorFromElementsDirect** :: (elements: Float32Array) => Vector;

Vectors also have some property getters that operate as aliases:

* **elements[0]**
  * x
  * width
  * r
* **elements[1]**
  * y
  * height
  * g
* **elements[2]**
  * z
  * depth
  * b
* **elements[3]**
  * w
  * hyperspace
  * a
