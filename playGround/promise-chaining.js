require("../src/db/mongoose");
const User = require("../src/models/users");
const Task = require("../src/models/tasks");


/* 
// Standard promise-chaining
User.findByIdAndUpdate("6200168bfa62868953bd334f", {
	age: 1,
}).then((user) => { // in promise chaining it is difficult to have the same variables in the same scope
	console.log(user);
	return User.countDocuments({ age: 1 }) 
}).then((result) => { // you could reassing parent variables in every scope but it gets messy quick
	console.log(result);
}).catch((error) => {
	console.log(error);
});

// Async-await conversion
async function updateAgeAndCount (id, age) {
	const user = await User.findByIdAndUpdate(id, { age });
	const count = await User.countDocuments({ age });
	return count;
}

updateAgeAndCount("620366419030aa83454f4b46", 1).then((count) => {
	console.log(count);
}).catch((error) => {
	console.log(error);
});
*/


Task.findByIdAndDelete("62025006ccf895c5297005a1").then((task) => {
	console.log(task);
	return Task.countDocuments({ completed: false });
}).then((result) => {
	console.log(result);
}).catch((error) => {
	console.log(error);
});

async function deleteTaskAndCount(id) {
	const deletedTask = await Task.findByIdAndDelete(id);
	if (!deletedTask) {
		throw new Error("Task not found in database.");
	}
	return await Task.countDocuments();
}

deleteTaskAndCount("62024feeccf895c52970059d").then((result) => {
	console.log(result);
}).catch((error) => {
	console.log(error);
});