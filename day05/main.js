function readFile(file) {
	const fs = require("fs");
	return fs.readFileSync(file).toString().split(",").map(Number);
}

const input = 5;

function makeInstructionFullLength(opcodeIndex) {
	let instruction = opcodes[opcodeIndex].toString();
	while (instruction.length < 5) {
		instruction = "0" + instruction;
	}
	return instruction;
}
function operate(opcodeIndex) {
	const instruction = makeInstructionFullLength(opcodeIndex);
	const opcode = instruction.slice(3, 5);
	const paramModes = [
		parseInt(instruction.slice(2, 3)),
		parseInt(instruction.slice(1, 2)),
		parseInt(instruction.slice(0, 1)),
	];

	switch (opcode) {
		case "01":
			add(getPositions(opcodeIndex, paramModes));
			opcodeIndex += 4;
			operate(opcodeIndex);
			break;
		case "02":
			multiply(getPositions(opcodeIndex, paramModes));
			opcodeIndex += 4;
			operate(opcodeIndex);
			break;
		case "03":
			const positionToPlaceInput = getOneParam(opcodeIndex, paramModes[0]);
			opcodes[positionToPlaceInput] = input;
			opcodeIndex += 2;
			operate(opcodeIndex);
			break;
		case "04":
			const output = opcodes[getOneParam(opcodeIndex, paramModes[0])];
			console.log("Output: ", output);
			opcodeIndex += 2;
			operate(opcodeIndex);
			break;
		case "05":
			const opcode5param1 = opcodes[getOneParam(opcodeIndex, paramModes[0])];
			const opcode5param2 = opcodes[getOneParam(opcodeIndex + 1, paramModes[1])];
			if (opcode5param1 !== 0) {
				opcodeIndex = opcode5param2;
			} else {
				opcodeIndex += 3;
			}
			operate(opcodeIndex);
			break;
		case "06":
			const opcode6param1 = opcodes[getOneParam(opcodeIndex, paramModes[0])];
			const opcode6param2 = opcodes[getOneParam(opcodeIndex + 1, paramModes[1])];
			if (opcode6param1 === 0) {
				opcodeIndex = opcode6param2;
			} else {
				opcodeIndex += 3;
			}
			operate(opcodeIndex);
			break;
		case "07":
			const opcode7param1 = opcodes[getOneParam(opcodeIndex, paramModes[0])];
			const opcode7param2 = opcodes[getOneParam(opcodeIndex + 1, paramModes[1])];
			const opcode7param3 = getOneParam(opcodeIndex + 2, paramModes[2]);
			if (opcode7param1 < opcode7param2) {
				opcodes[opcode7param3] = 1;
			} else {
				opcodes[opcode7param3] = 0;
			}
			opcodeIndex += 4;
			operate(opcodeIndex);
			break;
		case "08":
			const opcode8param1 = opcodes[getOneParam(opcodeIndex, paramModes[0])];
			const opcode8param2 = opcodes[getOneParam(opcodeIndex + 1, paramModes[1])];
			const opcode8param3 = getOneParam(opcodeIndex + 2, paramModes[2]);
			if (opcode8param1 === opcode8param2) {
				opcodes[opcode8param3] = 1;
			} else {
				opcodes[opcode8param3] = 0;
			}
			opcodeIndex += 4;
			operate(opcodeIndex);
			break;
		case "99":
			return;
		default:
			console.error("THIS IS FINE ", opcode, opcodeIndex);
			return;
	}
}

function getPositions(opcodeIndex, modes) {
	return {
		x: modes[0] ? opcodes[opcodeIndex + 1] : opcodes[opcodes[opcodeIndex + 1]],
		y: modes[1] ? opcodes[opcodeIndex + 2] : opcodes[opcodes[opcodeIndex + 2]],
		answerIndex: modes[2] ? opcodeIndex + 3 : opcodes[opcodeIndex + 3],
	};
}

function getOneParam(opcodeIndex, mode) {
	return mode ? opcodeIndex + 1 : opcodes[opcodeIndex + 1];
}

function add({x, y, answerIndex}) {
	opcodes[answerIndex] = x + y;
}

function multiply({x, y, answerIndex}) {
	opcodes[answerIndex] = x * y;
}

// Part 1
let opcodes = readFile("input.txt");
operate(0);

// console.log(opcodes[0]);