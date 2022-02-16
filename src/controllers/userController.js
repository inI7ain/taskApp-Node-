const User = require("../models/user");
const sharp = require("sharp");
require("../db/mongoose");

/* import User from "../models/user.js";
import mongoose from "mongoose"; */

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
			});
		}
	},
	async logoutUser(request, response) {
		try {
			request.user.tokens = request.user.tokens.filter(
				(token) => {
					return token.token !== request.token;
				}
			);
			await request.user.save();
			response.status(200).send({
				success: true,
				message: `Logout successful. See you ${request.user.name}!`,
			});
		} catch (error) {
			response.status(500).send({
				success: false,
				message: `Logout error: ${error}`,
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
			});
		} catch (error) {
			response.status(500).send({
				success: false,
				message: `Logout error: ${error}`,
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
			});
		}
	},
	async readUserProfile(request, response) {
		response.status(200).send(request.user);
	},
	async updateUserProfile(request, response) {
		// mongoose ignores non-existent properties when trying to update
		/* const user = await User.findByIdAndUpdate(
			request.params.id,
			request.body,
			{
				new: true, // returns new updated data instead of original that was found
				runValidators: true,
			}
		); */ // unfortunately this way mongoose and its middlewares gets bypassed
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
				});
			}
			updProps.forEach(
				(prop) => (request.user[prop] = request.body[prop])
			);
			await request.user.save();
			if (!request.user) {
				// should only happen in theory
				return response.status(404).send({
					success: false,
					message: `User invalid.`,
				});
			}
			response.status(200).send({
				success: true,
				message: `User updated successfully.`,
				data: request.user,
			});
		} catch (error) {
			response.status(500).send({
				success: false,
				message: `Error reading user: ${error}`,
			});
		}
	},
	async deleteUserProfile(request, response) {
		try {
			await request.user.remove();
			response.status(200).send({
				success: true,
				message: "User deleted successfully.",
				data: request.user,
			});
		} catch (error) {
			response.status(500).send({
				success: false,
				message: `Error reading user: ${error}`,
			});
		}
	},
	async uploadAvatar(request, response) {
		// multer doesn't throw an exception so trycatch doesn't work here
		if (request.file.buffer) {
			request.user.avatar = await sharp(request.file.buffer)
				.resize({ width: 500, height: 500 })
				.png()
				.toBuffer();
			await request.user.save();
			return response.status(200).send();
		}
		response.status(400).send({
			error: "File is too large or otherwise invalid.",
		});
	},
	async readAvatarById(request, response) {
		try {
			const user = await User.findById(request.params.id);
			if (!user || !user.avatar) {
				throw new Error();
			}
			response.set("Content-Type", "image/png");
			response.status(200).send(user.avatar);
		} catch (error) {
			response.status(404).send({
				success: false,
				message: `Error reading data: ${error}`,
			});
		}
	},
	async deleteAvatar(request, response) {
		try {
			request.user.avatar = undefined;
			await request.user.save();
			response.status(200).send({
				success: true,
				message: `Avatar successfully deleted.`,
			});
		} catch (error) {
			response.status(500).send({
				success: false,
				message: `Error deleting user data: ${error}`,
			});
		}
	},
};

module.exports = userController;
