var fs = require("fs");
var node_modules = fs.readdirSync('node_modules').filter(function(x) { return x !== '.bin' });

module.exports = {
    entry: ['./src/index.ts'],
    output: {
        filename: 'typescript-mockify.js',
        path: 'prod'
    },
    externals: function(context, request, cb) {
        if(node_modules.indexOf(request) !== -1) {
            cb(null, 'commonjs ' + request);
            return;
        }
        cb();
    },
    resolve: {
        root: __dirname,
        extensions: ['', '.ts'],
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts',
                exclude: /node_modules/
            }
        ]
    },
    devtool: 'source-map'
}