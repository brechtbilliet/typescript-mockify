var StubbedFunc_1 = require("./StubbedFunc");
var Mock = (function () {
    function Mock(instance, args) {
        this.instance = instance;
        this.args = args;
    }
    Mock.prototype.setupSpy = function (func, spySetup) {
        spySetup((this.instance[func]));
        return this;
    };
    Mock.prototype.setupMethod = function (func) {
        return new StubbedFunc_1.StubbedFunc(this.instance[func], this);
    };
    Mock.prototype.mapProperty = function (propertyName, value) {
        this.instance[propertyName] = value;
        return this;
    };
    return Mock;
})();
exports.Mock = Mock;
