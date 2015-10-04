import {ConstructorArguments} from "./ConstructorArguments";
import {StubbedFunc} from "./StubbedFunc";
export class Mock<T> {
    constructor(public instance: T, public args?: ConstructorArguments) {
    }

    public setupMethod(func: string): StubbedFunc<T> {
        return new StubbedFunc(this.instance[func], this);
    }

    public mapProperty(propertyName: string, value: any): Mock<T> {
        this.instance[propertyName] = value;
        return this;
    }
}