# Fantasy-Land Matrix - API

## General concepts

The primary goal of `fl-matrix` is to provide a functional approach for working with matrices - specifically via:

1. [Fantasy-land](https://github.com/fantasyland/fantasy-land) and [Sanctuary](https://sanctuary.js.org/) compatibility
2. A few extra functions and helper utils
3. Generic map/reduce for rolling your own transformations with metadata

The best place to see examples are those mentioned in the [Readme](../Readme.md#Examples), but in a nutshell:

```
// Compose a generic scaling function
const scaleBy = m => n => 
S.compose
(
  m.mapElements(el => el.column === el.row ? n : 0),
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

Another goal is specifically to ease development for webgl. For this reason, the data layout is column-major. In other words, the `.elements` may be treated exactly as the matrices from other libraries such as [gl-matrix](http://glmatrix.net/), and may be loaded quickly into Matrix wrappers via `matrixFromElements() or matrixFromElementsDirect()`

This library does _not_ intend to provide specific transformation helpers like lookAt, setRotation, etc. A common pattern would be to map those transformations via something like `MyMatrix.map(elements => mat4.fromRotation(elements, ...))`. Note that the `elements` passed _in_ to `map()` is a copy - so the changes made by `mat4` are not a problem.

In terms of immutability - properties are marked read-only in Typescript and all functions without the `PreAllocated/Direct` suffixes are pure (more on that in a second). However, there is no deep-freezing and it's the responsibility of the caller to deal with `.elements` however they see fit. 

About those suffixes... while the functions are generally pure in the sense that they make copies of both the containers and the data, for the sake of efficiency, several functions have a "preAllocated" and "Direct" version which break that purity for the sake of lower memory footprint and saving gc cycles. "PreAllcoated" implies re-use of a specific Matrix object while "Direct" implies setting the `elements` array directly rather than make copies. Use these cautiously since they will modify any other copies!

The reason `mapElements()` and `reduceElements()` are not fl-compatible, however, is not due to that reason (e.g. they _are_ pure), but rather because they are given MatrixElements which have extra metadata like the column and row number. This is often more fun and useful than just the numbers alone. For example:

```
const allOnes = emptyMatrix (3) (3).mapElements(() => 1);
const seq = allOnes.mapElements(el => el.index);
const seqId = seq.mapElements(el => el.column === el.row ? 1 : 0);

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
* **matrixFromElementsDirect** :: (nCols: number) => (nRows: number) => (elements: Float32Array) => Matrix;
  * Same as providing `elements` to the constructor
* **identityMatrix** : (nCols: number) => (nRows: number) => Matrix;
  * Create an identity matrix
* **zeroMatrix** :: (nCols: number) => (nRows: number) => Matrix;
  * Creates a matrix filled with 0s

## Functions

The following functions are available as a generic function and, for convenience, as a method on a created Matrix object.

For the sake of brevity they are listed here only in their method form.

The functions with PreAllocated or Direct versions are listed at the end with only their type signatures (since they otherwise operate exactly like their pure counterpart)

### Fantasy-land compatible transformations (also available via Sanctuary calls)
* **compose** :: (other: any) => Matrix;
  * Implemented as multiplication
* **concat** :: (m2: Matrix) => Matrix;
  * Implemented as addition
* **id** :: () => Matrix;
  * Implemented as the Identity matrix
* **equals** :: (m2: Matrix) => boolean;
  * Compares the size and values
* **map** :: (fn: (es: Float32Array) => Float32Array) => Matrix;
  * Implemented as the value being `elements`
* **reduce** :: (fn: (m: Matrix) => (es: Float32Array) => Matrix) => (dest: Matrix) => Matrix;
  * Implemented as the value being `elements`
* **empty** :: () => Matrix;
  * Returns a matrix of the same dimensions with 0 for values

### Non-fantasy-land functional transformations
* **mapElements** :: (fn: (a: MatrixElement) => number) => Matrix;
  * Maps over all the elements to return a new Matrix of the same dimensions
  * Expects a MatrixElements->number function to convert matrices
* **reduceElements** :: (fn: (m: Matrix) => (a: MatrixElement) => Matrix) => (dest: Matrix) => Matrix;
  * Maps over all the elements to return a new Matrix of any kind
  * Expects a MatrixElements->Matrix function to convert matrices
* **transpose** :: transpose: () => Matrix;
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
* **setValueAtPosition** :: (c: number) => (r: number) => (val: number) => Matrix;
  * Sets the value of the element at a given column/row position

### Side effects
* **toString** :: () => string;
* **log** :: () => void;


### PreAllocated / Direct versions
* **mapDirect** :: (fn: (es: Float32Array) => Float32Array) => Matrix;
* **mapPreAllocated** :: (dest: any) => (fn: (es: Float32Array) => Float32Array) => Matrix;
* **mapElementsDirect** :: (fn: (a: MatrixElement) => number) => Matrix;
* **mapElementsPreAllocated** :: (dest: any) => (fn: (a: MatrixElement) => number) => Matrix;
* **reduceDirect** :: (fn: (m: Matrix) => (es: Float32Array) => Matrix) => (dest: Matrix) => Matrix;
* **concatPreAllocated** :: (dest: any) => (m2: Matrix) => Matrix;
* **composePreAllocated** :: (dest: any) => (other: any) => Matrix;
* **transposePreAllocated** :: (dest: any) => () => Matrix;
* **setValueAtPositionDirect** :: (c: number) => (r: number) => (val: number) => Matrix;

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

And a helper function to do the reverse lookup:

* **vectorPropToIndex** :: (prop: string) => number;