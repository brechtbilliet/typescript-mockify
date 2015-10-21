import {INoConstructor} from "./INoConstructor";
export class NoConstructor implements INoConstructor {
    public stringVal: string = "dummystrval";
    public booleanVal: boolean = true;
    public numberVal: number = 0;
    public objectVal: Object = {};

    public foo(): void {
    }

    public bar(): string {
        return "dummystr";
    }

    public baz(): number {
        return 10;
    }
}