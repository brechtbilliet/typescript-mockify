export class ConstructorArguments {
    constructor() {
        this.arguments = {};
    }
    map(key, value) {
        this.arguments[key] = value;
        return this;
    }
}
