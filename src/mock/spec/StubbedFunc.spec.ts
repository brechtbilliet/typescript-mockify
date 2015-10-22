import * as _ from "lodash";
import {StubbedFunc} from "../StubbedFunc";
import {IFoo} from "./testClass/IFoo";
import {Mock} from "../Mock";
import {MockBuilder} from "../MockBuilder";
import {Foo} from "./testClass/Foo";
import Spy = jasmine.Spy;

describe("StubbedFunc", () => {
    let underTest: StubbedFunc<IFoo>;
    let fooMock: Mock<IFoo>;

    beforeEach(() => {
        fooMock = new MockBuilder<IFoo>().createInstance(Foo);
        underTest = new StubbedFunc<IFoo>(fooMock.instance.foo, fooMock);
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
                const result: any = underTest.andReturn(expectedResult).instance.foo();
                expect(result).toBe(expectedResult);
            });
        });
    });

    describe("andCallFake()", () => {
        it("sets up the spy", () => {
            const spiedOnFunction: Spy = jasmine.createSpy("spy");
            underTest.andCallFake(spiedOnFunction).instance.foo();
            expect(spiedOnFunction).toHaveBeenCalled();
        });
    });
});