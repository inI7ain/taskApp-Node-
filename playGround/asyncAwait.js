function add (a, b) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
			if (a < 0 || b < 0) {
				return reject("Numbers must be non negative.");
			}
            resolve(a + b);
        }, 2000);
    });
}

async function doWork () {
	// throw new Error('Error!'); // reject example
	// return "Attila"; // resolve example

	const addResult = await add(99, 1);  // await allows you to save data to variables like in synchronous fns
	const sum = await add(addResult, -107); // <- rejects after 4 secs
	return sum;
} // async functions always return a Promise

console.log(doWork()); // in this case the Promise gets fulfilled with the string

doWork().then((result) => { 
	console.log(`Result: ${result}`);
}).catch((error) => {
	console.log(error);
}); // setup code to run when the promise gets resolved / rejected
