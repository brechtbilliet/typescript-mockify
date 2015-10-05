var dts = require('dts-generator');
dts.generate({
    name: 'typescript-mockify',
    baseDir: 'src',
    files: [
        'index.ts'
    ],
    out: 'dist/typescript-mockify.d.ts'
});