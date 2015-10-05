var dts = require('dts-generator');
dts.generate({
    name: 'typescript-mockify',
    baseDir: 'src',
    files: ['index.ts', 'mock/ConstructorArguments.ts', 'mock/IConstructor.ts', 'mock/Mock.ts', 'mock/MockBuilder.ts', 'mock/StubbedFunc.ts'],
    out: 'dist/typescript-mockify.d.ts'
});