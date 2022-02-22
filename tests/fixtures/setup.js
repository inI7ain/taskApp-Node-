const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../../src/models/user");
const Task = require("../../src/models/task");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
	_id: userOneId,
	name: "Test",
	email: "test@mail.com",
	password: "abcD1234",
	tokens: [
		{
			token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
		},
	],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
	_id: userTwoId,
	name: "User",
	email: "user@mail.com",
	password: "abcD1234",
	tokens: [
		{
			token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET),
		},
	],
};

const taskOne = {
	_id: new mongoose.Types.ObjectId(),
	description: "This is no jest",
	completed: false,
	ownerId: userOneId,
}

const taskTwo = {
	_id: new mongoose.Types.ObjectId(),
	description: "Jesters everywhere",
	completed: true,
	ownerId: userTwoId,
}

const taskThree = {
	_id: new mongoose.Types.ObjectId(),
	description: "Such a jest",
	completed: false,
	ownerId: userTwoId,
}

async function setupDb() {
	await User.deleteMany(); // jest waits for results before proceeding with tests
	await Task.deleteMany();
	await new User(userOne).save();
	await new User(userTwo).save();
	await new Task(taskOne).save();
	await new Task(taskTwo).save();
	await new Task(taskThree).save();
}

module.exports = {
	userOneId,
	userOne,
	userTwo,
	userTwoId,
	setupDb,
	taskOne,
	taskTwo,
	taskThree,
}