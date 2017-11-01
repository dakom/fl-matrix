import {Matrix} from "../matrix/Matrix";

export class Vector extends Matrix {
    constructor(nRows:number, elements?:Float32Array) {
        super (1, nRows, elements);
    }

    //1
    public get x():number {
        return this.elements[0];
    }
    public get width():number {
        return this.elements[0];
    }
    public get r():number {
        return this.elements[0];
    }

    //2
    public get y():number {
        return this.elements[1];
    }
    public get height():number {
        return this.elements[1];
    }
    public get g():number {
        return this.elements[1];
    }

    //3
    public get z():number {
        return this.elements[2];
    }
    public get depth():number {
        return this.elements[2];
    }
    public get b():number {
        return this.elements[2];
    }

    //4
    public get w():number {
        return this.elements[3];
    }

    public get hyperspace():number {
        return this.elements[3];
    }
    public get a():number {
        return this.elements[3];
    }
}


export const emptyVector = (nRows:number):Vector =>
    new Vector(nRows);

export const zeroVector = (nRows:number):Vector => {
    const v = emptyVector(nRows);
    v.elements.fill(0);
    return v;
}

export const vectorFromElements = (elements:ArrayLike<number>):Vector => {

    const v = emptyVector(elements.length);
    v.elements.set(elements);
    return v;
}

export const vectorFromElementsDirect = (elements:Float32Array):Vector =>
    new Vector(elements.length, elements);

export const vectorPropToIndex = (prop:string) => {
    switch(prop) {
        case "x":
        case "width":
        case "r":
            return 0;
        case "y":
        case "height":
        case "g":
            return 1;
        case "z":
        case "depth":
        case "b":
            return 2;
        case "w":
        case "hyperspace":
        case "a":
            return 3;
        default: return -1;
    }
}