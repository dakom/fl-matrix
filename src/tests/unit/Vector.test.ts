
import { expect } from 'chai';
import { Matrix, emptyMatrix, matrixFromElements, Vector, vectorFromElements } from "../../lib/LibMain";
import { S, matrixEquals, randomMatrix } from "./TestLibs";

export class VectorTests {

    'Creation'(done) {
        const v = vectorFromElements([1,2,3,4]);
        
        expect(
            matrixEquals
                (v)
                ([ 1,2,3,4 ])
        ).to.be.true;

        expect(v.x).to.equal(1);
        expect(v.height).to.equal(2);
        expect(v.b).to.equal(3);
        expect(v.w).to.equal(4);


        expect(v.x).to.equal(v.width);
        expect(v.x).to.equal(v.r);

        expect(v.y).to.equal(v.height);
        expect(v.y).to.equal(v.g);

        expect(v.z).to.equal(v.depth);
        expect(v.z).to.equal(v.b);

        expect(v.w).to.equal(v.hyperspace);
        expect(v.w).to.equal(v.a);
        done();
    }

}