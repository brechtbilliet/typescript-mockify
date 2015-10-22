export class BazParent {
    public numberVal: number;
    public objectVal: Object = {};

    constructor(public stringVal: string) {
        this.numberVal = 1000;

    }

    public foo(): void {
    }

    public bar(): string {
        return "just a string";
    }

    public quux(args: Array<any>): void {
    }
}