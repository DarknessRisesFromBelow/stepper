declare module NodeJS {
	interface Global {
		shouldUpdate:bool;
		uid:string;
	}
}