import { StubbedFunc } from "./StubbedFunc";
export class Mock {
    constructor(instance, args) {
        this.instance = instance;
        this.args = args;
    }
    setupMethod(func) {
        return new StubbedFunc(this.instance[func], this);
    }
    mapProperty(propertyName, value) {
        this.instance[propertyName] = value;
        return this;
    }
}
