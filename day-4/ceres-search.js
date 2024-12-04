import fs from 'fs/promises';

const getCount = async () => {
  const lines = (await fs.readFile('./day-4/data.txt',
    { encoding: 'utf8' })).trim().split('\n').map(line => line.trim());

  const directions = {
    right: [0, 1],
    down: [1, 0],
    left: [0, -1],
    up: [-1, 0],
    rightUpDiagonal: [-1, 1],
    rightDownDiagonal: [1, 1],
    leftUpDiagonal: [-1, -1],
    leftDownDiagonal: [1, -1],
  }

  const word = 'XMAS';
  let count = 0;

  const isValid = (x, y) => x >= 0 && y >= 0 && x < lines.length && y < lines[0].length;
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      if (lines[i][j] === 'X') {
        Object.values(directions).forEach(direction => {
          let k;
          for (k = 0; k < word.length; k++) {
            const newX = i + k * direction[0];
            const newY = j + k * direction[1];
            if (!isValid(newX, newY) || lines[newX][newY] !== word[k]) {
              break;
            }
          }
          if (k === word.length) {
            count++;
          }
        })
      }
    }
  }
  return count;
}

console.log(await getCount());