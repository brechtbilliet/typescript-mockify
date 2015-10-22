import {BazParent} from "./BazParent";
import {IFoo} from "./IFoo";
import {IBar} from "./IBar";
export class Baz extends BazParent implements IFoo {
    public booleanVal: boolean;

    constructor(stringVal: string, booleanVal: boolean, public barVal: IBar) {
        super(stringVal);
        this.booleanVal = booleanVal;
    }

    public baz(): number {
        return 1000;
    }
}