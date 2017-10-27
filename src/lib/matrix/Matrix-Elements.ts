import {Matrix} from "./Matrix";

export interface MatrixElement {
    value: number;
    index: number;
    column: number;
    row: number;
}

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

//Set a single value
export const setValueAtPosition = (m1:Matrix) => (c:number) => (r:number) => (val:number):Matrix => {
    const m = m1.clone();
    m.elements[m1.getIndexAtPosition (c) (r)] = val;
    return m;
}

export const setValueAtPositionDirect = (m1:Matrix) => (c:number) => (r:number) => (val:number):Matrix => {
    m1.elements[m1.getIndexAtPosition (c) (r)] = val;
    return m1;
}

//Get the index at a position
export const getIndexAtPosition = (m1:Matrix) => (c:number) => (r:number):number =>
    ((c * m1.nRows) + r);