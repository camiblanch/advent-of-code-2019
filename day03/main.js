const readFile = file => {
	const fs = require("fs");
	const lines = fs.readFileSync(file).toString().split("\n");

	return lines.map(line => {
		return line.split(",");
	});
};

const main = () => {
	const instructions = readFile("input.txt")
	console.log(instructions);
}

main();