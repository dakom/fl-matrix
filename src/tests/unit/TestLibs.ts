import {create, env} from 'sanctuary';
const checkTypes = false; //process.env.BUILD_TYPE !== 'build';
export const S = create({checkTypes, env});

import {Matrix} from "../../lib/LibMain";

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