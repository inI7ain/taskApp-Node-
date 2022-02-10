const express = require("express");
const jwt = require("jsonwebtoken");

const userRouter = require("./routers/userRouter");
const taskRouter = require("./routers/taskRouter");

const server = express();
const port = process.env.PORT || 3000;

// Middleware example
/* server.use((request, response, next) => { // middleware has access to the same info as the route handler
	console.log(request.method, request.path);

	if (request.method === 'GET') {
		response.status(405).send({ message: "GET requests are disabled."});
	} else {
		next(); // proceeds to route handler
	}
}); */

/* server.use((request, response, next) => { // Maintenance mode
	response.status(503).send({ message: "Server is currently under maintenance." });
}); */


// use customises the server (here with default express settings)
server.use(express.json());
server.use(userRouter);
server.use(taskRouter);

server.listen(port, () => {
	console.log(`Server is up and running on port: ${port}`);
});

// Without middleware: new request => run route handler
// With middleware: new request => do something (authenticate) => run route handler

async function jwtTest() {
	const token = jwt.sign(
		{ _id: "id12345" } /* data embedded in token */,
		"superSecretMessage", // secret sign of token to preven alteration
		{ expiresIn: '7 days' }
	);
	const payLoad = jwt.verify(token, "superSecretMessage");
}

jwtTest();
