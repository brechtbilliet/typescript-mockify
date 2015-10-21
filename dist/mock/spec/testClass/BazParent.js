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
    BazParent.prototype.quux = function (args) {
    };
    return BazParent;
})();
exports.BazParent = BazParent;
