declare module 'typescript-mockify/mock/ConstructorArguments' {
	export class ConstructorArguments {
	    arguments: any;
	    map(key: string, value: any): ConstructorArguments;
	}

}
declare module 'typescript-mockify/mock/StubbedFunc' {
	import Spy = jasmine.Spy;
	import { Mock } from 'typescript-mockify/mock/Mock';
	export class StubbedFunc<T> {
	    private func;
	    private mock;
	    constructor(func: Function, mock: Mock<T>);
	    andReturn(value: any): Mock<T>;
	    getSpy(): Spy;
	}

}
declare module 'typescript-mockify/mock/Mock' {
	import { ConstructorArguments } from 'typescript-mockify/mock/ConstructorArguments';
	import { StubbedFunc } from 'typescript-mockify/mock/StubbedFunc';
	export class Mock<T> {
	    instance: T;
	    args: ConstructorArguments;
	    constructor(instance: T, args?: ConstructorArguments);
	    setupMethod(func: string): StubbedFunc<T>;
	    mapProperty(propertyName: string, value: any): Mock<T>;
	}

}
declare module 'typescript-mockify/mock/IConstructor' {
	export interface IConstructor<T> {
	    prototype: any;
	    apply(inst: any, args: Array<any>): void;
	}

}
declare module 'typescript-mockify/mock/MockBuilder' {
	import { Mock } from 'typescript-mockify/mock/Mock';
	import { ConstructorArguments } from 'typescript-mockify/mock/ConstructorArguments';
	import { IConstructor } from 'typescript-mockify/mock/IConstructor';
	export class MockBuilder {
	    static createInstance<T>(ctor: IConstructor<T>, args?: ConstructorArguments): Mock<T>;
	    private static setDefaultVals(object, args?);
	    private static createDefaultValue(type);
	}

}
declare module 'typescript-mockify/index' {
	/// <reference path="../typings/tsd.d.ts" />
	export * from 'typescript-mockify/mock/MockBuilder';
	export * from 'typescript-mockify/mock/Mock';
	export * from 'typescript-mockify/mock/StubbedFunc';
	export * from 'typescript-mockify/mock/IConstructor';
	export * from 'typescript-mockify/mock/ConstructorArguments';

}
declare module 'typescript-mockify' {
	import main = require('typescript-mockify');
	export = main;
}
