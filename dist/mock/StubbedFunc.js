var StubbedFunc = (function () {
    function StubbedFunc(func, mock) {
        this.func = func;
        this.mock = mock;
    }
    StubbedFunc.prototype.andReturn = function (value) {
        this.func.and.returnValue(value);
        return this.mock;
    };
    StubbedFunc.prototype.andCallFake = function (fn) {
        this.func.and.callFake(fn);
        return this.mock;
    };
    StubbedFunc.prototype.getSpy = function () {
        return this.func;
    };
    return StubbedFunc;
})();
exports.StubbedFunc = StubbedFunc;
