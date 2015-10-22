var Mock_1 = require("../Mock");
var StubbedFunc_1 = require("../StubbedFunc");
var NoConstructor_1 = require("./testClass/NoConstructor");
describe("Mock", function () {
    var underTest;
    var instance;
    beforeEach(function () {
        instance = new NoConstructor_1.NoConstructor();
        underTest = new Mock_1.Mock(instance);
    });
    describe("setupMethod()", function () {
        it("returns a StubbedFunc", function () {
            var result = underTest.setupMethod("foo");
            expect(result).toBeDefined();
            expect(result instanceof StubbedFunc_1.StubbedFunc).toBe(true);
        });
    });
    describe("mapProperty()", function () {
        it("sets the property value (to itself and returns itself)", function () {
            var resultVal = "I im a result value";
            expect(underTest.instance.stringVal).toBe("dummystrval");
            var result = underTest.mapProperty("stringVal", resultVal);
            expect(underTest.instance.stringVal).toBe(resultVal);
            expect(result.instance.stringVal).toBe(resultVal);
        });
    });
    describe("setupSpy()", function () {
        it("calls the setup with the correct spy (and returns itself)", function () {
            var spySetupSpy = jasmine.createSpy("spySetupSpy");
            var result = underTest.setupSpy("foo", spySetupSpy);
            expect(spySetupSpy).toHaveBeenCalledWith(underTest.instance.foo);
            expect(result).toBe(underTest);
        });
    });
});
