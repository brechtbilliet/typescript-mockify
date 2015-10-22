import Spy = jasmine.Spy;
import {Mock} from "./Mock";
export class StubbedFunc<T> {
    constructor(private func: Function, private mock: Mock<T>) {}

    public and(jasmineMethod: string): ((...args: Array<any>) => Mock<T>) {
        return (...args: Array<any>): Mock<T> => {
            (<Spy>this.func).and[jasmineMethod](...args);
            return this.mock;
        };
    }

    public andReturn(value: any): Mock<T> {
        return this.and("returnValue")(value);
    }

    public andCallFake(fn: Function): Mock<T> {
        return this.and("callFake")(fn);
    }

    public getSpy(): Spy {
        return <Spy> this.func;
    }
}