// Middleware example

server.use((request, response, next) => { // middleware has access to the same info as the route handler
	console.log(request.method, request.path);

	if (request.method === 'GET') {
		response.status(405).send({ message: "GET requests are disabled."});
	} else {
		next(); // proceeds to route handler
	}
});

