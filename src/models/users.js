const validator = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
});

userSchema.methods.

userSchema.statics.findByCredentials = async function (email, password) {
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

// run middleware on specified event
userSchema.pre('save', async function(next) { 
	const user = this; // must be a standard fn because of this binding
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next(); // hangs forever until next is calledd
});

// collection modelling
const User = mongoose.model("User", userSchema);

module.exports = User;
