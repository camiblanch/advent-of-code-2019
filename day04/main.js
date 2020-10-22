const readFile = file => {
	const fs = require("fs");
	const data = fs.readFileSync(file).toString().split("-");
	return data.map(d => parseInt(d));
};

const containsAtLeastOneDigitPair = (password) => {
	for (let i = 0; i < password.length - 1; i++) {
		if (password.charAt(i) === password.charAt(i + 1)) {
			return true;
		}
	}
	return false;
};

const digitsNeverDecrease = (password) => {
	for (let i = 0; i < password.length - 1; i++) {
		if (parseInt(password.charAt(i)) > parseInt(password.charAt(i + 1))) {
			return false;
		}
	}
	return true;
};

const passesPartOneFacts = (number) => {
	const password = number.toString();

	if (password.length !== 6) {
		return false;
	}

	if (!containsAtLeastOneDigitPair(password)) {
		return false;
	}

	if (!digitsNeverDecrease(password)) {
		return false;
	}

	return true;
};

const partOneMain = () => {
	const range = readFile("input.txt");
	const matches = [];

	for (let i = range[0]; i <= range[1]; i++) {
		if (passesPartOneFacts(i)) {
			matches.push(i);
		}
	}

	console.log("Num matches: ", matches.length);
};

const partTwoMain = () => {
	const range = readFile("input.txt");
	const matches = [];

	for (let i = range[0]; i <= range[1]; i++) {
		if (passesPartOneFacts(i)) {
			matches.push(i);
		}
	}

	console.log("Num matches: ", matches.length);
};

// partOneMain();
partTwoMain();