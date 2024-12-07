import fs from 'fs/promises';

const getResult = async () => {
  const equations = (await fs.readFile('./day-7/data.txt', { encoding: 'utf8' }))
    .trim()
    .split('\n')
    .map(line => line.trim().split(': '))
    .map(([l, r]) => [parseInt(l), r.trim().split(' ').map(Number)])

  let total = 0;
  equations.forEach(([target, numbers]) => {
    const result = evaluate(numbers, target, numbers[0], 1);
    if (result) total += target;
  })
  return total;

}

const evaluate = (numbers, target, current = 0, index = 0) => {
  if (index === numbers.length) {
    return current === target;
  }

  if (evaluate(numbers, target, current + numbers[index], index + 1)) {
    return true;
  }

  if (evaluate(numbers, target, current * numbers[index], index + 1)) {
    return true;
  }

  return false;
};

console.log(await getResult());