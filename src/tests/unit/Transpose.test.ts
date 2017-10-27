
import { expect } from 'chai';
import {Matrix, emptyMatrix, matrixFromElements, transposePreAllocated, matrixFromElementsDirect} from "../../lib/LibMain";
import {S,matrixEquals, arrayEquals} from "./TestLibs";

export class Transpose {
    
    '3x3'(done) {
        const myData = matrixFromElements (3) (3) ([0,1,2, 3,4,5, 6,7,8])
        
        expect(
            matrixEquals
                (myData.transpose())
                ([ 0, 3, 6, 1, 4, 7, 2, 5, 8 ])
        ).to.be.true;

        done();
    }

    '3x2'(done) {
        const myData = matrixFromElements (3) (2) ([0,1,2, 3,4,5])

        expect(
            matrixEquals
                (myData.transpose())
                ([ 0, 2, 4, 1, 3, 5 ])
        ).to.be.true;

        done();
    }

    '2x3'(done) {
        const myData = matrixFromElements (2) (3) ([0,1,2, 3,4,5])
        
        expect(
            matrixEquals
                (myData.transpose())
                ([ 0, 3, 1, 4, 2, 5 ])
        ).to.be.true;

        done();
    }
}



