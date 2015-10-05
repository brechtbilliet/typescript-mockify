var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MockBuilder_1 = require("./MockBuilder");
var ConstructorArguments_1 = require("./ConstructorArguments");
var Foo = (function () {
    function Foo(stringVal, booleanVal, barVal) {
        this.barVal = barVal;
        this.objectVal = {};
        this.stringVal = stringVal;
        this.booleanVal = booleanVal;
        this.numberVal = 1000;
    }
    Foo.prototype.foo = function () {
    };
    Foo.prototype.bar = function () {
        return "just a string";
    };
    Foo.prototype.baz = function () {
        return 1000;
    };
    return Foo;
})();
var Bar = (function () {
    function Bar() {
    }
    Bar.prototype.bar = function () {
        return "just a string";
    };
    return Bar;
})();
var BazParent = (function () {
    function BazParent(stringVal) {
        this.stringVal = stringVal;
        this.objectVal = {};
        this.numberVal = 1000;
    }
    BazParent.prototype.foo = function () {
    };
    BazParent.prototype.bar = function () {
        return "just a string";
    };
    return BazParent;
})();
var Baz = (function (_super) {
    __extends(Baz, _super);
    function Baz(stringVal, booleanVal, barVal) {
        _super.call(this, stringVal);
        this.barVal = barVal;
        this.booleanVal = booleanVal;
    }
    Baz.prototype.baz = function () {
        return 1000;
    };
    return Baz;
})(BazParent);
describe("MockBuilder", function () {
    var mock;
    var inheritedMock;
    var constructorArguments;
    beforeEach(function () {
        constructorArguments = new ConstructorArguments_1.ConstructorArguments()
            .map("stringVal", "just a str")
            .map("booleanVal", true)
            .map("barVal", new Bar());
        mock = MockBuilder_1.MockBuilder.createInstance(Foo, constructorArguments);
        inheritedMock = MockBuilder_1.MockBuilder.createInstance(Baz, constructorArguments);
    });
    describe("for normal objects", function () {
        describe("on createIntance(), the mocked object", function () {
            it("should return a mock object", function () {
                expect(mock.hasOwnProperty("instance")).toBe(true);
                expect(mock.hasOwnProperty("instance")).toBe(true);
            });
            it("should have all the functions defined", function () {
                expect(mock.instance.foo).toBeDefined();
                expect(mock.instance.bar).toBeDefined();
                expect(mock.instance.baz).toBeDefined();
            });
            it("should have created spies for every function", function () {
                expect(mock.instance.foo.and).toBeDefined();
                expect(mock.instance.bar.and).toBeDefined();
                expect(mock.instance.baz.and).toBeDefined();
            });
            it("should have all the properties defined", function () {
                expect(mock.instance.hasOwnProperty("stringVal")).toBe(true);
                expect(mock.instance.hasOwnProperty("booleanVal")).toBe(true);
                expect(mock.instance.hasOwnProperty("numberVal")).toBe(true);
                expect(mock.instance.hasOwnProperty("objectVal")).toBe(true);
            });
            it("should have reset all the properties with default values except the ones provided in the constructor", function () {
                expect(mock.instance.stringVal).toEqual(constructorArguments.arguments.stringVal);
                expect(mock.instance.booleanVal).toEqual(constructorArguments.arguments.booleanVal);
                expect(mock.instance.numberVal).toEqual(0);
                expect(mock.instance.objectVal).toEqual({});
                expect(mock.instance.barVal).toEqual(constructorArguments.arguments.barVal);
            });
        });
        describe("on mapProperty() on the mock object", function () {
            it("should return the mock object", function () {
                var returnVal = mock.mapProperty("numberVal", 100);
                expect(returnVal.hasOwnProperty("instance")).toBe(true);
            });
            it("should map the property on the stubbed object", function () {
                var barVal = new Bar();
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
        describe("on setupMethod() on the mock object", function () {
            it("should return a stubbedFunc method for that method", function () {
                expect(mock.setupMethod("bar").andReturn).toBeDefined();
            });
            describe("on andReturn() on the stubbedFunc method", function () {
                it("should cast the function to a spy and map the passed return value on it", function () {
                    mock.setupMethod("bar")
                        .andReturn("dummyValue")
                        .setupMethod("baz")
                        .andReturn(100);
                    expect(mock.instance.bar()).toBe("dummyValue");
                    expect(mock.instance.baz()).toBe(100);
                });
                it("should return the mock object", function () {
                    var returnObj = mock.setupMethod("bar")
                        .andReturn("dummyValue")
                        .setupMethod("baz")
                        .andReturn(100);
                    expect(returnObj.hasOwnProperty("instance")).toBe(true);
                });
            });
            describe("on getSpy()", function () {
                it("should return the spy of the method", function () {
                    var spy = mock
                        .setupMethod("bar")
                        .getSpy();
                    expect(spy.and).toBeDefined();
                });
            });
        });
    });
    describe("for inherited objects", function () {
        describe("on createIntance(), the mocked object", function () {
            it("should return a mock object", function () {
                expect(inheritedMock.hasOwnProperty("instance")).toBe(true);
                expect(inheritedMock.hasOwnProperty("instance")).toBe(true);
            });
            it("should have all the functions defined", function () {
                expect(inheritedMock.instance.foo).toBeDefined();
                expect(inheritedMock.instance.bar).toBeDefined();
                expect(inheritedMock.instance.baz).toBeDefined();
            });
            it("should have created spies for every function", function () {
                expect(inheritedMock.instance.foo.and).toBeDefined();
                expect(inheritedMock.instance.bar.and).toBeDefined();
                expect(inheritedMock.instance.baz.and).toBeDefined();
            });
            it("should have all the properties defined", function () {
                expect(inheritedMock.instance.hasOwnProperty("stringVal")).toBe(true);
                expect(inheritedMock.instance.hasOwnProperty("booleanVal")).toBe(true);
                expect(inheritedMock.instance.hasOwnProperty("numberVal")).toBe(true);
                expect(inheritedMock.instance.hasOwnProperty("objectVal")).toBe(true);
            });
            it("should have reset all the properties with default values", function () {
                expect(inheritedMock.instance.stringVal).toEqual(constructorArguments.arguments.stringVal);
                expect(inheritedMock.instance.booleanVal).toEqual(constructorArguments.arguments.booleanVal);
                expect(inheritedMock.instance.numberVal).toEqual(0);
                expect(inheritedMock.instance.objectVal).toEqual({});
                expect(inheritedMock.instance.barVal).toEqual(constructorArguments.arguments.barVal);
            });
        });
        describe("on mapProperty() on the mock object", function () {
            it("should return the mock object", function () {
                var returnVal = inheritedMock.mapProperty("numberVal", 100);
                expect(returnVal.hasOwnProperty("instance")).toBe(true);
            });
            it("should map the property on the stubbed object", function () {
                var barVal = new Bar();
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
        describe("on setupMethod() on the mock object", function () {
            it("should return a stubbedFunc method for that method", function () {
                expect(inheritedMock.setupMethod("bar").andReturn).toBeDefined();
            });
            describe("on andReturn() on the stubbedFunc method", function () {
                it("should cast the function to a spy and map the passed return value on it", function () {
                    inheritedMock.setupMethod("bar")
                        .andReturn("dummyValue")
                        .setupMethod("baz")
                        .andReturn(100);
                    expect(inheritedMock.instance.bar()).toBe("dummyValue");
                    expect(inheritedMock.instance.baz()).toBe(100);
                });
                it("should return the mock object", function () {
                    var returnObj = inheritedMock.setupMethod("bar")
                        .andReturn("dummyValue")
                        .setupMethod("baz")
                        .andReturn(100);
                    expect(returnObj.hasOwnProperty("instance")).toBe(true);
                });
            });
            describe("on getSpy()", function () {
                it("should return the spy of the method", function () {
                    var spy = inheritedMock
                        .setupMethod("bar")
                        .getSpy();
                    expect(spy.and).toBeDefined();
                });
            });
        });
    });
});
