var ConstructorArguments = (function () {
    function ConstructorArguments() {
        this.arguments = {};
    }
    ConstructorArguments.prototype.map = function (key, value) {
        this.arguments[key] = value;
        return this;
    };
    return ConstructorArguments;
})();
exports.ConstructorArguments = ConstructorArguments;
