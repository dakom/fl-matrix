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

//const r1 = randomMatrix (3) (3);

const viewMatrix = identityMatrix (3) (3);
viewMatrix.setValueAtPositionDirect (2) (0) (100);
viewMatrix.setValueAtPositionDirect (2) (1) (100);

const t = S.compose(viewMatrix);

const v = vectorFromElements([3,4,1]);

t(v).log();

