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
	const matches = [];

	for (let i = range[0]; i <= range[1]; i++) {
		if (passesFacts(i)) {
			matches.push(i);
		}
	}

	console.log(matches);
	console.log("Num matches: ", matches.length);
};

main();