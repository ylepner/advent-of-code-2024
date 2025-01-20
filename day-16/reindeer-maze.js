import fs from 'fs/promises'

const directions = [
  [-1, 0], // up
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
];

const getStartPosition = (grid) => {
  let start;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 'S')
        start = [i, j]
    }
  }
  return start;
}

const solution = async () => {
  const grid = (await fs.readFile('./day-16/data.txt', { encoding: 'utf8' }))
    .trim()
    .split('\n')
    .map(el => el.trim().split(''))

  const start = getStartPosition(grid);

  let queue = [[...start, 0, 0, [start]]];
  const paths = {};
  const seen = grid.map((row) =>
    row.map(() => directions.map(() => Infinity))
  );
  let minScore = Infinity;
  while (queue.length !== 0) {
    const nextQueue = [];
    for (const [i, j, dirIdx, score, path] of queue) {
      if (score > minScore) {
        continue;
      }

      if (grid[i][j] === 'E') {
        minScore = Math.min(minScore, score);
        if (score === minScore) {
          (paths[minScore] ??= []).push(path);
        }
        continue;
      }

      if (seen[i][j][dirIdx] < score) {
        continue;
      }
      seen[i][j][dirIdx] = score;

      for (let dirIdx2 = 0; dirIdx2 < 4; dirIdx2++) {
        if (dirIdx2 === (dirIdx + 2) % 4) {
          continue;
        }

        const [di, dj] = directions[dirIdx2];
        const [i2, j2] = [i + di, j + dj];
        if (grid[i2][j2] === '.' || grid[i2][j2] === 'E') {
          nextQueue.push([
            i2,
            j2,
            dirIdx2,
            score + 1 + (dirIdx2 !== dirIdx) * 1000,
            [...path, [i2, j2]],
          ]);
        }
      }
    }
    queue = nextQueue;
  }
  console.log(minScore);
}

console.log(await solution())