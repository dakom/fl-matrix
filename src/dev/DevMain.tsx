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

//compose a generic scaling function
/*
const scaleBy = m => n => 
S.compose
(
  m.map(el => el.column === el.row ? n : 0),
  m,
);

*/

const foo = emptyMatrix (3) (3);

const scaleBy = (m:Matrix) => n => {
    
    const nMap = m.map(el => el.column === el.row ? n : 0);

    const myCompose = m.composePreAllocated (foo);

    return myCompose(nMap);
}
  
  
//create a matrix of some predefined data
const myData = matrixFromElements (3) (3) ([0,1,2, 3,4,5, 6,7,8])

//scale it
const scaledData = scaleBy (myData) (2);

scaledData.log();