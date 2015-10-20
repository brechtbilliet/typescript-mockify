import Spy = jasmine.Spy;
import {Mock} from "./Mock";
export class StubbedFunc<T> {
    constructor(private func: Function, private mock: Mock<T>) {
    }

    public andReturn(value: any): Mock<T> {
        (<Spy>this.func).and.returnValue(value);
        return this.mock;
    }
    
    public andCallFake(fn: Function): Mock<T> {
        (<Spy>this.func).and.callFake(fn);
        return this.mock;
    }

    public getSpy(): Spy {
        return <Spy> this.func;
    }
}