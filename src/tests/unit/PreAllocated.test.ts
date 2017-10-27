
import { expect } from 'chai';
import {Matrix, emptyMatrix, matrixFromElements, transposePreAllocated, matrixFromElementsDirect} from "../../lib/LibMain";
import {S,matrixEquals, arrayEquals} from "./TestLibs";

export class PreAllocated {
    
    'Different approaches'(done) {
        const directData = new Float32Array(9);
        
        const foo = emptyMatrix (3) (3);
        const bar = matrixFromElementsDirect (3) (3) (directData);
        const scaleBy = (m:Matrix) => n => {
            
            const nMap = m.map(el => el.column === el.row ? n : 0);
        
            const myCompose = m.composePreAllocated (foo);
        
            return myCompose(nMap);
        }
            
        //create a matrix of some predefined data
        const myData = matrixFromElements (3) (3) ([0,1,2, 3,4,5, 6,7,8])
        
        //scale it
        const scaledData = scaleBy (myData) (2);
        
        const myTranspose = scaledData.transposePreAllocated(bar);
        const transposedData = myTranspose();
        
        expect(
            matrixEquals
                (scaledData)
                ([0, 2, 4, 6, 8, 10, 12, 14, 16])
        ).to.be.true;
        
        expect(
            matrixEquals
                (transposedData)
                ([0, 6, 12, 2, 8, 14, 4, 10, 16])
        ).to.be.true;

        const myTransposeAgain = transposePreAllocated (bar);
        myTransposeAgain (transposedData);
        expect(
            matrixEquals
                (bar)
                ([0, 2, 4, 6, 8, 10, 12, 14, 16])
        ).to.be.true;

        expect(
            arrayEquals
                (directData)
                ([0, 2, 4, 6, 8, 10, 12, 14, 16])
        ).to.be.true;
        

        done();
    }
}



