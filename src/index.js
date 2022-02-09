const express = require("express");

const userController = require("./controllers/userController");
const taskController = require("./controllers/taskController");

const server = express();
const port = process.env.PORT || 3000;

server.use(express.json()); // use customises the server

// User operations
server.post("/users/create", userController.createUser);
server.get("/users/read", userController.readAllUsers);
server.get("/users/read/:id", userController.readUserById);

// Task operations
server.post("/tasks/create", taskController.createTask);
server.get("/tasks/read", taskController.readAllTasks);
server.get("/tasks/read/:id", taskController.readTaskById);

server.listen(port, () => {
	console.log(`Server is up and running on port: ${port}`);
});

