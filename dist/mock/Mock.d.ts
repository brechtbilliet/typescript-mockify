import { ConstructorArguments } from "./ConstructorArguments";
import { StubbedFunc } from "./StubbedFunc";
export declare class Mock<T> {
    instance: T;
    args: ConstructorArguments;
    constructor(instance: T, args?: ConstructorArguments);
    setupMethod(func: string): StubbedFunc<T>;
    mapProperty(propertyName: string, value: any): Mock<T>;
}
