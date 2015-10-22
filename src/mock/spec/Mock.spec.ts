import {Mock} from "../Mock";
import {StubbedFunc} from "../StubbedFunc";
import Spy = jasmine.Spy;
import {INoConstructor} from "./testClass/INoConstructor";
import {NoConstructor} from "./testClass/NoConstructor";

describe("Mock", () => {
    let underTest: Mock<any>;
    let instance: INoConstructor;

    beforeEach(() => {
        instance = new NoConstructor();
        underTest = new Mock<any>(instance);
    });

    describe("setupMethod()", () => {
        it("returns a StubbedFunc", () => {
            const result: any = underTest.setupMethod("foo");
            expect(result).toBeDefined();
            expect(result instanceof StubbedFunc).toBe(true);
        });
    });

    describe("mapProperty()", () => {
        it("sets the property value (to itself and returns itself)", () => {
            const resultVal: string = "I im a result value";
            expect(underTest.instance.stringVal).toBe("dummystrval");

            const result: Mock<any> = underTest.mapProperty("stringVal", resultVal);
            expect(underTest.instance.stringVal).toBe(resultVal);
            expect(result.instance.stringVal).toBe(resultVal);
        });
    });

    describe("setupSpy()", () => {
        it("calls the setup with the correct spy (and returns itself)", () => {
            const spySetupSpy: Spy = jasmine.createSpy("spySetupSpy");
            const result: Mock<any> = underTest.setupSpy("foo", spySetupSpy);

            expect(spySetupSpy).toHaveBeenCalledWith(underTest.instance.foo);
            expect(result).toBe(underTest);
        });
    });
});