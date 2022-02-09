const express = require("express");

const User = require("./models/users");
const Task = require("./models/tasks");
const { ObjectId } = require("mongodb");
require("./db/mongoose");


const server = express();
const port = process.env.PORT || 3000;

server.use(express.json()); // use customises the server

server.post("/users/create", async (request, response) => {
	const user = new User(request.body).save().then((user) => {
		response.status(201).send({
			success: true,
			message: "User created successfully.",
			data: user,
		});
	}).catch((error) => {
		response.status(400).send({
			success: false,
			message: `User creation error: ${error}`,
			data: null,
		});
	});
});

server.get("/users/read", (request, response) => {
	User.find({}).then((users) => {
		response.status(200).send({
			success: true,
			message: "Data retrieved successfully.",
			data: users,
		}).catch((error) => {
			response.status(500).send({
				success: false,
				message: `Error reading users: ${error}`,
				data: null,
			})
		});
	})
});

server.get("/users/read/:id", (request, response) => {
	User.findById(request.params.id).then((user) => {
		if (!user) {
			return response.status(404).send({
				success: false,
				message: "User not found.",
				data: null,
			});
		}
		response.status(200).send({
			success: true,
			message: `Data retrieved successfully.`,
			data: user,
		})
	}).catch((error) => {
		response.status(500).send({
			success: false,
			message: `Error reading users: ${error}`,
			data: null,
		});
	});
});

server.post("/tasks/create", (request, response) => {
	const task = new Task(request.body).save().then((task) => {
		response.status(201).send({
			success: true,
			message: "Task created successfully.",
			data: task,
		});
	}).catch((error) => {
		response.status(400).send({
			success: false,
			message: `Task creation error: ${error}`,
			data: null,
		});
	});
});

server.get("/tasks/read", (request, response) => {
	Task.find({}).then((tasks) => {
		response.status(200).send({
			success: true,
			message: "Data retrieved successfully.",
			data: tasks,
		});
	}).catch((error) => {
		response.status(500).send({
			success: false,
			message: `Error reading tasks: ${error}`,
			data: null,
		});
	});
});

server.get("/tasks/read/:id", (request, response) => {
	Task.findById(request.params.id).then((task) => {
		if (!task) {
			return response.status(404).send({
				success: false,
				message: "Task not found.",
				data: null,
			});
		}
		response.status(200).send({
			success: true,
			message: `Data retrieved successfully.`,
			data: task,
		})
	}).catch((error) => {
		response.status(500).send({
			success: false,
			message: `Error reading users: ${error}`,
			data: null,
		});
	});
});


server.listen(port, () => {
	console.log(`Server is up and running on port: ${port}`);
});

