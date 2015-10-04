// these are the testinterfaces and testclasses we will use to test our mock functionality
import {MockBuilder} from "./MockBuilder";
import {Mock} from "./Mock";
import Spy = jasmine.Spy;
import {ConstructorArguments} from "./ConstructorArguments";

interface IFoo {
    stringVal: string;
    booleanVal: boolean;
    numberVal: number;
    objectVal: Object;
    barVal: IBar;

    foo(): void;
    bar(): string;
    baz(): number;
}
interface IBar {
    foo: string;
    bar(): string;
}

class Foo implements IFoo {
    public stringVal: string;
    public booleanVal: boolean;
    public numberVal: number;
    public objectVal: Object = {};

    constructor(stringVal: string, booleanVal: boolean, public barVal: IBar) {
        this.stringVal = stringVal;
        this.booleanVal = booleanVal;
        this.numberVal = 1000;
    }

    public foo(): void {
    }

    public bar(): string {
        return "just a string";
    }

    public baz(): number {
        return 1000;
    }
}
class Bar implements IBar {
    public foo: string;

    public bar(): string {
        return "just a string";
    }
}

class BazParent {
    public numberVal: number;
    public objectVal: Object = {};

    constructor(public stringVal: string) {
        this.numberVal = 1000;

    }

    public foo(): void {
    }

    public bar(): string {
        return "just a string";
    }
}
class Baz extends BazParent implements IFoo {
    public booleanVal: boolean;

    constructor(stringVal: string, booleanVal: boolean, public barVal: IBar) {
        super(stringVal);
        this.booleanVal = booleanVal;
    }

    public baz(): number {
        return 1000;
    }
}

// actual tests
describe("MockBuilder", () => {
    var mock: Mock<IFoo>;
    var inheritedMock: Mock<IFoo>;
    var constructorArguments: ConstructorArguments;
    beforeEach(() => {
        constructorArguments = new ConstructorArguments()
            .map("stringVal", "just a str")
            .map("booleanVal", true)
            .map("barVal", new Bar())
        mock = MockBuilder.createInstance<IFoo>(Foo, constructorArguments);
        inheritedMock = MockBuilder.createInstance<IFoo>(Baz, constructorArguments);
    });

    describe("for normal objects", () => {
        describe("on createIntance(), the mocked object", () => {
            it("should return a mock object", () => {
                expect(mock.hasOwnProperty("instance")).toBe(true);
                expect(mock.hasOwnProperty("instance")).toBe(true);
            });
            it("should have all the functions defined", () => {
                expect(mock.instance.foo).toBeDefined();
                expect(mock.instance.bar).toBeDefined();
                expect(mock.instance.baz).toBeDefined();
            });
            it("should have created spies for every function", () => {
                expect((<Spy>mock.instance.foo).and).toBeDefined();
                expect((<Spy>mock.instance.bar).and).toBeDefined();
                expect((<Spy>mock.instance.baz).and).toBeDefined();
            });
            it("should have all the properties defined", () => {
                expect(mock.instance.hasOwnProperty("stringVal")).toBe(true);
                expect(mock.instance.hasOwnProperty("booleanVal")).toBe(true);
                expect(mock.instance.hasOwnProperty("numberVal")).toBe(true);
                expect(mock.instance.hasOwnProperty("objectVal")).toBe(true);

            });
            it("should have reset all the properties with default values except the ones provided in the constructor", () => {
                expect(mock.instance.stringVal).toEqual(constructorArguments.arguments.stringVal);
                expect(mock.instance.booleanVal).toEqual(constructorArguments.arguments.booleanVal);
                expect(mock.instance.numberVal).toEqual(0);
                expect(mock.instance.objectVal).toEqual({});
                expect(mock.instance.barVal).toEqual(constructorArguments.arguments.barVal);
            });
        });
        describe("on mapProperty() on the mock object", () => {
            it("should return the mock object", () => {
                var returnVal: any = mock.mapProperty("numberVal", 100);
                expect(returnVal.hasOwnProperty("instance")).toBe(true);
            });
            it("should map the property on the stubbed object", () => {
                var barVal: IBar = new Bar();
                mock.mapProperty("numberVal", 100)
                    .mapProperty("booleanVal", true)
                    .mapProperty("stringVal", "dummystr")
                    .mapProperty("barVal", barVal);
                expect(mock.instance.numberVal).toBe(100);
                expect(mock.instance.booleanVal).toBe(true);
                expect(mock.instance.stringVal).toBe("dummystr");
                expect(mock.instance.barVal).toBe(barVal);
            });
        });
        describe("on setupMethod() on the mock object", () => {
            it("should return a stubbedFunc method for that method", () => {
                expect(mock.setupMethod("bar").andReturn).toBeDefined();
            });
            describe("on andReturn() on the stubbedFunc method", () => {
                it("should cast the function to a spy and map the passed return value on it", () => {
                    mock.setupMethod("bar")
                        .andReturn("dummyValue")
                        .setupMethod("baz")
                        .andReturn(100);
                    expect(mock.instance.bar()).toBe("dummyValue");
                    expect(mock.instance.baz()).toBe(100);
                });
                it("should return the mock object", () => {
                    var returnObj: any = mock.setupMethod("bar")
                        .andReturn("dummyValue")
                        .setupMethod("baz")
                        .andReturn(100);
                    expect(returnObj.hasOwnProperty("instance")).toBe(true);
                });
            })
            describe("on getSpy()", () => {
                it("should return the spy of the method", () => {
                    var spy: Spy = mock
                        .setupMethod("bar")
                        .getSpy();
                    expect(spy.and).toBeDefined();
                });
            });
        });
    });
    describe("for inherited objects", () => {
        describe("on createIntance(), the mocked object", () => {
            it("should return a mock object", () => {
                expect(inheritedMock.hasOwnProperty("instance")).toBe(true);
                expect(inheritedMock.hasOwnProperty("instance")).toBe(true);
            });
            it("should have all the functions defined", () => {
                expect(inheritedMock.instance.foo).toBeDefined();
                expect(inheritedMock.instance.bar).toBeDefined();
                expect(inheritedMock.instance.baz).toBeDefined();
            });
            it("should have created spies for every function", () => {
                expect((<Spy>inheritedMock.instance.foo).and).toBeDefined();
                expect((<Spy>inheritedMock.instance.bar).and).toBeDefined();
                expect((<Spy>inheritedMock.instance.baz).and).toBeDefined();
            });
            it("should have all the properties defined", () => {
                expect(inheritedMock.instance.hasOwnProperty("stringVal")).toBe(true);
                expect(inheritedMock.instance.hasOwnProperty("booleanVal")).toBe(true);
                expect(inheritedMock.instance.hasOwnProperty("numberVal")).toBe(true);
                expect(inheritedMock.instance.hasOwnProperty("objectVal")).toBe(true);

            });
            it("should have reset all the properties with default values", () => {
                expect(inheritedMock.instance.stringVal).toEqual(constructorArguments.arguments.stringVal);
                expect(inheritedMock.instance.booleanVal).toEqual(constructorArguments.arguments.booleanVal);
                expect(inheritedMock.instance.numberVal).toEqual(0);
                expect(inheritedMock.instance.objectVal).toEqual({});
                expect(inheritedMock.instance.barVal).toEqual(constructorArguments.arguments.barVal);
            });
        });
        describe("on mapProperty() on the mock object", () => {
            it("should return the mock object", () => {
                var returnVal: any = inheritedMock.mapProperty("numberVal", 100);
                expect(returnVal.hasOwnProperty("instance")).toBe(true);
            });
            it("should map the property on the stubbed object", () => {
                var barVal: IBar = new Bar();
                inheritedMock.mapProperty("numberVal", 100)
                    .mapProperty("booleanVal", true)
                    .mapProperty("stringVal", "dummystr")
                    .mapProperty("barVal", barVal);
                expect(inheritedMock.instance.numberVal).toBe(100);
                expect(inheritedMock.instance.booleanVal).toBe(true);
                expect(inheritedMock.instance.stringVal).toBe("dummystr");
                expect(inheritedMock.instance.barVal).toBe(barVal);
            });
        });
        describe("on setupMethod() on the mock object", () => {
            it("should return a stubbedFunc method for that method", () => {
                expect(inheritedMock.setupMethod("bar").andReturn).toBeDefined();
            });
            describe("on andReturn() on the stubbedFunc method", () => {
                it("should cast the function to a spy and map the passed return value on it", () => {
                    inheritedMock.setupMethod("bar")
                        .andReturn("dummyValue")
                        .setupMethod("baz")
                        .andReturn(100);
                    expect(inheritedMock.instance.bar()).toBe("dummyValue");
                    expect(inheritedMock.instance.baz()).toBe(100);
                });
                it("should return the mock object", () => {
                    var returnObj: any = inheritedMock.setupMethod("bar")
                        .andReturn("dummyValue")
                        .setupMethod("baz")
                        .andReturn(100);
                    expect(returnObj.hasOwnProperty("instance")).toBe(true);
                });
            })
            describe("on getSpy()", () => {
                it("should return the spy of the method", () => {
                    var spy: Spy = inheritedMock
                        .setupMethod("bar")
                        .getSpy();
                    expect(spy.and).toBeDefined();
                });
            });
        });
    });
});
