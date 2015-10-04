export class ConstructorArguments {
    public arguments: any = {};

    public map(key: string, value: any): ConstructorArguments {
        this.arguments[key] = value;
        return this;
    }
}