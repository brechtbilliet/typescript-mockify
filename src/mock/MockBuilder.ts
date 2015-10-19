import {Mock} from "./Mock";
import * as _ from "lodash";
import {ConstructorArguments} from "./ConstructorArguments";

export class MockBuilder {
    public static createInstance<Interface>(Ctor: any, args?: ConstructorArguments): Mock<Interface> {
        const instance: Interface = MockBuilder.createMockInstance<Interface>(Ctor, args);

        return new Mock<Interface>(instance, args);
    }

    private static createMockInstance<Interface>(Ctor: any, args: ConstructorArguments): Interface {
        /**
         * Create a mock implementation
         */
        class MockImplementation {
            constructor(mockImplementationArgs: Array<any>) {
                Ctor.apply(this, mockImplementationArgs);
            }
        }

        /**
         * copy the Impl's prototype to the MockImplementation's prototype
         */
        MockImplementation.prototype = Object.create(Ctor.prototype);

        /**
         * override all prototype methods by spies
         */
        for (let prototypeKey in MockImplementation.prototype) {
            MockImplementation.prototype[prototypeKey] = jasmine.createSpy(prototypeKey);
        }

        /**
         * create an instance of the Interface
         */
        var instance: Interface = <Interface> new MockImplementation(args ? _.toArray(args.arguments) : null);

        /**
         * set default values
         */
        MockBuilder.setDefaultVals(instance, args);

        return instance;
    }

    private static setDefaultVals(object: Object, args: ConstructorArguments): void {
        _.each(object, (value: any, key: string) => {
            if (!_.isFunction(value) && !MockBuilder.argsHasProperty(args, key)) {
                object[key] = MockBuilder.createDefaultValue(typeof value);
            }
        });
    }

    private static argsHasProperty(args: ConstructorArguments, key: string): boolean {
        return !!args && args.arguments.hasOwnProperty(key);
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