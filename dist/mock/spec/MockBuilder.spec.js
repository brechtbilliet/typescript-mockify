var Foo_1 = require("./testClass/Foo");
var MockBuilder_1 = require("../MockBuilder");
var ConstructorArguments_1 = require("../ConstructorArguments");
var Bar_1 = require("./testClass/Bar");
var Baz_1 = require("./testClass/Baz");
var NoConstructor_1 = require("./testClass/NoConstructor");
describe("Mockbuilder: on creating a builder", function () {
    describe("with instance constructor flag: false (default)", function () {
        it("can create a mock without calling the instance constructor", function () {
            var SpiedOnFoo = jasmine.createSpy("Foo").and.callFake(Foo_1.Foo);
            var mockFoo = new MockBuilder_1.MockBuilder().createInstance(SpiedOnFoo);
            expect(mockFoo.instance).toBeDefined();
            expect(SpiedOnFoo).not.toHaveBeenCalled();
            expect(mockFoo.instance.stringVal).toBeUndefined();
            expect(mockFoo.instance.booleanVal).toBeUndefined();
            expect(mockFoo.instance.numberVal).toBeUndefined();
        });
        it("does not set the properties from the constructorArgs", function () {
            var mockFoo = new MockBuilder_1.MockBuilder()
                .createInstance(Foo_1.Foo, new ConstructorArguments_1.ConstructorArguments()
                .map("stringVal", "str_val")
                .map("booleanVal", true)
                .map("numberVal", 169));
            expect(mockFoo.instance).toBeDefined();
            expect(mockFoo.instance.stringVal).toBeUndefined();
            expect(mockFoo.instance.booleanVal).toBeUndefined();
            expect(mockFoo.instance.numberVal).toBeUndefined();
        });
        it("can create a mock with overriden attributes", function () {
            var mock = new MockBuilder_1.MockBuilder()
                .createInstance(Foo_1.Foo)
                .mapProperty("stringVal", "str_val")
                .mapProperty("booleanVal", true)
                .mapProperty("numberVal", 169);
            expect(mock.instance.stringVal).toBe("str_val");
            expect(mock.instance.booleanVal).toBe(true);
            expect(mock.instance.numberVal).toBe(169);
        });
    });
    describe("with instance constructor flag: true", function () {
        it("calls the instance constructor", function () {
            var SpiesOnFoo = jasmine.createSpy("Foo").and.callFake(Foo_1.Foo);
            var mockFoo = new MockBuilder_1.MockBuilder(true).createInstance(SpiesOnFoo);
            expect(mockFoo.instance).toBeDefined();
            expect(SpiesOnFoo).toHaveBeenCalled();
        });
        it("calls the instance constructor using the builder-notation", function () {
            var SpiesOnFoo = jasmine.createSpy("Foo").and.callFake(Foo_1.Foo);
            var mockFoo = new MockBuilder_1.MockBuilder()
                .withCallConstructor(true)
                .createInstance(SpiesOnFoo);
            expect(mockFoo.instance).toBeDefined();
            expect(SpiesOnFoo).toHaveBeenCalled();
        });
    });
});
describe("MockBuilder", function () {
    var mock;
    var inheritedMock;
    var mockWithoutArguments;
    var constructorArguments;
    beforeEach(function () {
        constructorArguments = new ConstructorArguments_1.ConstructorArguments()
            .map("stringVal", "just a str")
            .map("booleanVal", true)
            .map("barVal", new Bar_1.Bar());
        mock = new MockBuilder_1.MockBuilder(true).createInstance(Foo_1.Foo, constructorArguments);
        inheritedMock = new MockBuilder_1.MockBuilder(true).createInstance(Baz_1.Baz, constructorArguments);
        mockWithoutArguments = new MockBuilder_1.MockBuilder(true).createInstance(NoConstructor_1.NoConstructor);
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
                var barVal = new Bar_1.Bar();
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
            describe("on andCallFake() on the stubbedFunc method", function () {
                it("should cast the function to a spy and call the passed value ", function () {
                    var spyFunction = jasmine.createSpy("spiedFunction");
                    mock.setupMethod("bar").andCallFake(spyFunction);
                    mock.instance.bar();
                    expect(spyFunction).toHaveBeenCalled();
                });
                it("should propagate all method arguments to the replacementFunction", function () {
                    var spyFunction = jasmine.createSpy("spiedFunction");
                    var args = ["i", "am", "an", "argument", "list"];
                    mock.setupMethod("quux").andCallFake(spyFunction);
                    mock.instance.quux(args);
                    expect(spyFunction).toHaveBeenCalledWith(args);
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
                var barVal = new Bar_1.Bar();
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
    describe("for objects without constructor options", function () {
        describe("on createIntance(), the mocked object", function () {
            it("should return a mock object", function () {
                expect(mockWithoutArguments.hasOwnProperty("instance")).toBe(true);
                expect(mockWithoutArguments.hasOwnProperty("instance")).toBe(true);
            });
            it("should have all the functions defined", function () {
                expect(mockWithoutArguments.instance.foo).toBeDefined();
                expect(mockWithoutArguments.instance.bar).toBeDefined();
                expect(mockWithoutArguments.instance.baz).toBeDefined();
            });
            it("should have created spies for every function", function () {
                expect(mockWithoutArguments.instance.foo.and).toBeDefined();
                expect(mockWithoutArguments.instance.bar.and).toBeDefined();
                expect(mockWithoutArguments.instance.baz.and).toBeDefined();
            });
            it("should have all the properties defined", function () {
                expect(mockWithoutArguments.instance.hasOwnProperty("stringVal")).toBe(true);
                expect(mockWithoutArguments.instance.hasOwnProperty("booleanVal")).toBe(true);
                expect(mockWithoutArguments.instance.hasOwnProperty("numberVal")).toBe(true);
                expect(mockWithoutArguments.instance.hasOwnProperty("objectVal")).toBe(true);
            });
            it("should have reset all the properties with default values", function () {
                expect(mockWithoutArguments.instance.stringVal).toEqual("");
                expect(mockWithoutArguments.instance.booleanVal).toEqual(false);
                expect(mockWithoutArguments.instance.numberVal).toEqual(0);
                expect(mockWithoutArguments.instance.objectVal).toEqual({});
            });
        });
        describe("on mapProperty() on the mock object", function () {
            it("should return the mock object", function () {
                var returnVal = mockWithoutArguments.mapProperty("numberVal", 100);
                expect(returnVal.hasOwnProperty("instance")).toBe(true);
            });
            it("should map the property on the stubbed object", function () {
                var barVal = new Bar_1.Bar();
                mockWithoutArguments.mapProperty("numberVal", 100)
                    .mapProperty("booleanVal", true)
                    .mapProperty("stringVal", "dummystr")
                    .mapProperty("barVal", barVal);
                expect(mockWithoutArguments.instance.numberVal).toBe(100);
                expect(mockWithoutArguments.instance.booleanVal).toBe(true);
                expect(mockWithoutArguments.instance.stringVal).toBe("dummystr");
            });
        });
        describe("on setupMethod() on the mock object", function () {
            it("should return a stubbedFunc method for that method", function () {
                expect(mockWithoutArguments.setupMethod("bar").andReturn).toBeDefined();
            });
            describe("on andReturn() on the stubbedFunc method", function () {
                it("should cast the function to a spy and map the passed return value on it", function () {
                    mockWithoutArguments.setupMethod("bar")
                        .andReturn("dummyValue")
                        .setupMethod("baz")
                        .andReturn(100);
                    expect(mockWithoutArguments.instance.bar()).toBe("dummyValue");
                    expect(mockWithoutArguments.instance.baz()).toBe(100);
                });
                it("should return the mock object", function () {
                    var returnObj = mockWithoutArguments.setupMethod("bar")
                        .andReturn("dummyValue")
                        .setupMethod("baz")
                        .andReturn(100);
                    expect(returnObj.hasOwnProperty("instance")).toBe(true);
                });
            });
            describe("on getSpy()", function () {
                it("should return the spy of the method", function () {
                    var spy = mockWithoutArguments
                        .setupMethod("bar")
                        .getSpy();
                    expect(spy.and).toBeDefined();
                });
            });
        });
    });
});
describe("MockBuilder: original context sanity check", function () {
    it("can create a mock", function () {
        var bar1 = new Bar_1.Bar();
        expect(bar1.bar()).toBe("just a string");
        var barMock = new MockBuilder_1.MockBuilder().createInstance(Bar_1.Bar);
        expect(barMock.instance.bar()).toBe(undefined);
        var bar2 = new Bar_1.Bar();
        expect(bar2.bar()).toBe("just a string");
    });
    it("can create a mock with a spied method", function () {
        var bar1 = new Bar_1.Bar();
        expect(bar1.bar()).toBe("just a string");
        var barMock = new MockBuilder_1.MockBuilder()
            .createInstance(Bar_1.Bar)
            .setupMethod("bar").andReturn("spied!");
        expect(barMock.instance.bar()).toBe("spied!");
        var bar2 = new Bar_1.Bar();
        expect(bar2.bar()).toBe("just a string");
    });
});
