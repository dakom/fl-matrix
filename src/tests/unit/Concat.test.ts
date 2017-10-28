
import { expect } from 'chai';
import {Matrix, emptyMatrix} from "../../lib/LibMain";
import {S,matrixEquals} from "./TestLibs";

const allOnes = emptyMatrix (3) (3).mapElements(() => 1);
const seq = allOnes.mapElements(el => el.index);

export class Concat {
    
    'Regular'(done) {
        
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

    'Pre-Allocated'(done) {
        
        const dest = emptyMatrix(3) (3)
        const res = seq.concatPreAllocated (dest) (allOnes);
        
        expect(
            matrixEquals
                (res)
                ([ 1, 2, 3, 4, 5, 6, 7, 8, 9 ])
        ).to.be.true;

        expect(
            matrixEquals
                (dest)
                ([ 1, 2, 3, 4, 5, 6, 7, 8, 9 ])
        ).to.be.true;

        expect(
            matrixEquals
                (seq)
                ([ 0, 1, 2, 3, 4, 5, 6, 7, 8 ])
        ).to.be.true;

        done();
    }
}



