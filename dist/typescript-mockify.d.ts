declare module 'typescript-mockify/mock/ConstructorArguments' {
	export class ConstructorArguments {
	    arguments: any;
	    map(key: string, value: any): ConstructorArguments;
	}

}
