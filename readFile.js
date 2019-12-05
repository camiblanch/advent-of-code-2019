module.exports = (file, asNumber = true) => {
	const fs = require("fs");
	if (asNumber) {
		return fs.readFileSync(file).toString().split("\n").map(Number);
	}
	return fs.readFileSync(file).toString().split("\n");
};