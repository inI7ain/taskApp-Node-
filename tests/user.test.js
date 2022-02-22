const request = require("supertest");
const mongoose = require("mongoose");

const server = require("../src/server");
const User = require("../src/models/user");
const { userOneId, userOne, setupDb } = require("./fixtures/setup");

// setup (for auth routes)

beforeEach(setupDb); // provided by supertest, runs before each case


/* afterEach(() => {
	console.log("afterEach");
}); */

afterAll(async () => {
	await mongoose.connection.close();
});

// cases
test("Should create new user", async () => {
	const response = await (
		request(server)
		.post("/users/create")
		.send({
			name: "Attila",
			email: "ini7ain@pm.me",
			password: "abcD1234",
		})
		.expect(201)
	);

	// Asserting that the db was changed correctly
	const user = await User.findById(response.body.data.user._id);
	expect(user).not.toBeNull();

	// Assertions about the response
	expect(response.body.data).toMatchObject({
		user: {
			name: "Attila",
			email: "ini7ain@pm.me",
		},
		token: user.tokens[0].token
	});
	expect(user.password).not.toBe("abcD1234")
});

test("Should login existing user", async () => {
	const response = await (
		request(server)
		.post("/users/login")
		.send({
			email: userOne.email,
			password: userOne.password,
		})
		.expect(200)
	);

	// Asserting new login token was issued correctly
	const user = await User.findById(response.body.data.user._id);
	expect(user).not.toBeNull();
	expect(user.tokens[1].token).toBe(response.body.data.token);

});

test("Should fail to login non-existing user", async () => {
	await (
		request(server)
		.post("/users/login")
		.send({
			email: "userOne.email",
			password: "userOne.password",
		})
		.expect(401)
	);
});

test("Should get profile for user", async () => {
	await (
		request(server)
		.get("/users/readProfile")
		.set("Authorization", `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200)
	);
});


test(
	"Should not get profile for unathorized user",
	async () => {
		const response = await (
			request(server)
			.get("/users/readProfile")
			.send()
			.expect(401)
		);
		expect(response.body.success).toBeFalsy();
	}
);

test(
	"Should delete account for user",
	async () => {
		const response = await (
			request(server)
			.delete("/users/deleteProfile")
			.set("Authorization", `Bearer ${userOne.tokens[0].token}`)
			.send()
			.expect(200)
		);
		expect(response.body.success).toBeTruthy();

		// Asserting that the db was changed correctly
		const user = await User.findById(userOneId);
		expect(user).toBeNull();
	}
);

test(
	"Should fail to delete account for unathorized user",
	async () => {
		const response = await (
			request(server)
			.delete("/users/deleteProfile")
			.send()
			.expect(401)
		);
		expect(response.body.success).toBeFalsy();
	}
);

test(
	"Should upload avatar image",
	async () => {
		await (
			request(server)
			.post("/users/uploadAvatar")
			.set("Authorization", `Bearer ${userOne.tokens[0].token}`)
			.attach("avatar", "tests/fixtures/boat.jpg") // used for attaching files
			.expect(200)
		);
		const user = await User.findById(userOneId);
		expect(user.avatar).toEqual(expect.any(Buffer)); // checks for specified type
	}
);

test(
	"Should update valid user fields",
	async () => {
		const response = await (
			request(server)
			.patch("/users/updateProfile")
			.set("Authorization", `Bearer ${userOne.tokens[0].token}`)
			.send({
				name: "Maestro",
				email: "mr.maestro@mail.com",
				password: "abcdE12345",
				age: 25
			})
			.expect(200)
		);
		expect(response.body.success).toBeTruthy();

		const user = await User.findById(userOneId);
		expect(user.name).toBe("Maestro");
	}
);

test(
	"Should fail to update invalid user fields",
	async () => {
		const response = await (
			request(server)
			.patch("/users/updateProfile")
			.set("Authorization", `Bearer ${userOne.tokens[0].token}`)
			.send({
				name2: "Maestro",
			})
			.expect(409)
		);
		expect(response.body.success).toBeFalsy();
	}
);

test(
	"Should fail to update weak password",
	async () => {
		const response = await (
			request(server)
			.patch("/users/updateProfile")
			.set("Authorization", `Bearer ${userOne.tokens[0].token}`)
			.send({
				password: "ab12",
			})
			.expect(500)
		);
		expect(response.body.success).toBeFalsy();
	}
);