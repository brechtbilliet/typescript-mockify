import { Mock } from "./Mock";
import { ConstructorArguments } from "./ConstructorArguments";
import { IConstructor } from "./IConstructor";
export declare class MockBuilder {
    static createInstance<T>(ctor: IConstructor<T>, args?: ConstructorArguments): Mock<T>;
    private static setDefaultVals(object, args?);
    private static createDefaultValue(type);
}
