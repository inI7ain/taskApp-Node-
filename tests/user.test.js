const request = require('supertest');
const server = require("../src/server");

test(
	"Should create new user",
	async () => {
		await request(server).post("/users/create").send({
			name: "Attila",
			email: "inI7ain@pm.me",
			password: "abcD1234",
		}).expect(201);
	}
).;