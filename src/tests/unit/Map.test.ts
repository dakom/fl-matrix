
import { expect } from 'chai';
import {Matrix, emptyMatrix} from "../../lib/LibMain";
import {matrixEquals} from "./TestLibs";

export class Map {
    
    'Map'(done) {
        const allOnes = emptyMatrix (3) (3).map(() => 1);
        const seq = allOnes.map(el => el.index);

        expect(
            matrixEquals
                (allOnes)
                ([ 1, 1, 1, 1, 1, 1, 1, 1, 1 ])
        ).to.be.true;

        expect(
            matrixEquals
                (seq)
                ([ 0,1, 2, 3, 4, 5, 6, 7, 8 ])
        ).to.be.true;

        done();
    }
}



