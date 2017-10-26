
import { expect } from 'chai';
import {Matrix, emptyMatrix} from "../../lib/LibMain";
import {S,matrixEquals} from "./TestLibs";

const allOnes = emptyMatrix (3) (3).map(() => 1);
const seq = allOnes.map(el => el.index);

export class Concat {
    
    'Direct'(done) {
        
        const res = seq.concat(allOnes);
        
        expect(
            matrixEquals
                (res)
                ([ 1, 2, 3, 4, 5, 6, 7, 8, 9 ])
        ).to.be.true;

        done();
    }

    'Sanctuary'(done) {
        const res = S.concat (seq) (allOnes);
        
        expect(
            matrixEquals
                (res)
                ([ 1, 2, 3, 4, 5, 6, 7, 8, 9 ])
        ).to.be.true;

        done();
    }
}



