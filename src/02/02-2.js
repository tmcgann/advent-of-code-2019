const range = require("lodash.range");

// const input = '1,9,10,3,2,3,11,0,99,30,40,50'
// const input = '1,0,0,0,99'
// const input = '2,3,0,3,99'
// const input = '1,1,1,4,99,5,6,0,99'

// original input
const input =
  "1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,6,1,19,1,19,10,23,2,13,23,27,1,5,27,31,2,6,31,35,1,6,35,39,2,39,9,43,1,5,43,47,1,13,47,51,1,10,51,55,2,55,10,59,2,10,59,63,1,9,63,67,2,67,13,71,1,71,6,75,2,6,75,79,1,5,79,83,2,83,9,87,1,6,87,91,2,91,6,95,1,95,6,99,2,99,13,103,1,6,103,107,1,2,107,111,1,111,9,0,99,2,14,0,0";
// modified input
// const input = '1,12,2,3,1,1,2,3,1,3,4,3,1,5,0,3,2,6,1,19,1,19,10,23,2,13,23,27,1,5,27,31,2,6,31,35,1,6,35,39,2,39,9,43,1,5,43,47,1,13,47,51,1,10,51,55,2,55,10,59,2,10,59,63,1,9,63,67,2,67,13,71,1,71,6,75,2,6,75,79,1,5,79,83,2,83,9,87,1,6,87,91,2,91,6,95,1,95,6,99,2,99,13,103,1,6,103,107,1,2,107,111,1,111,9,0,99,2,14,0,0';

const opcodes = Object.freeze({
  ADD: 1,
  MULTIPLY: 2,
  HALT: 99
});
const errorMessages = Object.freeze({
  HALT: "HALT"
});

function getInstructionFunction(opcode) {
  switch (opcode) {
    case opcodes.ADD: // SUM
      return (a, b) => a + b;
    case opcodes.MULTIPLY: // MULTIPLY
      return (a, b) => a * b;
    case opcodes.HALT: // HALT
      throw new Error(errorMessages.HALT);
    default:
      // ERROR
      throw new TypeError(`Unhandled opcode: ${opcode}`);
  }
}

function getInstructionParameters(position, values) {
  return [values[values[position + 1]], values[values[position + 2]]];
}

function parseInput(input, transformer = values => values) {
  return transformer(input.split(",").map(value => Number.parseInt(value, 10)));
}

function stringifyValues(values) {
  return values.join(",");
}

function updateValuesWithOutput(position, values, output) {
  const newValues = values.slice();
  newValues[newValues[position + 3]] = output;
  return newValues;
}

function run(input, noun, verb) {
  const valueHistory = [];
  let instructionPointer = 0;
  let values = parseInput(input, values => {
    values[1] = noun == null ? values[1] : noun;
    values[2] = noun == null ? values[2] : verb;
    return values;
  });
  valueHistory.push(values);

  while (instructionPointer < values.length) {
    try {
      // console.log('instructionPointer:', instructionPointer)
      // console.log('values:', values)
      const opcode = values[instructionPointer];
      // console.log('opcode:', opcode)
      const instructionFn = getInstructionFunction(opcode);
      const instructionParameters = getInstructionParameters(
        instructionPointer,
        values
      );
      // console.log('instructionParameters:', instructionParameters)
      const output = instructionFn(...instructionParameters);
      // console.log('output:', output)
      values = updateValuesWithOutput(instructionPointer, values, output);
      valueHistory.push(values);
      instructionPointer += 4;
    } catch (error) {
      if (error.message === errorMessages.HALT) {
        // console.log(error.message)
        return values;
      }
      throw error;
    }
  }
}

const array = range(0, 99);
for (let noun = 0; noun < array.length; noun++) {
  for (let verb = 0; verb < array.length; verb++) {
    const output = run(input, noun, verb);
    if (output[0] === 19690720) {
      console.log(output[0], noun, verb);
      console.log(100 * noun + verb);
    }
  }
}
