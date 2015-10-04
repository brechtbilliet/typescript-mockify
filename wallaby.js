var wallabyWebpack = require('wallaby-webpack');
var webpack = require('webpack');

var webpackPostprocessor = wallabyWebpack({
    module: {}
});

module.exports = function () {

    return {
        files: [
            {pattern: 'src/**/*.ts', load: false},
            {pattern: 'src/**/*.spec.ts', ignore: true},
            {pattern: 'node_modules', ignore: true, instrument: false}
        ],

        tests: [
            {pattern: 'src/**/*.spec.ts', load: false},
            {pattern: 'node_modules', ignore: true, instrument: false}
        ],

        "testFramework": "jasmine",
        postprocessor: webpackPostprocessor,

        bootstrap: function () {
            window.__moduleBundler.loadTests();
        }
    };
};
