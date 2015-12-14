/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/bluebird/bluebird.d.ts" />

declare module Ghost{
	interface GhostServer {
				start(parentApp:Express.Application): void;
				rootApp: Handler;
				config:any;		
		}
	interface RequestHandler {
		(req: Express.Request, res: Express.Response, next: Function): any;
	}
	
	interface Handler extends RequestHandler {}

}

// "ambient external module declaration"
declare module "ghost" {
	
	function makeGhost(options?:any): Promise<Ghost.GhostServer>;
	// other interfaces can be exported from above ...
	export = makeGhost;
}
