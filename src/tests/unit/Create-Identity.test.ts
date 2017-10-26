
import { expect } from 'chai';
import {Matrix, identity} from "../../lib/LibMain";
import {matrixEquals} from "./TestLibs";

export class Identity {
    
    'Identity Matrix Creation'(done) {
        
        expect(
            matrixEquals
                (identity (3) (3))
                ([ 1, 0, 0, 0, 1, 0, 0, 0, 1 ])
        ).to.be.true;

        expect(
            matrixEquals
                (identity (3) (2))
                ([ 1, 0, 0, 1, 0, 0 ])
        ).to.be.true;

        expect(
            matrixEquals
                (identity (2) (3))
                ([ 1, 0, 0, 0, 1, 0 ])
        ).to.be.true;

        done();
    }
}




