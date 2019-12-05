const readFile = require("../readFile");

function calcFuelNeeded(mass) {
	const fuel = Math.floor(mass / 3) - 2;
	return fuel < 0 ? 0 : fuel;
}

const moduleMasses = readFile("input.txt");
let partOneFuel = 0;

moduleMasses.forEach(mass => {
	partOneFuel += calcFuelNeeded(mass);
});

console.log("Part one: " + partOneFuel);

