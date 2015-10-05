var Mock_1 = require("./Mock");
var _ = require("lodash");
var MockBuilder = (function () {
    function MockBuilder() {
    }
    MockBuilder.createInstance = function (ctor, args) {
        var _this = this;
        var instance = (function () {
            var ConstructFunc = function () {
            };
            ConstructFunc.prototype = ctor.prototype;
            for (var i in ConstructFunc.prototype) {
                ConstructFunc.prototype[i] = jasmine.createSpy(ConstructFunc.prototype[i]);
            }
            var inst = new ConstructFunc();
            ctor.apply(inst, _.toArray(args.arguments));
            _this.setDefaultVals(inst, args);
            return inst;
        })();
        return new Mock_1.Mock(instance, args);
    };
    MockBuilder.setDefaultVals = function (object, args) {
        for (var key in object) {
            if (!_.isFunction() && typeof (object[key]) !== "function") {
                if (args === null || !args.arguments.hasOwnProperty(key)) {
                    var defaultVal = this.createDefaultValue(typeof (object[key]));
                    if (defaultVal !== undefined) {
                        object[key] = defaultVal;
                    }
                }
            }
        }
    };
    MockBuilder.createDefaultValue = function (type) {
        switch (type) {
            case "string":
                return "";
            case "number":
                return 0;
            case "boolean":
                return false;
            case "object":
                return {};
            default:
                return undefined;
        }
    };
    return MockBuilder;
})();
exports.MockBuilder = MockBuilder;
