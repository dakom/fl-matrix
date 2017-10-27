
import { expect } from 'chai';
import {Matrix, identityMatrix, matrixFromElements, matrixFromElementsDirect} from "../../lib/LibMain";
import {matrixEquals} from "./TestLibs";

export class CreateMatrix {
    
    'Identity'(done) {
        
        expect(
            matrixEquals
                (identityMatrix (3) (3))
                ([ 1, 0, 0, 0, 1, 0, 0, 0, 1 ])
        ).to.be.true;

        expect(
            matrixEquals
                (identityMatrix (3) (2))
                ([ 1, 0, 0, 1, 0, 0 ])
        ).to.be.true;

        expect(
            matrixEquals
                (identityMatrix (2) (3))
                ([ 1, 0, 0, 0, 1, 0 ])
        ).to.be.true;

        done();
    }

    'From Elements'(done) {
        const vals = Float32Array.from([ 1, 3, 4, 2, 5, 6, 7, 6, 9 ]);

        expect(
            matrixEquals
                (matrixFromElements (3) (3) (vals))
                (vals)
        ).to.be.true;

        done();
    }

    'From Elements Direct'(done) {
        const vals = Float32Array.from([ 1, 3, 4, 2, 5, 6, 7, 6, 9 ]);

        const m1 = matrixFromElementsDirect (3) (3) (vals);

        expect(vals === m1.elements).to.be.true;

        //make sure it's not accidental
        const m2 = matrixFromElements(3) (3) (vals);
        expect(vals === m2.elements).to.be.false;

        done();
    }
}




