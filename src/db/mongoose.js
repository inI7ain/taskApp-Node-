const mongoose = require("mongoose");
// import mongoose from "mongoose";


// db connection
mongoose.connect(process.env.MONGODB_URL, {
	useNewUrlParser: true,
});
