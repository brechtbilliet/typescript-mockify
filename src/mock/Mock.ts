import {ConstructorArguments} from "./ConstructorArguments";
import {StubbedFunc} from "./StubbedFunc";
import Spy = jasmine.Spy;
export class Mock<T> {
    constructor(public instance: T, public args?: ConstructorArguments) {
    }

    public setupSpy(func: string, spySetup: ((spy: Spy) => void)): Mock<T> {
        spySetup(<Spy>(this.instance[func]));
        return this;
    }

    public setupMethod(func: string): StubbedFunc<T> {
        return new StubbedFunc(this.instance[func], this);
    }

    public mapProperty(propertyName: string, value: any): Mock<T> {
        this.instance[propertyName] = value;
        return this;
    }
}