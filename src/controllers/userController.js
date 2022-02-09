

const userController = {
	async createUser(request, response) {
		try {
			const user = new User(request.body);
			await user.save();
			response.status(201).send({
				success: true,
				message: "User created successfully.",
				data: user,
			})
		} catch (error) {
			response.status(400).send({
				success: false,
				message: `User creation error: ${error}`,
				data: null,
			});
		}
		/* Promise chaining version
		 const user = new User(request.body).save().then((user) => {
			response.status(201).send({
				success: true,
				message: "User created successfully.",
				data: user,
			});
		}).catch((error) => {
			response.status(400).send({
				success: false,
				message: `User creation error: ${error}`,
				data: null,
			});
		}); 
		*/
	},
	async readAllUsers(request, response) {
		try {
			const users = await User.find({});
			response.status(200).send({
				success: true,
				message: "Data retrieved successfully.",
				data: users,
			});
		} catch (error) {
			response.status(500).send({
				success: false,
				message: `Error reading users: ${error}`,
				data: null,
			});
		}
	},
	async readUserById(request, response) {
		try {
			const user = await User.findById(request.params.id);
			if (!user) {
				return response.status(404).send({
					success: false,
					message: "User not found.",
					data: null,
				});
			}
			response.status(200).send({
				success: true,
				message: `Data retrieved successfully.`,
				data: user,
			});
		} catch (error) {
			response.status(500).send({
				success: false,
				message: `Error reading users: ${error}`,
				data: null,
			});
		}
	},
};

module.exports = userController;
