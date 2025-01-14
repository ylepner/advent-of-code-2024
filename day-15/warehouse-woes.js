import fs from 'fs/promises';

const directions = {
  '^': [-1, 0],
  '>': [0, 1],
  'v': [1, 0],
  '<': [0, -1],
}

const solution = async () => {

  const data = (await fs.readFile('./day-15/data.txt', { encoding: 'utf8' }))
    .trim().split('\r\n')
    .map(line => line.trim());
  let grid = data.slice(0, data.indexOf('')).map(line => line.trim().split(''));
  const moves = (data.slice(data.indexOf('') + 1)).join('').split('')

  const getStartPosition = () => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] === '@')
          return [i, j]
      }
    }
  }

  let [startX, startY] = getStartPosition();

  while (moves.length > 0) {
    const move = moves.shift();
    const [x, y] = directions[move];
    const [newX, newY] = [startX + x, startY + y];
    if (grid[newX][newY] === '#') {
      continue
    }
    else if (grid[newX][newY] === 'O') {
      let boxX = newX;
      let boxY = newY;
      while (grid[boxX + x][boxY + y] === 'O') {
        boxX += x;
        boxY += y;
      }
      if (grid[boxX + x][boxY + y] === '#') {
        continue
      } else {
        grid[boxX + x][boxY + y] = 'O'
        grid[newX][newY] = '.'
      }
    }
    [startX, startY] = [newX, newY]
  }

  let arr = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 'O') {
        arr.push([i, j])
      }
    }
  }

  let sum = arr.map(([a, b]) => {
    const sum = a * 100 + b;
    return sum;
  }).reduce((a, b) => a + b)
  return sum;
}

console.log(await solution());
