const readFile = file => {
	const fs = require("fs");
	const data = fs.readFileSync(file).toString().split("-");
	return data.map(d => parseInt(d));
};

const containsAtLeastOneDigitPair = (password) => {
	for (let i = 0; i < password.length; i++) {
		if (password.charAt(i) === password.charAt(i + 1)) {
			return true;
		}
	}
	return false;
};

const passesFacts = (number) => {
	const password = number.toString();

	if (password.length !== 6) {
		return false;
	}

	if (!containsAtLeastOneDigitPair(password)) {
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