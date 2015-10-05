export interface IConstructor<T> {
    prototype: any;
    apply(inst: any, args: Array<any>): void;
}
