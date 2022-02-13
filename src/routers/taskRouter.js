const express = require("express");

const taskController = require("../controllers/taskController");
const authenticate = require("../middlewares/authenticate");

/* import express from "express";
import taskController from "../controllers/taskController.js";
import authenticate from "../middlewares/authenticate.js"; */

const taskRouter = new express.Router();

// Task operations
taskRouter.post("/tasks/create", authenticate, taskController.createTask);
taskRouter.get("/tasks/read", authenticate, taskController.readAllTasks);
taskRouter.get("/tasks/read/:id", authenticate, taskController.readTaskById);
taskRouter.patch("/tasks/update/:id", authenticate, taskController.updateTaskById);
taskRouter.delete("/tasks/delete/:id", authenticate, taskController.deleteTaskById);

module.exports = taskRouter;