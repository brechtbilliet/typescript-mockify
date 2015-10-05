export class StubbedFunc {
    constructor(func, mock) {
        this.func = func;
        this.mock = mock;
    }
    andReturn(value) {
        this.func.and.returnValue(value);
        return this.mock;
    }
    getSpy() {
        return this.func;
    }
}
