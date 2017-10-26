import {create, env} from 'sanctuary';
const checkTypes = false; //process.env.BUILD_TYPE !== 'build';
export const S = create({checkTypes, env});

import {Matrix, matrixFromElements} from "../../lib/LibMain";

export const matrixEquals = (m1:Matrix) => (es2:Array<number> | Float32Array):boolean => {
    const es1 = m1.elements;

    if(es1.length !== es2.length) {
        return false;
    }

    for(let i = 0; i < es1.length; i++) {
        if(es1[i] !== es2[i]) {
            return false;
        }
    }

    return true;
}

export const randomMatrix = (nCols:number) => (nRows:number) => {
    const elements = new Float32Array(nCols * nRows);

    for(let i = 0; i < elements.length; i++) {
        elements[i] = Math.ceil(Math.random() * 42);
    }

    return matrixFromElements (nCols) (nRows) (elements);
}