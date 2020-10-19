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
	const index = taxi0Positions.findIndex(({coordinates}) => {
		return coordinates[0] === position[0] && coordinates[1] === position[1];
	});

	let steps = 0;

	if (index > -1) {
		steps = taxi0Positions[index].steps;
	}

	return [index > -1, steps];
};

const findAllPositionsAndIntersections = (instructions, isTaxi1) => {
	let currPosition = [0, 0];
	let allPositions = [];
	let steps = 0;
	instructions.forEach((instruction) => {
		const direction = instruction.charAt(0);
		const distance = parseInt(instruction.slice(1));

		const move = moves[direction];

		for (let i = 0; i < distance; i++) {
			currPosition[0] = currPosition[0] + move[0];
			currPosition[1] = currPosition[1] + move[1];
			steps += 1;
			allPositions.push({
				coordinates: [...currPosition],
				steps,
			});

			if (isTaxi1) {
				const [isAIntersection, moreSteps] = isIntersection(currPosition);
				if (isAIntersection) {
					intersections.push({
						coordinates: [...currPosition],
						steps: (steps + moreSteps),
					});
				}
			}
		}
	});

	return allPositions;
};

const findShortestManhattanDistance = (intersections) => {
	let shortest = 0;
	intersections.forEach(({coordinates: [x, y]}) => {
		const manhattanDistance = Math.abs(x) + Math.abs(y);
		if (shortest === 0 || manhattanDistance < shortest) {
			shortest = manhattanDistance;
		}
	});

	return shortest;
};

const findShortestSteps = (intersections) => {
	let shortestSteps = 0;
	intersections.forEach(({steps}) => {
		if (shortestSteps === 0 || steps < shortestSteps) {
			shortestSteps = steps;
		}
	});

	return shortestSteps;
}

const main = () => {
	const taxis = readFile("input.txt");
	taxi0Positions = findAllPositionsAndIntersections(taxis[0]);
	taxi1Positions = findAllPositionsAndIntersections(taxis[1], true);
	const manhattanDistance = findShortestManhattanDistance(intersections);
	const shortestSteps = findShortestSteps(intersections);
	console.log("Manhattan Distance: ", manhattanDistance);
	console.log("Shortest steps: ", shortestSteps);
};

main();