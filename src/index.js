const server = require("./server");

server.listen(port, () => {
	console.log(`Server is up and running on port: ${port}`);
});