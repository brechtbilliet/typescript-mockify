var StubbedFunc = (function () {
    function StubbedFunc(func, mock) {
        this.func = func;
        this.mock = mock;
    }
    StubbedFunc.prototype.and = function (jasmineMethod) {
        var _this = this;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            (_a = _this.func.and)[jasmineMethod].apply(_a, args);
            return _this.mock;
            var _a;
        };
    };
    StubbedFunc.prototype.andReturn = function (value) {
        return this.and("returnValue")(value);
    };
    StubbedFunc.prototype.andCallFake = function (fn) {
        return this.and("callFake")(fn);
    };
    StubbedFunc.prototype.getSpy = function () {
        return this.func;
    };
    return StubbedFunc;
})();
exports.StubbedFunc = StubbedFunc;
