import fs from 'fs/promises';

const parseInput = (lines) => {

  const parseLine = (line, regex) => line.match(regex).slice(1).map(Number);

  const buttonA = parseLine(lines[0], /X\+(\d+), Y\+(\d+)/);
  const buttonB = parseLine(lines[1], /X\+(\d+), Y\+(\d+)/);
  const prize = parseLine(lines[2], /X=(\d+), Y=(\d+)/);

  return [buttonA[0], buttonB[0], prize[0], buttonA[1], buttonB[1], prize[1]];
};

const solveEquations = ([a1, b1, c1, a2, b2, c2]) => {
  const determinant = a1 * b2 - a2 * b1;

  if (determinant === 0) {
    return false
  }

  const x = (c1 * b2 - c2 * b1) / determinant;
  const y = (a1 * c2 - a2 * c1) / determinant;

  if (Number.isInteger(x) && Number.isInteger(y) && x <= 100 && y <= 100) {
    return x * 3 + y;
  }
  return null
}

const countTokens = async () => {
  const data = (await fs.readFile('./day-13/data.txt', { encoding: 'utf8' }))
    .trim()
    .split('\r\n')

  const result = data.reduce((acc, curr) => {
    if (curr === '') {
      acc.push([])
    } else {
      if (acc.length === 0) {
        acc.push([]);
      }
      acc[acc.length - 1].push(curr);
    }
    return acc;
  }, [])
    .map(machine => parseInput(machine))
    .map(equation => solveEquations(equation))
    .filter(el => el != null)
    .reduce((a, b) => a + b);
  return result

}

console.log(await countTokens());