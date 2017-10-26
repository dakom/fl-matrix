
import { expect } from 'chai';
import { Matrix, emptyMatrix, matrixFromElements } from "../../lib/LibMain";
import { S, matrixEquals, randomMatrix } from "./TestLibs";

export class Compose {

    'Id'(done) {
        const r1 = randomMatrix (3) (3);
        const id = r1.id();
        const res = r1.compose(id);

        //direct
        expect(r1.equals(r1.compose(r1.id()))).to.be.true; //right identity
        expect(r1.equals(r1.id().compose(r1))).to.be.true; //left identity

        //Sanctuary
        expect(r1.equals(S.compose(r1)(r1.id()))).to.be.true; //right identity
        expect(r1.equals(S.compose(r1.id())(r1))).to.be.true; //left identity
        
        done();
    }

    'Matrix Vector'(done) {
        const r1 = randomMatrix (3) (3);
        const r2 = randomMatrix (3) (1);

        const res = S.compose(r1) (r2);

        //TODO - add up numbers by hand
        res.log();

        done();
    }
}