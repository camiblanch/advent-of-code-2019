const readFile = require("../readFile");

function calcFuelNeeded(mass) {
	const fuel = Math.floor(mass / 3) - 2;
	return fuel < 0 ? 0 : fuel;
}

function manyFuel(fuel) {
	const fuelForFuel = calcFuelNeeded(fuel);
	let fuelTotal = fuelForFuel;
	if (fuelForFuel > 0) {
		fuelTotal += manyFuel(fuelForFuel);
	}
	return fuelTotal;
}

const moduleMasses = readFile("input.txt");
let partOneFuel = 0;
let partTwoFuel = 0;

moduleMasses.forEach(mass => {
	const fuel = calcFuelNeeded(mass);
	partOneFuel += fuel;

	partTwoFuel += manyFuel(fuel);
});

partTwoFuel += partOneFuel;

console.log("Part one: " + partOneFuel);
console.log("Part two: " + partTwoFuel);

