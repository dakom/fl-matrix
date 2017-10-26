
import { expect } from 'chai';
import { Matrix, emptyMatrix, matrixFromElements } from "../../lib/LibMain";
import { S, matrixEquals, randomMatrix } from "./TestLibs";

export class Equals {

    'Direct'(done) {
        let r1 = randomMatrix (3) (3);
        let r2 = randomMatrix (3) (3);

        r2.elements[0] = r1.elements[0]+1; //just to be sure

        expect(r1.equals(r1)).to.be.true;
        expect(r1.equals(r2)).to.be.false;

        done();
    }

    'Sanctuary'(done) {
        let r1 = randomMatrix (3) (3);
        let r2 = randomMatrix (3) (3);

        r2.elements[0] = r1.elements[0]+1; //just to be sure

        expect(S.equals(r1)(r1)).to.be.true;
        expect(S.equals(r1)(r2)).to.be.false;

        done();
    }
}