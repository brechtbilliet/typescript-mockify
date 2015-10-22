var _ = require("lodash");
var StubbedFunc_1 = require("../StubbedFunc");
var MockBuilder_1 = require("../MockBuilder");
var Foo_1 = require("./testClass/Foo");
describe("StubbedFunc", function () {
    var underTest;
    var fooMock;
    beforeEach(function () {
        fooMock = new MockBuilder_1.MockBuilder().createInstance(Foo_1.Foo);
        underTest = new StubbedFunc_1.StubbedFunc(fooMock.instance.foo, fooMock);
    });
    describe("Constructing", function () {
        it("can construct a StubbedFunc", function () {
            expect(underTest).toBeDefined();
            expect(underTest instanceof StubbedFunc_1.StubbedFunc).toBe(true);
            expect(underTest.getSpy()).toBeDefined();
        });
    });
    describe("andReturn()", function () {
        it("sets up the spy", function () {
            _.times(10, function () {
                var expectedResult = Math.random();
                var result = underTest.andReturn(expectedResult).instance.foo();
                expect(result).toBe(expectedResult);
            });
        });
    });
    describe("andCallFake()", function () {
        it("sets up the spy", function () {
            var spiedOnFunction = jasmine.createSpy("spy");
            underTest.andCallFake(spiedOnFunction).instance.foo();
            expect(spiedOnFunction).toHaveBeenCalled();
        });
    });
});
