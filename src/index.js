const express = require("express");

const userRouter = require("./routers/userRouter");
const taskRouter = require("./routers/taskRouter");

const server = express();
const port = process.env.PORT || 3000;

server.use(express.json()); // use customises the server (here with default express settings)
server.use(userRouter);
server.use(taskRouter);

server.listen(port, () => {
	console.log(`Server is up and running on port: ${port}`);
});

