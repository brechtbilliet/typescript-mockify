// these are the testinterfaces and testclasses we will use to test our mock functionality
import {Mock} from "./Mock";
import Spy = jasmine.Spy;
import {ConstructorArguments} from "./ConstructorArguments";
import {MockBuilder} from "./MockBuilder";

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

interface INoConstructor {
    stringVal: string;
    booleanVal: boolean;
    numberVal: number;
    objectVal: Object;
    foo(): void;
    bar(): string;
    baz(): number;
}
class NoConstructor implements INoConstructor {
    public stringVal: string = "dummystrval";
    public booleanVal: boolean = true;
    public numberVal: number = 0;
    public objectVal: Object = {};

    public foo(): void {
    }

    public bar(): string {
        return "dummystr";
    }

    public baz(): number {
        return 10;
    }

}
// actual tests
describe("MockBuilder", () => {
    var mock: Mock<IFoo>;
    var inheritedMock: Mock<IFoo>;
    var mockWithoutArguments: Mock<INoConstructor>;
    var constructorArguments: ConstructorArguments;
    beforeEach(() => {
        constructorArguments = new ConstructorArguments()
            .map("stringVal", "just a str")
            .map("booleanVal", true)
            .map("barVal", new Bar());
        mock = MockBuilder.createInstance<IFoo>(Foo, constructorArguments);
        inheritedMock = MockBuilder.createInstance<IFoo>(Baz, constructorArguments);
        mockWithoutArguments = MockBuilder.createInstance<INoConstructor>(NoConstructor);
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
            });
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
            });
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
    describe("for objects without constructor options", () => {
        describe("on createIntance(), the mocked object", () => {
            it("should return a mock object", () => {
                expect(mockWithoutArguments.hasOwnProperty("instance")).toBe(true);
                expect(mockWithoutArguments.hasOwnProperty("instance")).toBe(true);
            });
            it("should have all the functions defined", () => {
                expect(mockWithoutArguments.instance.foo).toBeDefined();
                expect(mockWithoutArguments.instance.bar).toBeDefined();
                expect(mockWithoutArguments.instance.baz).toBeDefined();
            });
            it("should have created spies for every function", () => {
                expect((<Spy>mockWithoutArguments.instance.foo).and).toBeDefined();
                expect((<Spy>mockWithoutArguments.instance.bar).and).toBeDefined();
                expect((<Spy>mockWithoutArguments.instance.baz).and).toBeDefined();
            });
            it("should have all the properties defined", () => {
                expect(mockWithoutArguments.instance.hasOwnProperty("stringVal")).toBe(true);
                expect(mockWithoutArguments.instance.hasOwnProperty("booleanVal")).toBe(true);
                expect(mockWithoutArguments.instance.hasOwnProperty("numberVal")).toBe(true);
                expect(mockWithoutArguments.instance.hasOwnProperty("objectVal")).toBe(true);

            });
            it("should have reset all the properties with default values", () => {
                expect(mockWithoutArguments.instance.stringVal).toEqual("");
                expect(mockWithoutArguments.instance.booleanVal).toEqual(false);
                expect(mockWithoutArguments.instance.numberVal).toEqual(0);
                expect(mockWithoutArguments.instance.objectVal).toEqual({});
            });
        });
        describe("on mapProperty() on the mock object", () => {
            it("should return the mock object", () => {
                var returnVal: any = mockWithoutArguments.mapProperty("numberVal", 100);
                expect(returnVal.hasOwnProperty("instance")).toBe(true);
            });
            it("should map the property on the stubbed object", () => {
                var barVal: IBar = new Bar();
                mockWithoutArguments.mapProperty("numberVal", 100)
                                    .mapProperty("booleanVal", true)
                                    .mapProperty("stringVal", "dummystr")
                                    .mapProperty("barVal", barVal);
                expect(mockWithoutArguments.instance.numberVal).toBe(100);
                expect(mockWithoutArguments.instance.booleanVal).toBe(true);
                expect(mockWithoutArguments.instance.stringVal).toBe("dummystr");
            });
        });
        describe("on setupMethod() on the mock object", () => {
            it("should return a stubbedFunc method for that method", () => {
                expect(mockWithoutArguments.setupMethod("bar").andReturn).toBeDefined();
            });
            describe("on andReturn() on the stubbedFunc method", () => {
                it("should cast the function to a spy and map the passed return value on it", () => {
                    mockWithoutArguments.setupMethod("bar")
                                        .andReturn("dummyValue")
                                        .setupMethod("baz")
                                        .andReturn(100);
                    expect(mockWithoutArguments.instance.bar()).toBe("dummyValue");
                    expect(mockWithoutArguments.instance.baz()).toBe(100);
                });
                it("should return the mock object", () => {
                    var returnObj: any = mockWithoutArguments.setupMethod("bar")
                                                             .andReturn("dummyValue")
                                                             .setupMethod("baz")
                                                             .andReturn(100);
                    expect(returnObj.hasOwnProperty("instance")).toBe(true);
                });
            });
            describe("on getSpy()", () => {
                it("should return the spy of the method", () => {
                    var spy: Spy = mockWithoutArguments
                        .setupMethod("bar")
                        .getSpy();
                    expect(spy.and).toBeDefined();
                });
            });
        });
    });
});

describe("MockBuilder: original context sanity check", () => {
    it("can create a mock", () => {
        const bar1: Bar = new Bar();
        expect(bar1.bar()).toBe("just a string");

        const barMock: Mock<IBar> = MockBuilder.createInstance<IBar>(Bar);
        expect(barMock.instance.bar()).toBe(undefined);

        const bar2: Bar = new Bar();
        expect(bar2.bar()).toBe("just a string");
    });

    it("can create a mock with a spied method", () => {
        const bar1: Bar = new Bar();
        expect(bar1.bar()).toBe("just a string");

        const barMock: Mock<IBar> = MockBuilder
            .createInstance<IBar>(Bar)
            .setupMethod("bar").andReturn("spied!");

        expect(barMock.instance.bar()).toBe("spied!");

        const bar2: Bar = new Bar();
        expect(bar2.bar()).toBe("just a string");
    });
});
