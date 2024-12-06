import fs from 'fs/promises';

const directions = [
  { name: 'up', vector: [-1, 0] },
  { name: 'right', vector: [0, 1] },
  { name: 'down', vector: [1, 0] },
  { name: 'left', vector: [0, -1] },
];

let steps = new Set();

const isValid = (x, y, lines) => x >= 0 && y >= 0 && x < lines.length && y < lines[0].length;

const getCount = async () => {
  const field = (await fs.readFile('./day-6/data.txt', { encoding: 'utf8' })).trim().split('\n').map(el => el.trim());
  let start = [0, 0];
  field.forEach((line, index) => {
    if (line.includes('^')) {
      start[0] = index;
      start[1] = line.indexOf('^');
      steps.add(start.toString());
    }
  });

  let directionIndex = 0;
  let direction = directions[directionIndex].vector;

  while (true) {
    const newX = start[0] + direction[0];
    const newY = start[1] + direction[1];
    if (isValid(newX, newY, field) && field[newX][newY] !== '#') {
      start[0] = newX;
      start[1] = newY;
      steps.add(start.toString())
    } else if (isValid(newX, newY, field) && field[newX][newY] === '#') {
      directionIndex = (directionIndex + 1) % directions.length;
      direction = directions[directionIndex].vector;
    } else {
      break
    }
  }
  return (steps.size)
}
console.log(await getCount())
