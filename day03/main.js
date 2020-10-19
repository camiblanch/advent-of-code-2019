const readFile = file => {
	const fs = require("fs");
	const lines = fs.readFileSync(file).toString().split("\n");

	return lines.map(line => line.split(","));
};

let taxi0Positions = [];
let taxi1Positions = [];
let intersections = [];

const moves = {
	"U": [0, 1],
	"D": [0, -1],
	"L": [-1, 0],
	"R": [1, 0],
};

const isIntersection = (position) => {
	const index = taxi0Positions.findIndex((taxi0Position) => {
		return taxi0Position[0] === position[0] && taxi0Position[1] === position[1];
	});

	return index > -1;
};

const findAllPositionsAndIntersections = (instructions, isTaxi1) => {
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

			if (isTaxi1 && isIntersection(currPosition)) {
				intersections.push([...currPosition]);
			}
		}
	});

	return allPositions;
};

const findShortestManhattanDistance = (intersections) => {
	let shortest = 0;
	intersections.forEach(([x, y]) => {
		const manhattanDistance = Math.abs(x) + Math.abs(y);
		if (shortest === 0 || manhattanDistance < shortest) {
			shortest = manhattanDistance;
		}
	});

	return shortest;
};

const main = () => {
	const taxis = readFile("input.txt");
	taxi0Positions = findAllPositionsAndIntersections(taxis[0]);
	taxi1Positions = findAllPositionsAndIntersections(taxis[1], true);

	const manhattanDistance = findShortestManhattanDistance(intersections);
	console.log(manhattanDistance);
};

main();