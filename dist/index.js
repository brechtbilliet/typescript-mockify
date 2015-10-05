function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
/// <reference path="../typings/tsd.d.ts" />
__export(require("./mock/MockBuilder"));
__export(require("./mock/Mock"));
__export(require("./mock/StubbedFunc"));
__export(require("./mock/IConstructor"));
__export(require("./mock/ConstructorArguments"));
