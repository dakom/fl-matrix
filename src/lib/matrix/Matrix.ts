import {
    map,
    mapDirect,
    mapPreAllocated,
    mapElements, 
    mapElementsPreAllocated,
    mapElementsDirect,
    reduce,
    reduceDirect,
    reduceElements,
    concat,
    concatPreAllocated,
    clone, 
    compose, 
    id, 
    equals, 
    composePreAllocated, 
    
    transpose, 
    transposePreAllocated
} from "./Matrix-Functions";

import {MatrixElement, getElementAtPosition, getValueAtIndex, getValueAtPosition, setValueAtPosition, setValueAtPositionDirect, getIndexAtPosition} from "./Matrix-Elements";

/* Creator functions and helpers */

export class Matrix {
    public readonly elements:Float32Array;
    public readonly nCols:number;
    public readonly nRows:number;

    constructor(nCols:number, nRows:number, elements?:Float32Array) {
        if(elements !== undefined && elements.length !== nCols * nRows) {
            throw new Error("If you supply elements, it must be (cols * rows) length in size")
        }
        this.elements = elements === undefined ? new Float32Array(nCols * nRows) : elements;
        this.nCols = nCols;
        this.nRows = nRows;
    }

    public map = map(this);
    public mapPreAllocated = dest => mapPreAllocated(dest) (this);
    public mapDirect = mapDirect(this);
    public mapElements = mapElements(this);
    public mapElementsDirect = mapElementsDirect(this);
    public mapElementsPreAllocated = dest => mapElementsPreAllocated (dest) (this);

    public reduce = reduce(this);
    public reduceDirect = reduceDirect(this);
    public reduceElements = reduceElements(this);
    
    public clone = () => clone(this);
    public getIndexAtPosition = getIndexAtPosition(this);
    public getElementAtPosition = getElementAtPosition(this);
    public getValueAtIndex = getValueAtIndex(this);
    public getValueAtPosition = getValueAtPosition(this);
    public setValueAtPosition = setValueAtPosition(this);
    public setValueAtPositionDirect = setValueAtPositionDirect(this);
    public concat = concat(this);
    public concatPreAllocated = dest => concatPreAllocated(dest) (this);
    public compose = other => compose (other) (this);
    public composePreAllocated = dest => other => composePreAllocated (dest) (other) (this);
    public toString = () => mToString(this);
    public log = () => console.log(this.toString());
    public id = () => id(this);
    public equals = equals(this);
    public transpose = () => transpose(this);
    public transposePreAllocated = dest => () => transpose(this);
    public empty = () => zeroMatrix(this.nCols) (this.nRows);

    public 'fantasy-land/map' = map(this);
    public 'fantasy-land/reduce' = (f, x) => f(x, this.elements.slice()); //the fantasy-land spec doesn't seem to allow unary calls here
    //(f, x) => reduce (this) (f) (x);
    public 'fantasy-land/concat' = concat(this);
    public 'fantasy-land/id' = () => id(this);
    public 'fantasy-land/equals' = equals(this);
    public 'fantasy-land/compose' = compose(this); //S.compose flips it around for us.
    public 'fantasy-land/empty' = () => zeroMatrix(this.nCols) (this.nRows);
}

//Creates an empty matrix with no data populated
export const emptyMatrix = (nCols:number) => (nRows:number):Matrix =>
    new Matrix(nCols, nRows);

//Creates a matrix from predefined data
export const matrixFromElements = (nCols:number) => (nRows:number) => (elements:ArrayLike<number>):Matrix => {
    const m = emptyMatrix(nCols) (nRows);
    m.elements.set(elements);
    return m;
}

//Creates a matrix from predefined data without copying
export const matrixFromElementsDirect = (nCols:number) => (nRows:number) => (elements:Float32Array):Matrix =>
    new Matrix(nCols, nRows, elements);

//Creates an identity matrix
export const identityMatrix = (nCols:number) => (nRows:number):Matrix => 
    emptyMatrix(nCols) (nRows).mapElementsDirect(element => element.column === element.row ? 1 : 0);

//Creates a matrix filled with 0
export const zeroMatrix = (nCols:number) => (nRows:number):Matrix => {
    const m = emptyMatrix (nCols) (nRows);
    m.elements.fill(0);
    return m;
}

//Tostring
export const mToString = (m1:Matrix):string => {
    let str = "";

    const largestDigits = m1.elements.reduce((highest, val) => {
        const nDigits = val.toString().length;
        return nDigits > highest ? nDigits : highest
    }, 0);

    const lpad = (val:string) => (length:number) => {
        while(val.length < length) {
            val = "0" + val;
        }
        return val;
    }

    for(let r = 0; r < m1.nRows; r++) {
        for(let c = 0; c < m1.nCols; c++) {
            const val = lpad (m1.getValueAtPosition (c) (r).toString()) (largestDigits);
            
            str += ` ${val}`;
        }
        str += (r !== m1.nRows-1) ? '\n' : ''
    }

    return str;
}