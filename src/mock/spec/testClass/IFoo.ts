import {IBar} from "./IBar";
export interface IFoo {
    stringVal: string;
    booleanVal: boolean;
    numberVal: number;
    objectVal: Object;
    barVal: IBar;

    foo(): void;
    bar(): string;
    baz(): number;
    quux(args: Array<any>): void;
}