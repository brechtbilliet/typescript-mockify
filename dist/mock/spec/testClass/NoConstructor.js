var NoConstructor = (function () {
    function NoConstructor() {
        this.stringVal = "dummystrval";
        this.booleanVal = true;
        this.numberVal = 0;
        this.objectVal = {};
    }
    NoConstructor.prototype.foo = function () {
    };
    NoConstructor.prototype.bar = function () {
        return "dummystr";
    };
    NoConstructor.prototype.baz = function () {
        return 10;
    };
    return NoConstructor;
})();
exports.NoConstructor = NoConstructor;
