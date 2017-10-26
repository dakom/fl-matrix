import {Matrix, MatrixElement, empty} from "./Matrix-Core";

//map - note: this is significantly slower than setElements
export const map = (m1:Matrix) => (fn: ((a:MatrixElement) => number)):Matrix => {
    const m = empty (m1.nCols) (m1.nRows);
    //Populate the identity data
    for(let r = 0; r < m.nRows; r++) {
        for(let c = 0; c < m.nCols; c++) {
            m.elements[m.getIndexAtPosition (c) (r)] = fn(m1.getElementAtPosition (c) (r));
        }
    }

    return m;
}

//Add
export const concat = (m1:Matrix) => (m2:Matrix):Matrix => 
    m1.map(el =>
        el.value + m2.getValueAtIndex(el.index)
    );
    
    