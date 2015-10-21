export interface INoConstructor {
    stringVal: string;
    booleanVal: boolean;
    numberVal: number;
    objectVal: Object;
    foo(): void;
    bar(): string;
    baz(): number;
}