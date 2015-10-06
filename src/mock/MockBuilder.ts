import {Mock} from "./Mock";
import * as _ from "lodash";
import {ConstructorArguments} from "./ConstructorArguments";
import {IConstructor} from "./IConstructor";

export class MockBuilder {
    public static createInstance<T>(ctor: IConstructor<T>, args?: ConstructorArguments): Mock<T> {
        var instance: T = (() => {
            var ConstructFunc: any = () => {
            };
            ConstructFunc.prototype = ctor.prototype;
            for (var i in ConstructFunc.prototype) {
                ConstructFunc.prototype[i] = jasmine.createSpy(ConstructFunc.prototype[i]);
            }
            var inst: any = new ConstructFunc();

            if (args) {
                ctor.apply(inst, _.toArray(args.arguments));
            } else {
                ctor.apply(inst, []);
            }
            this.setDefaultVals(inst, args);
            return inst;
        })();
        return new Mock<T>(instance, args);
    }

    private static setDefaultVals(object: Object, args?: ConstructorArguments): void {
        for (var key in object) {
            if (!_.isFunction() && typeof(object[key]) !== "function") {
                if (args === undefined || (args !== undefined && !args.arguments.hasOwnProperty(key))) {
                    var defaultVal: any = this.createDefaultValue(typeof(object[key]));
                    if (defaultVal !== undefined) {
                        object[key] = defaultVal;
                    }
                }
            }
        }
    }

    private static createDefaultValue(type: string): any {
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