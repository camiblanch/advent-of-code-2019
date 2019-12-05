const readFile = require("../readFile");

class Module {
	constructor(mass = 0) {
		this.mass = mass;
	}

	calcFuelNeeded() {
		const fuel = Math.floor(this.mass / 3) - 2;
		return fuel < 0 ? 0 : fuel;
	}
}

const moduleMasses = readFile("input.txt");
let partOneFuel = 0;

moduleMasses.forEach(mass => {
	const module = new Module(mass);
	partOneFuel += module.calcFuelNeeded();
});

console.log("Part one: " + partOneFuel);

