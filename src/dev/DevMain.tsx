import {Matrix, emptyMatrix, matrixFromElements} from "../lib/LibMain";

import {create, env} from 'sanctuary';
const checkTypes = false; //process.env.BUILD_TYPE !== 'build';
const S = create({checkTypes, env});
import {mat4} from "gl-matrix";

export const randomMatrix = (nCols:number) => (nRows:number) => {
    const elements = new Float32Array(nCols * nRows);

    for(let i = 0; i < elements.length; i++) {
        elements[i] = Math.ceil(Math.random() * 42);
    }

    return matrixFromElements (nCols) (nRows) (elements);
}

const r1 = randomMatrix (4) (4);
const r2 = randomMatrix (4) (4);


const mRes = mat4.multiply(mat4.create(), r2.elements, r1.elements);
const res = r1.compose(r2);

console.log(mRes);
console.log(res.elements);

//const res = r1.compose(r2); //

//const res = S.compose(r1) (r2);

//res.log();

