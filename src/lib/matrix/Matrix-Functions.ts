import { Matrix, emptyMatrix, identityMatrix, matrixFromElements } from "./Matrix";
import { MatrixElement } from "./Matrix-Elements";

//reduce
export const reduce = (m1: Matrix) => (fn: ((m: Matrix) => (a: MatrixElement) => Matrix)) => (dest: Matrix): Matrix => {
    for (let r = 0; r < m1.nRows; r++) {
        for (let c = 0; c < m1.nCols; c++) {
            dest = fn(dest)(m1.getElementAtPosition(c)(r))
        }
    }

    return dest;
}

//map
export const mapPreAllocated = (dest:Matrix) => (m1: Matrix) => (fn: ((a: MatrixElement) => number)): Matrix => 
    m1.reduce
        (dest => el => {
            dest.elements[el.index] = fn(el);
            return dest;
        })
    (dest);

export const map = (m1: Matrix) => (fn: ((a: MatrixElement) => number)): Matrix =>
    mapPreAllocated (emptyMatrix(m1.nCols)(m1.nRows)) (m1) (fn);

//equals
export const equals = (m1: Matrix) => (m2: Matrix): boolean => {
    if (m1.elements.length !== m2.elements.length || m1.nCols !== m2.nCols || m1.nRows !== m2.nRows) {
        return false;
    }

    for (let i = 0; i < m1.elements.length; i++) {
        if (m1.elements[i] !== m2.elements[i]) {
            return false;
        }
    }

    return true;
}

//Concat - adds two matrices together
export const concat = (m1: Matrix) => (m2: Matrix): Matrix =>
    m1.map(el =>
        el.value + m2.getValueAtIndex(el.index)
    );

//Compose - multiplies two matrices together (where the left consumes the right)
export const composePreAllocated = (dest:Matrix) => (m2: Matrix) => (m1: Matrix): Matrix => {
    if (m1.nRows !== m2.nCols) {
        console.error(`Composition not allowed with joining rows of (${m1.nRows} and columns of ${m2.nCols})`);
        return undefined;
    }

    const t = m1.nRows;

    for(let r = 0; r < m2.nRows; r++) {
        for(let c = 0; c < m1.nCols; c++) {
            let total = 0;
            for (let j = 0; j < t; j++) {
                total += (m2.getValueAtPosition(j)(r) * m1.getValueAtPosition(c)(j));
            }
            dest.elements[dest.getIndexAtPosition(c)(r)] = total;
        }
    }

    return dest;
}

export const compose = (m2: Matrix) => (m1: Matrix): Matrix =>
    composePreAllocated (emptyMatrix (m1.nCols) (m2.nRows)) (m2) (m1);

//transpose (flip columns/rows)
export const transposePreAllocated = (dest:Matrix) => (m1:Matrix):Matrix => {
    if(dest.nCols !== m1.nRows || dest.nRows !== m1.nCols) {
        console.error(`Transposing requires that the number of destination columns and rows be the inverse of source columns and rows`);
        return undefined;
    }

    return m1.reduce
        (dest => el => {
            dest.setValueAtPositionDirect (el.row) (el.column) (el.value)
            return dest;
        })
        (dest);
}

export const transpose = (m1:Matrix):Matrix =>
    transposePreAllocated (emptyMatrix (m1.nRows) (m1.nCols)) (m1);

//Clone the shape and the elements
export const clone = (m1: Matrix): Matrix =>
    matrixFromElements(m1.nCols)(m1.nRows)(m1.elements);

//Create an identity matrix with the same dimensions
export const id = (m1: Matrix): Matrix =>
    identityMatrix(m1.nCols)(m1.nRows);