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
    Foo.prototype.quux = function (args) {
    };
    return Foo;
})();
exports.Foo = Foo;
