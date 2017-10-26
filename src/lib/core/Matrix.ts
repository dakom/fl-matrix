import {map, concat, clone, reduce, compose, id, equals} from "./Matrix-Functions";
import {MatrixElement, getElementAtPosition, getValueAtIndex, getValueAtPosition, setElementAt, getIndexAtPosition} from "./Matrix-Elements";

export interface Matrix {
    elements: Float32Array;
    nCols: number;
    nRows: number;
    clone: () => Matrix;
    id: () => Matrix;
    getIndexAtPosition: (p1:number) => (p2:number) => number;
    getElementAtPosition: (p1:number) => (p2:number) => MatrixElement;
    getValueAtPosition: (p1:number) => (p2:number) => number;
    getValueAtIndex: (index:number) => number;
    setElementAt: (p1:number) => (p2:number) => (val:number) => Matrix;
    concat: (m:Matrix) => Matrix;
    compose: (m:Matrix) => Matrix;
    toString: () => string;
    map: (fn: ((a:MatrixElement) => number)) => Matrix;
    equals: (m:Matrix) => boolean;
    reduce: (fn: ((m:Matrix) => (a:MatrixElement) => Matrix)) => (dest:Matrix) => Matrix;
    log: () => void;
}

/* Creator functions and helpers */

//Creates an empty matrix with no data populated
export const emptyMatrix = (nCols:number) => (nRows:number):Matrix => {
    const elements = new Float32Array(nCols * nRows);

    //Assign all the data
    const m = {
        elements: elements,
        nCols: nCols,
        nRows: nRows
    } as Matrix;
    
    //Assign all the functions
    
    m.reduce = reduce(m);
    m.map = map(m);
    m.clone = () => clone(m);
    m.getIndexAtPosition = getIndexAtPosition(m);
    m.getElementAtPosition = getElementAtPosition(m);
    m.getValueAtIndex = getValueAtIndex(m);
    m.getValueAtPosition = getValueAtPosition(m);
    m.setElementAt = setElementAt(m);
    m.concat = concat(m);
    m.compose = other => compose (other) (m);
    m.toString = () => mToString(m);
    m.log = () => console.log(m.toString());
    m.id = () => id(m);
    m.equals = equals(m);

    m['fantasy-land/concat'] = concat(m);
    m['fantasy-land/id'] = () => id(m);
    m['fantasy-land/equals'] = equals(m);
    m['fantasy-land/compose'] = compose(m); //S.compose flips it around for us.

    return m;
}

//Creates a matrix from predefined data
export const matrixFromElements = (nCols:number) => (nRows:number) => (elements:Float32Array):Matrix => {
    const m = emptyMatrix(nCols) (nRows);
    m.elements.set(elements);
    return m;
}

//Creates an identity matrix
export const identityMatrix = (nCols:number) => (nRows:number):Matrix => 
    emptyMatrix(nCols) (nRows).map(element => element.column === element.row ? 1 : 0);

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