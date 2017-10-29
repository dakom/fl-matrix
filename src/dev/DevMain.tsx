import { transposePreAllocated } from '../lib/matrix/Matrix-Functions';
import {zeroVector, matrixFromElements, vectorFromElements, identityMatrix} from "../lib/LibMain";

import {create, env} from 'sanctuary';
const checkTypes = false; //process.env.BUILD_TYPE !== 'build';
const S = create({checkTypes, env});
import {mat4} from "gl-matrix";

const randomMatrix = (nCols:number) => (nRows:number) => {
    const elements = new Float32Array(nCols * nRows);

    for(let i = 0; i < elements.length; i++) {
        elements[i] = Math.ceil(Math.random() * 42);
    }

    return matrixFromElements (nCols) (nRows) (elements);
}

const r1 = randomMatrix (4) (4);
const r2 = randomMatrix (4) (4);
const r3 = randomMatrix (4) (4);

const fRes = r1.compose(r2).compose(r3);

const gRes1 = mat4.multiply(mat4.create(), r2.elements as mat4, r3.elements as mat4);


const gRes2 = mat4.multiply(mat4.create(), r1.elements as mat4, gRes1);


console.log(fRes.elements);
console.log(gRes2);

//const m = matrixFromElements(4) (4) (mat4.fromRotation(mat4.create(), 2, [0,0,1]));


const v = vectorFromElements([3,4,1]);

//t(v).log();

