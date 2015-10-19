var Mock_1 = require("./Mock");
var _ = require("lodash");
var MockBuilder = (function () {
    function MockBuilder() {
    }
    MockBuilder.createInstance = function (Ctor, args) {
        var instance = MockBuilder.createMockInstance(Ctor, args);
        return new Mock_1.Mock(instance, args);
    };
    MockBuilder.createMockInstance = function (Ctor, args) {
        var MockImplementation = (function () {
            function MockImplementation(mockImplementationArgs) {
                Ctor.apply(this, mockImplementationArgs);
            }
            return MockImplementation;
        })();
        MockImplementation.prototype = Object.create(Ctor.prototype);
        for (var prototypeKey in MockImplementation.prototype) {
            MockImplementation.prototype[prototypeKey] = jasmine.createSpy(prototypeKey);
        }
        var instance = new MockImplementation(args ? _.toArray(args.arguments) : null);
        MockBuilder.setDefaultVals(instance, args);
        return instance;
    };
    MockBuilder.setDefaultVals = function (object, args) {
        _.each(object, function (value, key) {
            if (!_.isFunction(value) && !MockBuilder.argsHasProperty(args, key)) {
                object[key] = MockBuilder.createDefaultValue(typeof value);
            }
        });
    };
    MockBuilder.argsHasProperty = function (args, key) {
        return !!args && args.arguments.hasOwnProperty(key);
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
