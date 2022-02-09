// CRUD operations

const { MongoClient, ObjectId } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const dbName = "taskManager";

MongoClient.connect(
	connectionURL,
	{ useNewUrlParser: true },
	(error, client) => {
		if (error) {
			return console.log(error);
		}

		const db = client.db(dbName);

		// update examples
		/* db.collection("users").updateOne(
			{
				_id: new ObjectId("61fdc34ec2228b923dc8399d"),
			},
			{	// update operators documentation
				$set: {
					name: "Tony",
				},
				//$inc: {
				//	age: 1
				//}
			}).then((result) => {
				console.log(result);
			}).catch((error) => {
				console.log(error);
			}
		); */

		/* db.collection("projects").updateMany(
			{
				completed: true,
			},
			{
				$set: {
					completed: false,
				}
			}).then((result) => {
				console.log(result);
			}).catch((error) => {
				console.log(error);
			}
		); */

		// delete examples
		/* db.collection("users")
			.deleteMany({
				age: 27,
			})
			.then((result) => {
				console.log(result);
			})
			.catch((error) => {
				console.log(error);
			}
		); */

		db.collection("projects")
			.deleteOne({
				_id: new ObjectId("61fdcac67986d5a93b1b38bd"),
			})
			.then((result) => {
				console.log(result);
			})
			.catch((error) => {
				console.log(error);
			}
		);
	}
);
