async function jwtTest() {
	const token = jwt.sign(
		{ _id: "id12345" } /* data embedded in token */,
		"superSecretMessage", // secret sign of token to preven alteration
		{ expiresIn: '7 days' }
	);
	const payLoad = jwt.verify(token, "superSecretMessage");
}


jwtTest();