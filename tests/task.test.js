const request = require("supertest");
const mongoose = require("mongoose");

const server = require("../src/server");
const Task = require("../src/models/task");
const { 
	userOne,
	userTwo,
	taskOne,
	setupDb, 
	userOneId
} = require("./fixtures/setup");

beforeEach(setupDb);

afterAll(async () => {
	await mongoose.connection.close();
});

test(
	"Should create task for user",
	async () => {
		const response = await (
			request(server)
			.post("/tasks/create")
			.set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
			.send({
				description: "You surely jest"
			})
			.expect(201)
		);
		const task = await Task.findById(response.body.data.task._id);
		expect(task).not.toBeNull();
		expect(task.completed).toEqual(false);
	}
);

test(
	"Should get all of users' tasks",
	async () => {
		const response = await (
			request(server)
			.get("/tasks/read")
			.set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
			.expect(200)
		);
		expect(response.body.data.tasks.length).toEqual(2);
	}
);

test(
	"Should fail to delete task without ownership",
	async () => {
		await (
			request(server)
			.delete(`/tasks/delete/${taskOne._id}`)
			.set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
			.expect(404)
		);
		const task = await Task.findById(taskOne._id);
		expect(task).not.toBeNull();
	}
);

test(
	"Should delete user's task",
	async () => {
		await (
			request(server)
			.delete(`/tasks/delete/${taskOne._id}`)
			.set("Authorization", `Bearer ${userOne.tokens[0].token}`)
			.expect(200)
		);
		const task = await Task.findById(taskOne._id);
		expect(task).toBeNull();
	}
);

test(
	"Should fail to delete unauthorized user's task",
	async () => {
		await (
			request(server)
			.delete(`/tasks/delete/${taskOne._id}`)
			.expect(401)
		);
	}
);

// links.mead.io/extratests