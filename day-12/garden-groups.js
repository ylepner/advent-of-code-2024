import fs from 'fs/promises';


const grid = (await fs.readFile('./day-12/data.txt', { encoding: 'utf8' }))
  .trim()
  .split('\n')
  .map(el => el.trim().split(''))

const directions = [
  [-1, 0], // up
  [1, 0],  // down
  [0, -1], // left
  [0, 1]   // right
];

const calculatePerimeterAndArea = (x, y, grid, visited, letter) => {
  let perimeter = 0;
  let area = 0;
  const stack = [[x, y]];
  visited[x][y] = true;

  while (stack.length > 0) {
    const [cx, cy] = stack.pop();
    area++;

    for (const [dx, dy] of directions) {
      const nx = cx + dx;
      const ny = cy + dy;

      if (nx < 0 || ny < 0 || nx >= grid.length || ny >= grid[0].length || grid[nx][ny] !== letter) {
        perimeter++;
      } else if (!visited[nx][ny]) {
        visited[nx][ny] = true;
        stack.push([nx, ny]);
      }
    }
  }

  return { perimeter, area };
};

const getPerimetersAndAreas = (grid) => {
  const visited = Array.from({ length: grid.length }, () => Array(grid[0].length).fill(false));
  const perimetersAndAreas = [];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (!visited[i][j]) {
        const letter = grid[i][j];
        const { perimeter, area } = calculatePerimeterAndArea(i, j, grid, visited, letter);
        perimetersAndAreas.push({ letter, perimeter, area });
      }
    }
  }

  return perimetersAndAreas;
};

const getTotalPrice = async () => {

  const perimetersAndAreas = getPerimetersAndAreas(grid);

  let total = perimetersAndAreas.map(({ _, perimeter, area }) => {
    return perimeter * area
  }).reduce((a, b) => a + b)

  return total
};



console.log(await getTotalPrice());
