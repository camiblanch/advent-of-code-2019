const readFile = require("../readFile");

class Module {
	constructor(mass = 0) {
		this.mass = mass;
	}

	calcFuelNeeded() {
		return Math.floor(this.mass / 3) - 2;
	}
}

const moduleMasses = readFile("input.txt");
let totalFuelNeeded = 0;

moduleMasses.forEach(mass => {
	const module = new Module(mass);
	totalFuelNeeded += module.calcFuelNeeded();
});

console.log(totalFuelNeeded);
