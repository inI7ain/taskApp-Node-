const { response } = require("express");
const express = require("express");
const userController = require("../controllers/userController");
const authenticate = require("../middlewares/authenticate");

const userRouter = new express.Router();

// Without middleware: new request => run route handler
// With middleware: new request => do something (authenticate) => run route handler

// User authentication
userRouter.post("/users/create", userController.createUser);
userRouter.post("/users/login", userController.loginUser);
userRouter.post("/users/logout", authenticate, userController.logoutUser);
userRouter.post("/users/logoutAll", authenticate, userController.logoutAll);

// Data retrievals
userRouter.get("/users/read", userController.readAllUsers);
// userRouter.get("/users/read/:id", userController.readUserById);
userRouter.get(
	"/users/read/profile",
	authenticate,
	userController.readUserProfile
);

// Data maintenance & removals
userRouter.patch("/users/update/:id", userController.updateUserById);
userRouter.delete("/users/delete/:id", userController.deleteUserById);

module.exports = userRouter;
