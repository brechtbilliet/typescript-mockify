import {StubbedFunc} from "./StubbedFunc";
import {MockBuilder} from "./MockBuilder";
import {Mock} from "./Mock";
import Spy = jasmine.Spy;

interface IFoo {
    method(): void;
}
class Foo implements IFoo {
    public method(): void {}
}

describe("StubbedFunc", () => {
    let underTest: StubbedFunc<IFoo>;
    let fooMock: Mock<IFoo>;

    beforeEach(() => {
        fooMock = new MockBuilder<IFoo>().createInstance(Foo);
        underTest = new StubbedFunc<IFoo>(fooMock.instance.method, fooMock);
    });

    describe("Constructing", () => {
        it("can construct a StubbedFunc", () => {
            expect(underTest).toBeDefined();
            expect(underTest instanceof StubbedFunc).toBe(true);

            expect(underTest.getSpy()).toBeDefined();
        });
    });

    describe("andReturn()", () => {
        it("sets up the spy", () => {
            _.times(10, () => {
                const expectedResult: number = Math.random();
                const result: any = underTest.andReturn(expectedResult).instance.method();
                expect(result).toBe(expectedResult);
            });
        });
    });

    describe("andCallFake()", () => {
        it("sets up the spy", () => {
            const spiedOnFunction: Spy = jasmine.createSpy("spy");
            underTest.andCallFake(spiedOnFunction).instance.method();
            expect(spiedOnFunction).toHaveBeenCalled();
        });
    });
});