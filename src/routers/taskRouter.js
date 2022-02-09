const express = require("express");
const taskController = require("../controllers/taskController");

const taskRouter = new express.Router();

// Task operations
taskRouter.post("/tasks/create", taskController.createTask);
taskRouter.get("/tasks/read", taskController.readAllTasks);
taskRouter.get("/tasks/read/:id", taskController.readTaskById);
taskRouter.patch("/tasks/update/:id", taskController.updateTaskById);
taskRouter.delete("/tasks/delete/:id", taskController.deleteTaskById);

module.exports = taskRouter;