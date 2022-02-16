const express = require("express");
const multer = require("multer");

const userController = require("../controllers/userController");
const authenticate = require("../middlewares/authenticate");

/* import express from "express";
import multer from "multer";
import userController from "../controllers/userController.js";
import authenticate from "../middlewares/authenticate.js"; */

const userRouter = new express.Router();
const upload = multer({
	// dest: "src/avatars", // specify upload directory (file is passed to next if omitted)
	limits: {
		fileSize: 10000000, // in bytes
	},
	fileFilter(request, file, callback) {
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			return callback(
				"Only jpg, jpeg and png format is accepted."
			);
		}
		callback(undefined, true); // resolve
	},
});

// Without middleware: new request => run route handler
// With middleware: new request => do something (authenticate) => run route handler

// User authentication
userRouter.post("/users/create", userController.createUser);
userRouter.post("/users/login", userController.loginUser);
userRouter.post(
	"/users/logout",
	authenticate,
	userController.logoutUser
);
userRouter.post(
	"/users/logoutAll",
	authenticate,
	userController.logoutAll
);

// Data retrieval
userRouter.get("/users/read", userController.readAllUsers);
userRouter.get(
	"/users/readProfile",
	authenticate,
	userController.readUserProfile
);
userRouter.get("/users/readAvatar/:id", userController.readAvatarById);

// Data managemenet
userRouter.patch(
	"/users/updateProfile",
	authenticate,
	userController.updateUserProfile
);
userRouter.delete(
	"/users/deleteProfile",
	authenticate,
	userController.deleteUserProfile
); 
userRouter.post(
	"/users/uploadAvatar",
	authenticate,
	upload.single("avatar"),
	userController.uploadAvatar,
	(error, request, response) => {
		response.status(400).send({ error });
	}
);
userRouter.delete(
	"/users/deleteAvatar",
	authenticate,
	userController.deleteAvatar
);

module.exports = userRouter;
