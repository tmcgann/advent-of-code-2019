// const input = '1,9,10,3,2,3,11,0,99,30,40,50'
// const input = '1,0,0,0,99'
// const input = '2,3,0,3,99'
// const input = '1,1,1,4,99,5,6,0,99'
// const originalInput = '1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,6,1,19,1,19,10,23,2,13,23,27,1,5,27,31,2,6,31,35,1,6,35,39,2,39,9,43,1,5,43,47,1,13,47,51,1,10,51,55,2,55,10,59,2,10,59,63,1,9,63,67,2,67,13,71,1,71,6,75,2,6,75,79,1,5,79,83,2,83,9,87,1,6,87,91,2,91,6,95,1,95,6,99,2,99,13,103,1,6,103,107,1,2,107,111,1,111,9,0,99,2,14,0,0'
const input =
  '1,12,2,3,1,1,2,3,1,3,4,3,1,5,0,3,2,6,1,19,1,19,10,23,2,13,23,27,1,5,27,31,2,6,31,35,1,6,35,39,2,39,9,43,1,5,43,47,1,13,47,51,1,10,51,55,2,55,10,59,2,10,59,63,1,9,63,67,2,67,13,71,1,71,6,75,2,6,75,79,1,5,79,83,2,83,9,87,1,6,87,91,2,91,6,95,1,95,6,99,2,99,13,103,1,6,103,107,1,2,107,111,1,111,9,0,99,2,14,0,0'

const opcodes = Object.freeze({
  ADD: 1,
  MULTIPLY: 2,
  HALT: 99,
})
const errorMessages = Object.freeze({
  HALT: 'HALT',
})

function getOperation(opcode) {
  switch (opcode) {
    case opcodes.ADD: // SUM
      return (a, b) => a + b
    case opcodes.MULTIPLY: // MULTIPLY
      return (a, b) => a * b
    case opcodes.HALT: // HALT
      throw new Error(errorMessages.HALT)
    default:
      // ERROR
      throw new TypeError(`Unhandled opcode: ${opcode}`)
  }
}

function getOperands(position, values) {
  return [values[values[position + 1]], values[values[position + 2]]]
}

function parseInput(input) {
  return input.split(',').map(value => Number.parseInt(value, 10))
}

function stringifyValues(values) {
  return values.join(',')
}

function updateValuesWithOutput(position, values, output) {
  const newValues = values.slice()
  newValues[newValues[position + 3]] = output
  return newValues
}

function run(input) {
  const valueHistory = []
  let position = 0
  let values = parseInput(input)
  valueHistory.push(values)

  while (position < values.length) {
    try {
      // console.log('position:', position)
      // console.log('values:', values)
      const opcode = values[position]
      // console.log('opcode:', opcode)
      const operation = getOperation(opcode)
      const operands = getOperands(position, values)
      // console.log('operands:', operands)
      const output = operation(...operands)
      // console.log('output:', output)
      values = updateValuesWithOutput(position, values, output)
      valueHistory.push(values)
      position += 4
    } catch (error) {
      if (error.message === errorMessages.HALT) {
        // console.log(error.message)
        return stringifyValues(values)
      }
      throw error
    }
  }
}

const output = run(input)
console.log(output)
