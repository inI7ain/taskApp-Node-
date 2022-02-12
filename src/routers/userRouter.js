const express = require("express");
const multer = require("multer");

const userController = require("../controllers/userController");
const authenticate = require("../middlewares/authenticate");

const userRouter = new express.Router();
const uploadDir = multer({
	dest: "src/avatars", // specify upload directory
	limits: {
		fileSize: 1000000, // in bytes
	},
	fileFilter(request, file, callback) {
		if (!file.originalname.match(/\.(doc|docx)$/)) {
			return callback("Please upload a document.");
		}
		callback(undefined, true);
	},
});

// Without middleware: new request => run route handler
// With middleware: new request => do something (authenticate) => run route handler

// User authentication
userRouter.post("/users/create", userController.createUser);
userRouter.post("/users/login", userController.loginUser);
userRouter.post("/users/logout", authenticate, userController.logoutUser);
userRouter.post("/users/logoutAll", authenticate, userController.logoutAll);

// Data retrieval
userRouter.get("/users/read", userController.readAllUsers);
userRouter.get(
	"/users/readProfile",
	authenticate,
	userController.readUserProfile
);

// Data managemenet
userRouter.patch("/users/updateProfile", authenticate, userController.updateUserProfile);
userRouter.delete("/users/deleteProfile", authenticate, userController.deleteUserProfile);
userRouter.post("/users/uploadAvatar", uploadDir.single("avatar"), userController.uploadAvatar);
// multer's single method specifies the key to look for in form-data


module.exports = userRouter;
