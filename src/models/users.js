const validator = require("validator");

const mongoose = require("mongoose");

// collection modelling
const User = mongoose.model("User", {
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
});

module.exports = User;
