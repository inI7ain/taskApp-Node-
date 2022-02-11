// express calls JSON.stringify when passing an object to response.send()
// toJSON() gets called when stringify is called

const pet = {
	name: "Hal",
}

pet.toJSON = function () {
	/* console.log(this); // return original object
	return this; */
	return {};
}

console.log(JSON.stringify(pet));