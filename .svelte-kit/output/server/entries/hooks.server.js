//#region src/hooks.server.ts
var handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	response.headers.set("X-Content-Type-Options", "nosniff");
	response.headers.set("X-Frame-Options", "DENY");
	response.headers.set("X-XSS-Protection", "1; mode=block");
	return response;
};
//#endregion
export { handle };
