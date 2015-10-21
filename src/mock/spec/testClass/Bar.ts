import {IBar} from "./IBar";
export class Bar implements IBar {
    public foo: string;

    public bar(): string {
        return "just a string";
    }
}