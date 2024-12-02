import fs from 'fs/promises';

const getDistance = async () => {
  const data = await fs.readFile('./day-1/data.txt', { encoding: 'utf8' });
  const lines = data.trim().split('\n');
  let arr1 = [];
  let arr2 = [];

  lines.forEach(line => {
    const [num1, num2] = line.trim().split(/\s+/).map(Number);
    arr1.push(num1);
    arr2.push(num2);
  })

  arr1.sort((a, b) => a - b);
  arr2.sort((a, b) => a - b);

  return arr1.reduce((acc, num, index) => acc + Math.abs(num - arr2[index]), 0)
}

console.log(await getDistance());