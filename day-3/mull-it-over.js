import fs from 'fs/promises';

const getMultiplicationsResult = async () => {
  const data = (await fs.readFile('./day-3/data.txt',
    { encoding: 'utf8' })).trim();

  const regex = /mul\((\d+),(\d+\))/g;
  const matches = data.match(regex);
  let result = [];
  matches.forEach(match => {
    const [exp, num1, num2] = match.match(/mul\((\d+),(\d+\))/);
    result.push(parseInt(num1) * parseInt(num2));
  });

  console.log(result.reduce((a, b) => a + b));
}

console.log(await getMultiplicationsResult());