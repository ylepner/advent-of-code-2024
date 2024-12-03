import fs from 'fs/promises';

const countSafeReports = async () => {
  let result = 0;
  const lines = (await fs.readFile('./day-2/data.txt', { encoding: 'utf8' })).trim().split('\n')
    .map(line => line.trim().split(/\s+/).map(Number));

  const isIncreasing = arr => arr.every((num, i) => i === 0 || (num > arr[i - 1] && num - arr[i - 1] <= 3));
  const isDecreasing = arr => arr.every((num, i) => i === 0 || (num < arr[i - 1] && arr[i - 1] - num <= 3));

  lines.forEach(line => {
    if (isIncreasing(line) || isDecreasing(line)) {
      result += 1
    }

  })

  return result
}

console.log(await countSafeReports());