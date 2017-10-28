
import { expect } from 'chai';
import { Matrix, emptyMatrix, matrixFromElements } from "../../lib/LibMain";
import { S, matrixEquals, arrayEquals, randomMatrix } from "./TestLibs";
import {mat4} from "gl-matrix";

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

    'Matrix 4x4'(done) {
        const r1 = randomMatrix (4) (4);
        const r2 = randomMatrix (4) (4);
        
        //Check the multiplication with gl-matrix

        //Regular
        expect(
            arrayEquals 
                (mat4.multiply(mat4.create(), r2.elements, r1.elements))
                (r2.compose(r1).elements)
        ).to.be.true;

        //Sanctuary
        expect(
            arrayEquals 
                (mat4.multiply(mat4.create(), r2.elements, r1.elements))
                (S.compose(r2) (r1).elements)
        ).to.be.true;

        done();
    }

    'Matrix 4x4 - PreAllocated'(done) {
        const dest1 = emptyMatrix (4) (4);
        const r1 = randomMatrix (4) (4);
        const r2 = randomMatrix (4) (4);
        
        //Check the multiplication with gl-matrix

        //Regular
        r2.composePreAllocated (dest1) (r1)
        expect(
            arrayEquals 
                (mat4.multiply(mat4.create(), r2.elements, r1.elements))
                (dest1.elements)
        ).to.be.true;

        done();
    }

    'Matrix x Vector allowed'(done) {
        const r1 = randomMatrix (4) (1);
        const r2 = randomMatrix (1) (4);
        
        const res1 = r2.compose(r1);
        expect(res1).to.not.be.undefined;

        const r3 = randomMatrix (1) (4);
        const r4 = randomMatrix (4) (1);
        
        const res2 = r4.compose(r3);
        expect(res2).to.not.be.undefined;

        done();
    }
}