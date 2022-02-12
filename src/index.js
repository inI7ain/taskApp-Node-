// const express = require("express");
import express from "express";

/* const userRouter = require("./routers/userRouter");
const taskRouter = require("./routers/taskRouter"); */
import userRouter from "./routers/userRouter.js";
import taskRouter from "./routers/taskRouter.js";

const server = express();
const port = process.env.PORT || 3000;

// Maintenance mode
/* server.use((request, response, next) => { 
	response.status(503).send({ message: "Server is currently under maintenance." });
}); */

// use customises the server
server.use(express.json());
server.use(userRouter);
server.use(taskRouter);

server.listen(port, () => {
	console.log(`Server is up and running on port: ${port}`);
});