
import { expect } from 'chai';
import {Matrix, identity, empty} from "../../lib/LibMain";
import {S,matrixEquals} from "./TestLibs";

const allOnes = empty (3) (3).map(() => 1);
const seq = allOnes.map(el => el.index);

export class Concat {
    
    'Concat - direct'(done) {
        
        const res = seq.concat(allOnes);
        
        expect(
            matrixEquals
                (res)
                ([ 1, 2, 3, 4, 5, 6, 7, 8, 9 ])
        ).to.be.true;

        done();
    }

    'Concat - Sanctuary'(done) {
        const res = S.concat (seq) (allOnes);
        
        expect(
            matrixEquals
                (res)
                ([ 1, 2, 3, 4, 5, 6, 7, 8, 9 ])
        ).to.be.true;

        done();
    }
}



