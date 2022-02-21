const express = require("express");

const userRouter = require("./routers/userRouter");
const taskRouter = require("./routers/taskRouter");

/* import express from "express";
import userRouter from "./routers/userRouter.js";
import taskRouter from "./routers/taskRouter.js";
 */

const server = express();

// Maintenance mode
/* server.use((request, response, next) => { 
	response.status(503).send({ message: "Server is currently under maintenance." });
}); */

// use customises the server
server.use(express.json());
server.use(userRouter);
server.use(taskRouter);

module.exports = server;