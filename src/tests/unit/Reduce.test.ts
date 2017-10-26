
import { expect } from 'chai';
import {Matrix, emptyMatrix} from "../../lib/LibMain";
import {matrixEquals} from "./TestLibs";

//Reduce is also tested by map since it implements reduce
export class Reduce {
    
    'Remove dimension'(done) {
        const seq3d = emptyMatrix(3) (3).map(el => el.index);
        
        const seq2d = 
            seq3d.reduce
            (dest => el => {
                if(el.column < dest.nCols) {
                    dest.elements[el.index] = el.value;
                }
            
                return dest;
            })
            (emptyMatrix (2) (3));

        expect(
            matrixEquals
                (seq2d)
                ([ 0, 1, 2, 3, 4, 5 ])
        ).to.be.true;
        
        done();
    }

    'Add dimension'(done) {
        const seq3d = emptyMatrix(3) (3).map(el => el.index);
        
        const seq4d = 
            seq3d.reduce
            (dest => el => {
                dest.elements[el.index] = el.value;
                if(el.column == dest.nCols-2) {
                    const newIndex = dest.getIndexAtPosition (el.column+1) (el.row)
                    dest.elements[newIndex] = el.value + 3;
                }
            
                return dest;
            })
            (emptyMatrix (4) (3));

        expect(
            matrixEquals
                (seq4d)
                ([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ])
        ).to.be.true;
        
        done();
    }
}



