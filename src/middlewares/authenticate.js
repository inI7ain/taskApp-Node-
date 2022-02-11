const jwt = require("jsonwebtoken");

const User = require("../models/users");

async function authenticate(request, response, next) {
	console.log(`Incoming ${request.method} request on path: ${request.path}`);
	try {
		const token = request.header("Authorization").split(" ")[1]; // get "bearer" token
		const decoded = jwt.verify(token, "superSecretMessage"); // validate token with secret
		const user = await User.findOne({ _id: decoded._id, "tokens.token": token }); // looks for a valid token in users token array

		if (!user) {
			console.log("Request denied - invalid token.");
			throw new Error();
		}

		request.token = token;
		request.user = user;
		console.log("Request approved.");
		// all data is forwarded to route handler (user)
		next();
	} catch (error) {
		response.status(401).send({ error: "Authentication required." });
	}
}

module.exports = authenticate;