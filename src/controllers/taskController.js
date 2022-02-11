const express = require("express");
const Task = require("../models/tasks");
require("../db/mongoose");

const taskController = {
	async createTask(request, response) {
		try {
			const task = new Task({
				...request.body,
				ownerId: request.user._id,
			});
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
			await request.user.populate("tasks");
			response.status(200).send({
				success: true,
				message: "Data retrieved successfully.",
				data: request.user.tasks,
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
			const task = await Task.findOne({
				_id: request.params.id,
				ownerId: request.user._id,
			});
			console.log(task);
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
				message: `Error reading tasks: ${error}`,
				data: null,
			});
		}
	},
	async updateTaskById(request, response) {
		try {
			const updFields = Object.keys(request.body);
			const modelFields = ["description", "completed"];
			const updIsValid = updFields.every((prop) =>
				modelFields.includes(prop)
			);
			if (!updIsValid) {
				response.status(409).send({
					success: false,
					message: "Update properties are invalid.",
					data: null,
				});
			}
			const task = await Task.findOne({
				_id: request.params.id,
				ownerId: request.user._id,
			});
			if (!task) {
				response.status(404).send({
					success: false,
					message: `Task not found.`,
					data: null,
				});
			}
			updFields.forEach((prop) => (task[prop] = request.body[prop]));
			await task.save();
			response.status(200).send({
				success: true,
				message: `Task updated successfully.`,
				data: task,
			});
		} catch (error) {
			response.status(500).send({
				success: false,
				message: `Error reading users: ${error}`,
				data: null,
			});
		}
	},
	async deleteTaskById(request, response) {
		try {
			const task = await Task.findOneAndDelete({
				_id: request.params.id,
				ownerId: request.user._id,
			});
			if (!task) {
				return response.status(404).send({
					success: false,
					message: "Task not found.",
					data: null,
				});
			}
			response.status(200).send({
				success: true,
				message: "Task deleted successfully.",
				data: task,
			});
		} catch (error) {
			response.status(500).send({
				success: false,
				message: `Error reading tasks: ${error}`,
				data: null,
			});
		}
	},
};

module.exports = taskController;
