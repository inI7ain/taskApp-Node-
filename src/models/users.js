const validator = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// schema for database collection
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	age: {
		type: Number,
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error("Age must be a valid number!");
			}
		},
	},
	email: {
		type: String,
		required: true,
		unique: true, // creates indexes for uniqueness
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("Invalid e-mail format!");
			}
		},
	},
	password: {
		type: String,
		required: true,
		trim: true,
		validate(value) {
			if (value.toLowerCase().includes("password")) {
				throw new Error("Password can't contain the word 'password'!");
			} else if (
				!validator.isStrongPassword(value, {
					minSymbols: 0,
					minLength: 7,
				})
			) {
				throw new Error(
					`Password must be at least 7 characters in length and contain lower and uppercase letters and numbers!`
				);
			}
		},
	},
	tokens: [{
		token: {
			type: String, // this must be provided
			required: true,
		}
	}],
});

// run middleware on specified event
userSchema.pre('save', async function(next) { 
	const user = this; // must be a standard fn because of this binding
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next(); // hangs forever until next is calledd
});

userSchema.methods.generateAuthToken = async function () { // methods are available in your instances
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, "superSecretMessage"); // secet message for decoding
	user.tokens = user.tokens.concat({ token }); // add user's token to tokens array

	await user.save();
	return token;
}

userSchema.statics.findByCredentials = async function (email, password) { // static methods are available on the model
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error("User not found.");
	}

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new Error("Unable to login.")
	}
	return user;
}

// collection modelling
const User = mongoose.model("User", userSchema);

module.exports = User;