
import { expect } from 'chai';
import {Matrix, emptyMatrix} from "../../lib/LibMain";
import {matrixEquals, S} from "./TestLibs";

export class Map {
    
    'Fantasyland/Sanctuary'(done) {
        const allOnes = S.map (es => es.map(() => 1)) (emptyMatrix (3) (3));

        const seq = S.map (es => es.map((val, index) => index)) (allOnes);

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

    'Elements'(done) {
        const allOnes = emptyMatrix (3) (3).mapElements(() => 1);
        const seq = allOnes.mapElements(el => el.index);

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
    
    'Direct'(done) {
        const allOnes = emptyMatrix (3) (3).map(es => es.map(() => 1));
        allOnes.mapDirect(es => es.map((val, index) => index));

        expect(
            matrixEquals
                (allOnes)
                ([ 0,1, 2, 3, 4, 5, 6, 7, 8 ])
        ).to.be.true;

        done();
    }


    'Pre Allocated'(done) {
        const dest = emptyMatrix (3) (3);
        emptyMatrix (3) (3).mapPreAllocated (dest) (es => es.map(() => 1));
       
        expect(
            matrixEquals
                (dest)
                ([ 1, 1, 1, 1, 1, 1, 1, 1, 1 ])
        ).to.be.true;

        done();
    }


    'Elements Pre Allocated'(done) {
        const dest = emptyMatrix (3) (3);
        emptyMatrix (3) (3).mapElementsPreAllocated (dest) (el => el.index);
       
        expect(
            matrixEquals
                (dest)
                ([ 0,1, 2, 3, 4, 5, 6, 7, 8 ])
        ).to.be.true;

        done();
    }

    'Elements Direct'(done) {
        const dest = emptyMatrix (3) (3);
        dest.mapElementsDirect(el => el.index);
       
        expect(
            matrixEquals
                (dest)
                ([ 0,1, 2, 3, 4, 5, 6, 7, 8 ])
        ).to.be.true;

        done();
    }
    
}



