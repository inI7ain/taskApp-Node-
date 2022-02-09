// CRUD operations

const { MongoClient, ObjectId } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const dbName = "taskManager";

const id = new ObjectId();
// console.log(id.toString());
// console.log(id.getTimestamp());

/*	create exaples

	MongoClient.connect(
    connectionURL,
    { useNewUrlParser: true },
    (error, client) => {
        if (error) {
            return console.log("Database connection could not be established!");
        }

        console.log("Database connection established.");
        const db = client.db(dbName);

		single doc insertion
		db.collection("users").insertOne(
			{
				// accepts single object to be inserted
				name: "Attila",
				age: 27,
			},
			(error, result) => {
				if (error) {
					return console.log(
						`Unable to insert user!\nError: ${error}`
					);
				}
				console.log(result);
			}
		); 
	

		multiple docs insertion
		db.collection("users").insertMany(
			[
				{
					name: "Lilla",
					age: 25,
				},
				{
					name: "Marcell",
					age: 30,
				},
			],
			(error, result) => {
				if (error) {
					return console.log(
						`Unable to insert data!\nError: ${error}`
					);
				}
				console.log(result);
			}
		);
		
    });
*/

// read examples
MongoClient.connect(
    connectionURL,
    { useNewUrlParser: true },
    (error, client) => {
        if (error) {
            return console.log(error);
        }

        const db = client.db(dbName);
        /* 
        db.collection("users").findOne(
            { _id: new ObjectId("61fdc34ec2228b923dc8399d") },
            (error, user) => {
                // findOne always returns first matching result
                if (error) {
                    return console.log(error);
                }
                console.log(user);
            }
        );
 */
        db.collection("users")
            .find({ age: 27 })
            .toArray((error, users) => {
                console.log(users);
            }
        );
        // find returns a Cursor (pointer to the data)

        db.collection("users").count((error, count) => {
            console.log(count);
        }); // returns just count and doesn't consume excess memory

        db.collection("users")
            .find({ age: 27 })
            .count((error, count) => {
                console.log(count);
            }
        );
        // same as above with filter critera

        db.collection("projects").findOne(
            { _id: new ObjectId("61fdcac67986d5a93b1b38be") },
            (error, data) => {
                console.log(data);
            }
        );

        db.collection("projects")
            .find({ completed: true })
            .toArray((error, data) => {
                console.log(data);
            }
        );
    }
);
