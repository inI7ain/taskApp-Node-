const mongoose = require("mongoose");
// import mongoose from "mongoose";


// db connection
mongoose.connect("mongodb://127.0.0.1:27017/taskManagerApi", {
	useNewUrlParser: true,
});
