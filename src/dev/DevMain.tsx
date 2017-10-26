import {Matrix, identity, empty} from "../lib/LibMain";

import {create, env} from 'sanctuary';
const checkTypes = false; //process.env.BUILD_TYPE !== 'build';
const S = create({checkTypes, env});


const m = identity (3) (3);

const allOnes = empty(3) (3).map(() => 1);
const seq = allOnes.map(el => el.index);
const res = S.concat(allOnes) (seq);

console.log(res);
