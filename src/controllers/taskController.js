const express = require("express");
const User = require("../models/users");
require("../db/mongoose");

const taskController = {
	async createTask(request, response) {
		try {
			const task = new Task(request.body);
			await task.save();
			response.status(201).send({
				success: true,
				message: "Task created successfully.",
				data: task,
			});
		} catch (error) {
			response.status(400).send({
				success: false,
				message: `Task creation error: ${error}`,
				data: null,
			});
		}
	},
	async readAllTasks(request, response) {
		try {
			const tasks = await Task.find({});
			response.status(200).send({
				success: true,
				message: "Data retrieved successfully.",
				data: tasks,
			});
		} catch (error) {
			response.status(500).send({
				success: false,
				message: `Error reading tasks: ${error}`,
				data: null,
			});
		}
	},
	async readTaskById(request, response) {
		try {
			const task = await Task.findById(request.params.id);
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
			});
		} catch (error) {
			response.status(500).send({
				success: false,
				message: `Error reading users: ${error}`,
				data: null,
			});
		}
	}
}

module.exports = taskController;