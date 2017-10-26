
import { expect } from 'chai';
import { Matrix, emptyMatrix, matrixFromElements } from "../../lib/LibMain";
import { S, matrixEquals } from "./TestLibs";

//Also see Compose

export class Identity {

    'Direct'(done) {

        expect(
            matrixEquals
                (emptyMatrix(3)(3).id())
                ([1, 0, 0, 0, 1, 0, 0, 0, 1])
        ).to.be.true;

        expect(
            matrixEquals
                (emptyMatrix(3)(2).id())
                ([1, 0, 0, 1, 0, 0])
        ).to.be.true;

        expect(
            matrixEquals
                (emptyMatrix(2)(3).id())
                ([1, 0, 0, 0, 1, 0])
        ).to.be.true;
        done();
    }

    'Sanctuary'(done) {

        expect(
            matrixEquals
                (S.id(emptyMatrix(3)(3)))
                ([1, 0, 0, 0, 1, 0, 0, 0, 1])
        ).to.be.true;

        expect(
            matrixEquals
                (S.id(emptyMatrix(3)(2)))
                ([1, 0, 0, 1, 0, 0])
        ).to.be.true;

        expect(
            matrixEquals
                (S.id(emptyMatrix(2)(3)))
                ([1, 0, 0, 0, 1, 0])
        ).to.be.true;
        done();
    }
}