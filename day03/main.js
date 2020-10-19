const readFile = file => {
	const fs = require("fs");
	return fs.readFileSync(file).toString().split(",");
};

const main = () => {
	const instructions = readFile("input.txt")
	console.log(instructions);
}

main();