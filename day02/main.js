function readFile(file) {
	const fs = require("fs");
	return fs.readFileSync(file).toString().split(",").map(Number);
}

function operate(opcodeIndex) {
	switch (opcodes[opcodeIndex]) {
		case 1:
			// TODO: add
			add(getPositions(opcodeIndex));
			opcodeIndex += 4;
			operate(opcodeIndex);
			break;
		case 2:
			multiply(getPositions(opcodeIndex));
			opcodeIndex += 4;
			operate(opcodeIndex);
			break;
		case 99:
			return;
		default:
			console.error("THIS IS FINE");
			return;
	}
}

function getPositions(opcodeIndex) {
	return {
		x: opcodes[opcodes[opcodeIndex + 1]],
		y: opcodes[opcodes[opcodeIndex + 2]],
		answerIndex: opcodes[opcodeIndex + 3],
	};
}

function add({x, y, answerIndex}) {
	opcodes[answerIndex] = x + y;
}

function multiply({x, y, answerIndex}) {
	opcodes[answerIndex] = x * y;
}

// Part 1
// let opcodes = readFile("input.txt");
// operate(0);
// console.log(opcodes[0]);

// Part 2
let opcodes = [];
for (let noun = 0; noun <= 99; noun++) {
	for (let verb = 0; verb <= 99; verb++) {
		opcodes = readFile("input.txt");
		opcodes[1] = noun;
		opcodes[2] = verb;

		operate(0);
		if (opcodes[0] === 19690720) {
			console.log("noun: " + noun);
			console.log("verb: " + verb);
			console.log(100 * noun + verb);
			break;
		}
	}
}
