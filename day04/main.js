const readFile = file => {
	const fs = require("fs");
	return fs.readFileSync(file).toString().split("-");
};

const passesFacts = (password) => {
	if (password.length !== 6) {
		return false;
	}
};

const main = () => {
	const range = readFile("input.txt");
};

main();