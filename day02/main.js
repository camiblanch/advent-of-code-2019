function readFile(file) {
	const fs = require("fs");
	return fs.readFileSync(file).toString().split(",").map(Number);
}
const opcodes = readFile("input.txt");