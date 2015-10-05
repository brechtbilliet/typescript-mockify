import { Mock } from "./Mock";
import * as _ from "lodash";
export class MockBuilder {
    static createInstance(ctor, args) {
        var instance = (() => {
            var ConstructFunc = () => {
            };
            ConstructFunc.prototype = ctor.prototype;
            for (var i in ConstructFunc.prototype) {
                ConstructFunc.prototype[i] = jasmine.createSpy(ConstructFunc.prototype[i]);
            }
            var inst = new ConstructFunc();
            ctor.apply(inst, _.toArray(args.arguments));
            this.setDefaultVals(inst, args);
            return inst;
        })();
        return new Mock(instance, args);
    }
    static setDefaultVals(object, args) {
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
    }
    static createDefaultValue(type) {
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
    }
}
