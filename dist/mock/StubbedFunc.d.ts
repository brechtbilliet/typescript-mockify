import Spy = jasmine.Spy;
import { Mock } from "./Mock";
export declare class StubbedFunc<T> {
    private func;
    private mock;
    constructor(func: Function, mock: Mock<T>);
    andReturn(value: any): Mock<T>;
    getSpy(): Spy;
}
