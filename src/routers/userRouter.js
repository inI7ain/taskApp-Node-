const express = require("express");
const userController = require("../controllers/userController");

const userRouter = new express.Router();

userRouter.post("/users/create", userController.createUser);
userRouter.get("/users/read", userController.readAllUsers);
userRouter.get("/users/read/:id", userController.readUserById);
userRouter.patch("/users/update/:id", userController.updateUserById);
userRouter.delete("/users/delete/:id", userController.deleteUserById);

module.exports = userRouter;