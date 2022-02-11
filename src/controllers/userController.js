const express = require("express");
const User = require("../models/users");
require("../db/mongoose");

const userController = {
	async createUser(request, response) {
		try {
			const user = new User(request.body);
			const token = await user.generateAuthToken();
			user.tokens.concat({ token });

			await user.save();
			response.status(201).send({
				success: true,
				message: "User created successfully.",
				data: {
					user,
					token,
				},
			});
		} catch (error) {
			response.status(500).send({
				success: false,
				message: `User creation error ${error.message}`,
				data: null,
			});
		}
		/* Promise chaining version (old)
		 const user = new User(request.body).save().then((user) => {
			response.status(201).send({
				success: true,
				message: "User created successfully.",
				data: user,
			});
		}).catch((error) => {
			response.status(500).send({
				success: false,
				message: `User creation error: ${error}`,
				data: null,
			});
		}); 
		*/
	},
	async loginUser(request, response) {
		try {
			const user = await User.findByCredentials(
				request.body.email,
				request.body.password
			);
			// this will call the method defined on userSchema.statics in models
			const token = await user.generateAuthToken();
			response.status(200).send({
				success: true,
				message: `Login successful. Welcome ${user.name}!`,
				data: {
					user,
					token,
				},
			});
		} catch (error) {
			response.status(401).send({
				success: false,
				message: `Login error: ${error}`,
				data: null,
			});
		}
	},
	async logoutUser(request, response) {
		try {
			request.user.tokens = request.user.tokens.filter((token) => {
				return token.token !== request.token;
			});
			await request.user.save();
			response.status(200).send({
				success: true,
				message: `Logout successful. See you ${request.user.name}!`,
				data: null,
			});
		} catch (error) {
			response.status(500).send({
				success: false,
				message: `Logout error: ${error}`,
				data: null,
			});
		}
	},
	async logoutAll(request, response) {
		try {
			request.user.tokens = [];
			await request.user.save();
			response.status(200).send({
				success: true,
				message: `Logged out from all sessions. See you ${request.user.name}!`,
				data: null,
			});
		} catch (error) {
			response.status(500).send({
				success: false,
				message: `Logout error: ${error}`,
				data: null,
			});		
		}
	},
	async readAllUsers(request, response) {
		try {
			const users = await User.find({});
			response.status(200).send({
				success: true,
				message: "Data retrieved successfully.",
				data: users,
			});
		} catch (error) {
			response.status(500).send({
				success: false,
				message: `Error reading users: ${error}`,
				data: null,
			});
		}
	},
	async readUserById(request, response) {
		try {
			const user = await User.findById(request.params.id);
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
			});
		} catch (error) {
			response.status(500).send({
				success: false,
				message: `Error reading users: ${error}`,
				data: null,
			});
		}
	},
	async readUserProfile(request, response) {
		response.status(200).send(request.user);
	},
	async updateUserById(request, response) {
		// mongoose ignores non-existent properties when trying to update
		try {
			const updProps = Object.keys(request.body);
			const modelProps = ["name", "email", "password", "age"];
			const updIsValid = updProps.every((prop) =>
				modelProps.includes(prop)
			);
			if (!updIsValid) {
				return response.status(409).send({
					success: false,
					message: `Update properties are invalid.`,
					data: null,
				});
			}
			const user = await User.findById(request.params.id);
			updProps.forEach((prop) => (user[prop] = request.body[prop]));
			await user.save();
			/* const user = await User.findByIdAndUpdate(
				request.params.id,
				request.body,
				{
					new: true, // returns new updated data instead of original that was found
					runValidators: true,
				}
			); */ // this way mongoose and its middlewares gets bypassed
			if (!user) {
				return response.status(404).send({
					success: false,
					message: `User not found.`,
					data: null,
				});
			}
			response.status(200).send({
				success: true,
				message: `User updated successfully.`,
				data: user,
			});
		} catch (error) {
			response.status(500).send({
				success: false,
				message: `Error reading user: ${error}`,
				data: null,
			});
		}
	},
	async deleteUserById(request, response) {
		try {
			const user = await User.findByIdAndDelete(request.params.id);
			if (!user) {
				return response.status(404).send({
					success: false,
					message: "User not found.",
					data: null,
				});
			}
			response.status(200).send({
				success: true,
				message: "User deleted successfully.",
				data: user,
			});
		} catch (error) {
			response.status(500).send({
				success: false,
				message: `Error reading user: ${error}`,
				data: null,
			});
		}
	},
};

module.exports = userController;
