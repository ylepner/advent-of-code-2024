import fs from 'fs/promises';

const directions = [
  [-1, 0], // up
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
];


const isValid = (x, y, topMap) => x >= 0 && y >= 0 && x < topMap.length && y < topMap[0].length;

const getSum = async () => {
  const data = (await fs.readFile('./day-10/data.txt', { encoding: 'utf8' }))
    .trim()
    .split('\n')
    .map(el => el.trim());

  const topMap = data.map(line => line.split('').map(Number));
  const trailHeads = [];

  for (let i = 0; i < topMap.length; i++) {
    for (let j = 0; j < topMap[0].length; j++) {
      if (topMap[i][j] === 0) {
        trailHeads.push([i, j]);
      }
    }
  }

  const trailHeadsScore = {};

  const dfs = (x, y, visited, visitedVertices) => {
    if (topMap[x][y] === 9) {
      visitedVertices.add([x, y].toString());
      return;
    }

    visited.add([x, y].toString());

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;
      if (isValid(newX, newY, topMap) && topMap[newX][newY] === topMap[x][y] + 1 && !visited.has(`${newX},${newY}`)) {
        dfs(newX, newY, visited, visitedVertices);
      }
    }
  };

  trailHeads.forEach((position, index) => {
    const [startX, startY] = position;
    const visited = new Set();
    const visitedVertices = new Set();
    dfs(startX, startY, visited, visitedVertices);
    trailHeadsScore[index] = visitedVertices.size;
  });


  const totalSum = Object.values(trailHeadsScore).reduce((acc, val) => acc + val, 0);
  return totalSum;
};


console.log(await getSum());
