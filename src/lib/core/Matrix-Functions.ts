import {Matrix, emptyMatrix, identityMatrix, matrixFromElements} from "./Matrix";
import {MatrixElement} from "./Matrix-Elements";

//reduce
export const reduce = (m1:Matrix) => (fn: ((m:Matrix) => (a:MatrixElement) => Matrix)) => (dest:Matrix):Matrix => {
    for(let r = 0; r < m1.nRows; r++) {
        for(let c = 0; c < m1.nCols; c++) {
            dest = fn(dest) (m1.getElementAtPosition (c) (r))
        }
    }

    return dest;
}

//map
export const map = (m1:Matrix) => (fn: ((a:MatrixElement) => number)):Matrix =>
    m1.reduce
        (dest => el => {
            dest.elements[el.index] = fn(el);
            return dest;
        })
        (emptyMatrix (m1.nCols) (m1.nRows));

//equals
export const equals = (m1:Matrix) => (m2:Matrix):boolean => {
    if(m1.elements.length !== m2.elements.length || m1.nCols !== m2.nCols || m1.nRows !== m2.nRows) {
        return false;
    }

    for(let i = 0; i < m1.elements.length; i++) {
        if(m1.elements[i] !== m2.elements[i]) {
            return false;
        }
    }

    return true;
}

//Concat - adds two matrices together
export const concat = (m1:Matrix) => (m2:Matrix):Matrix => 
    m1.map(el =>
        el.value + m2.getValueAtIndex(el.index)
    );

//Compose - multiplies two matrices together
export const compose = (m1:Matrix) => (m2:Matrix):Matrix => {
    //from https://stackoverflow.com/a/22149009/784519
    const A = m1.elements;
    const B = m2.elements;
    const M = m1.nCols;
    const N = m2.nRows;
    const L = m1.nRows;

    const res = new Float32Array(M * N);

    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            res[j * M + i] = 0;

            for (let k = 0; k < L; k++) {
                res[j * M + i] += A[k * M + i] * B[j * L + k];
            }
        }
    }

    return matrixFromElements (M) (N) (res);
}

//Clone the shape and the elements
export const clone = (m1:Matrix):Matrix =>
    matrixFromElements (m1.nCols) (m1.nRows) (m1.elements);

//Create an identity matrix with the same dimensions
export const id = (m1:Matrix):Matrix =>
    identityMatrix (m1.nCols) (m1.nRows);