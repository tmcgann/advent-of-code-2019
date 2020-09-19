function getDigitCount(number) {
  return number.toString().length
}

function isLength(length, number) {
  return length === getDigitCount(number)
}

function hasSixDigits(number) {
  return isLength(6, number)
}

function subsequentDigitsAscend(number) {
    const digits = number.toString().split('')

    for (let index = 0; index < digits.length; index++) {
        if (digits[index] > digits[index + 1]) {
            return false
        }
    }

    return true
}

function checkNumber(number) {
    return (
        hasSixDigits(number) &&
        subsequentDigitsAscend(number) &&
    )
}
