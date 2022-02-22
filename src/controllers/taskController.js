const Task = require("../models/task");
require("../db/mongoose");

/* import express from "express";
import Task from "../models/task.js";
import * as mongoose from "../db/mongoose.js"; */


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
				data: {
					task,
				},
			});
		} catch (error) {
			response.status(400).send({
				success: false,
				message: `Task creation error: ${error}`,
			});
		}
	},
	async readAllTasks(request, response) {
		/*	
			Additional query string filter options 
			/tasks/read?comleted=boolean
			/tasks/read?limit=number
			/tasks/read?skip=number
			/tasks/read?sortBy=sortField_orderDirection
		*/
		try {
			const match = {};
			if (request.query.completed) {
				match.completed = request.query.completed.toLowerCase() === "true";
			}
			const sort = {};
			if (request.query.sortBy) {
				const qStrParts = request.query.sortBy.split("_");
				sort[qStrParts[0]] = qStrParts[1] === "desc" ? -1 : 1;
			}
			await request.user.populate({
				path: "tasks",
				match,
				options: {
					limit: Number(request.query.limit), // used for pagination, ignored if NaN
					skip: Number(request.query.skip),
					sort,
				},
			});
			response.status(200).send({
				success: true,
				message: "Data retrieved successfully.",
				data: {
					tasks: request.user.tasks,
				},
			});
		} catch (error) {
			response.status(500).send({
				success: false,
				message: `Error reading tasks: ${error}`,
			});
		}
	},
	async readTaskById(request, response) {
		try {
			const task = await Task.findOne({
				_id: request.params.id,
				ownerId: request.user._id,
			});
			if (!task) {
				return response.status(404).send({
					success: false,
					message: "Task not found.",

				});
			}
			response.status(200).send({
				success: true,
				message: `Data retrieved successfully.`,
				data: {
					task,
				},
			});
		} catch (error) {
			response.status(500).send({
				success: false,
				message: `Error reading tasks: ${error}`,
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

				});
			}
			updFields.forEach((prop) => (task[prop] = request.body[prop]));
			await task.save();
			response.status(200).send({
				success: true,
				message: `Task updated successfully.`,
				data: {
					task,
				},
			});
		} catch (error) {
			response.status(500).send({
				success: false,
				message: `Error reading users: ${error}`,
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

				});
			}
			response.status(200).send({
				success: true,
				message: "Task deleted successfully.",
				data: {
					task,
				},
			});
		} catch (error) {
			response.status(500).send({
				success: false,
				message: `Error reading tasks: ${error}`,
			});
		}
	},
};

module.exports = taskController;