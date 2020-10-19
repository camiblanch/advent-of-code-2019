const readFile = file => {
	const fs = require("fs");
	const lines = fs.readFileSync(file).toString().split("\n");

	return lines.map(line => line.split(","));
};

const moves = {
	"U": [0, 1],
	"D": [0, -1],
	"L": [1, 0],
	"R": [-1, 0],
};

const findAllPositions = instructions => {
	let currPosition = [0, 0];
	let allPositions = [];
	instructions.forEach((instruction) => {
		const direction = instruction.charAt(0);
		const distance = instruction.slice(1);

		const move = moves[direction];

		for (let i = 0; i < distance; i++) {
			currPosition[0] = currPosition[0] + move[0];
			currPosition[1] = currPosition[1] + move[1];
			allPositions.push([...currPosition]);
		}
	});

	return allPositions;
};

const findIntersections = ([taxi0Positions, taxi1Positions]) => {

	return taxi0Positions.filter(taxi0Position => {
		return taxi1Positions.find((taxi1Position) => taxi0Position[0] === taxi1Position[0] && taxi0Position[1] === taxi1Position[1]);
	});
};

const main = () => {
	const taxis = readFile("input.txt");
	const positions = taxis.map(taxi => {
		return findAllPositions(taxi);
	});

	const intersections = findIntersections(positions);
};

main();