const readFile = file => {
	const fs = require("fs");
	const data = fs.readFileSync(file).toString().split("-");
	return data.map(d => parseInt(d));
};

const passesFacts = (number) => {
	const password = number.toString();

	if (password.length !== 6) {
		return false;
	}
	return true;
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