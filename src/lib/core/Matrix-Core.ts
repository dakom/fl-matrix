import {map, concat} from "./Matrix-Wrappers";

/* Interfaces and enums */

export interface Matrix {
    elements: Float32Array;
    nCols: number;
    nRows: number;
    clone: () => Matrix;
    setElements: (elements:Float32Array) => Matrix;
    getIndexAtPosition: (p1:number) => (p2:number) => number;
    getElementAtPosition: (p1:number) => (p2:number) => MatrixElement;
    getValueAtPosition: (p1:number) => (p2:number) => number;
    getValueAtIndex: (index:number) => number;
    setElementAt: (p1:number) => (p2:number) => (val:number) => Matrix;
    concat: (m:Matrix) => Matrix;
    toString: () => string;
    map: (fn: ((a:MatrixElement) => number)) => Matrix;
    log: () => void;
}

export interface MatrixElement {
    value: number;
    index: number;
    column: number;
    row: number;
}

/* Creator functions and helpers */

//Creates an empty matrix with no data populated
export const empty = (nCols:number) => (nRows:number):Matrix => {
    const elements = new Float32Array(nCols * nRows);

    //Assign all the data
    const m = {
        elements: elements,
        nCols: nCols,
        nRows: nRows
    } as Matrix;
    
    //Assign all the functions
    
    m.map = map(m);
    m.clone = () => clone(m);
    m.setElements = setElements(m);
    m.getIndexAtPosition = getIndexAtPosition(m);
    m.getElementAtPosition = getElementAtPosition(m);
    m.getValueAtIndex = getValueAtIndex(m);
    m.getValueAtPosition = getValueAtPosition(m);
    m.setElementAt = setElementAt(m);
    m.concat = concat(m);
    m.toString = () => mToString(m);
    m.log = () => console.log(m.toString());

    m['fantasy-land/concat'] = concat(m);
    
    return m;
}

//Creates an identity matrix
export const identity = (nCols:number) => (nRows:number):Matrix => 
    empty(nCols) (nRows).map(element => element.column === element.row ? 1 : 0);
    
/* Utilities */

export const getIndexAtPosition = (m1:Matrix) => (c:number) => (r:number):number =>
    ((c * m1.nRows) + r);

//Get a single element
export const getElementAtPosition = (m1:Matrix) => (c:number) => (r:number):MatrixElement => {
    const index = m1.getIndexAtPosition (c) (r);

    return {
        index: index,
        column: c,
        row: r,
        value: m1.elements[index]
    }
}

//Get a single value by index
export const getValueAtIndex = (m1:Matrix) => (index:number):number => 
    m1.elements[index]

//Get a single value by position
export const getValueAtPosition = (m1:Matrix) => (c:number) => (r:number):number =>
    m1.elements[m1.getIndexAtPosition (c) (r)];

//Set a single element
export const setElementAt = (m1:Matrix) => (c:number) => (r:number) => (val:number):Matrix => {
    const m = m1.clone();
    m1.elements[m1.getIndexAtPosition (c) (r)] = val;
    return m;
}

//Clone the shape but replace the elements
export const setElements = (m1:Matrix) => (elements:Float32Array):Matrix => {
    const m2 = identity (m1.nCols) (m1.nRows);
    m2.elements.set(elements);
    return m2;
}

//Clone the shape and the elements
export const clone = (m1:Matrix):Matrix =>
    m1.setElements(m1.elements);

//Tostring
export const mToString = (m1:Matrix):string => {
    let str = "";

    for(let r = 0; r < m1.nRows; r++) {
        for(let c = 0; c < m1.nCols; c++) {
            const val = m1.getValueAtPosition (c) (r);
            str += ` ${val.toString()}`;
        }
        str += (r !== m1.nRows-1) ? '\n' : ''
    }

    return str;
}