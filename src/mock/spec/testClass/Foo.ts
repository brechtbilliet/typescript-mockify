import {IFoo} from "./IFoo";
import {IBar} from "./IBar";
export class Foo implements IFoo {
    public stringVal: string;
    public booleanVal: boolean;
    public numberVal: number;
    public objectVal: Object = {};

    constructor(stringVal: string, booleanVal: boolean, public barVal: IBar) {
        this.stringVal = stringVal;
        this.booleanVal = booleanVal;
        this.numberVal = 1000;
    }

    public foo(): void {
    }

    public bar(): string {
        return "just a string";
    }

    public baz(): number {
        return 1000;
    }

    public quux(args: Array<any>): void {
    }
}