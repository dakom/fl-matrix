
import { expect } from 'chai';
import {Matrix, emptyMatrix, zeroMatrix} from "../../lib/LibMain";
import {matrixEquals, S} from "./TestLibs";

//ReduceElements and ReduceDirect are also tested via Map()

export class Reduce {
    'Regular'(done) {
        const m = zeroMatrix (3) (3);
        const empty = zeroMatrix (3) (3);

        empty.reduce(dest => es => {
            es.set((es.map(() => 1)));
            dest.elements.set(es);
            return dest;
        })
        (m);
       
        expect(
            matrixEquals
                (m)
                ([ 1, 1, 1, 1, 1, 1, 1, 1, 1 ])
        ).to.be.true;

        expect(
            matrixEquals
                (empty)
                ([ 0, 0, 0, 0, 0, 0, 0, 0, 0 ])
        ).to.be.true;

        done();
    }

    'Fantasyland / Sanctuary'(done) {
        const empty = zeroMatrix (3) (3);
        const m = zeroMatrix (3) (3);

        const copy = S.reduce(dest => es => {
            es.set((es.map(() => 1)));
            dest.elements.set(es);
            return dest;
        },m, empty);

        expect(
            matrixEquals
                (m)
                ([ 1, 1, 1, 1, 1, 1, 1, 1, 1 ])
        ).to.be.true;

        expect(
            matrixEquals
                (copy)
                ([ 1, 1, 1, 1, 1, 1, 1, 1, 1 ])
        ).to.be.true;

        expect(
            matrixEquals
                (empty)
                ([ 0, 0, 0, 0, 0, 0, 0, 0, 0 ])
        ).to.be.true;

        done();
    }

    'Direct'(done) {
        const m = zeroMatrix (3) (3);
        const empty = zeroMatrix (3) (3);

        empty.reduceDirect(dest => es => {
            es.set((es.map(() => 1)));
            dest.elements.set(es);
            return dest;
        })
        (m);
        
        expect(
            matrixEquals
                (m)
                ([ 1, 1, 1, 1, 1, 1, 1, 1, 1 ])
        ).to.be.true;

        expect(
            matrixEquals
                (empty)
                ([ 1, 1, 1, 1, 1, 1, 1, 1, 1 ])
        ).to.be.true;

        done();
    }


    'Elements - Remove dimension'(done) {
        const seq3d = emptyMatrix(3) (3).mapElements(el => el.index);
        
        const seq2d = 
            seq3d.reduceElements
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

    'Elements - Add dimension'(done) {
        const seq3d = emptyMatrix(3) (3).mapElements(el => el.index);
        
        const seq4d = 
            seq3d.reduceElements
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



