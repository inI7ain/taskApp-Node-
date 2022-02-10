const express = require("express");
const jwt = require("jsonwebtoken");

const userRouter = require("./routers/userRouter");
const taskRouter = require("./routers/taskRouter");

const server = express();
const port = process.env.PORT || 3000;

// use customises the server (here with default express settings)
server.use(express.json());
server.use(userRouter);
server.use(taskRouter);

server.listen(port, () => {
	console.log(`Server is up and running on port: ${port}`);
});

async function jwtTest() {
	const token = jwt.sign(
		{ _id: "id12345" } /* data embedded in token */,
		"superSecretMessage", // secret sign of token to preven alteration
		{ expiresIn: '7 days' }
	);
	const payLoad = jwt.verify(token, "superSecretMessage");
	console.log(payLoad);
}

jwtTest();
