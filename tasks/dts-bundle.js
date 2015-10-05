var dts = require('dts-bundle');
dts.bundle({
    name: 'typescript-mockify',
    main: 'dist/index.d.ts',
    out: '../dist/typescript-mockify.d.ts'
});