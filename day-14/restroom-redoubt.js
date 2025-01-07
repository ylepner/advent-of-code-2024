import fs from 'fs/promises';

const COLUMNS = 101;
const ROWS = 103;

const parseInput = (data) => {
  const lines = data.trim().split('\n');

  const positions = [];
  const velocities = [];

  lines.forEach(line => {
    const [p, v] = line.split(' ');
    const [px, py] = p.slice(2).split(',').map(Number);
    const [vx, vy] = v.slice(2).split(',').map(Number);
    positions.push([px, py]);
    velocities.push([vx, vy]);
  });
  return { positions, velocities }
};

const getSafetyFactor = async () => {
  const data = await fs.readFile('./day-14/data.txt', { encoding: 'utf8' })
  const { positions, velocities } = parseInput(data);

  for (let i = 1; i <= 100; i++) {
    for (let i = 0; i < positions.length; i++) {
      positions[i][0] = (positions[i][0] + velocities[i][0] + COLUMNS) % COLUMNS;
      positions[i][1] = (positions[i][1] + velocities[i][1] + ROWS) % ROWS;
    }
  }

  let quad1 = 0;
  let quad2 = 0;
  let quad3 = 0;
  let quad4 = 0;

  let middleCol = Math.floor(COLUMNS / 2);
  let middleRow = Math.floor(ROWS / 2);
  positions.forEach(([x, y]) => {
    if (x !== middleCol || y !== middleRow) {
      if (x < middleCol && y < middleRow) {
        quad1 += 1;
      } else if (x > middleCol && y < middleRow) {
        quad2 += 1;
      } else if (x < middleCol && y > middleRow) {
        quad3 += 1;
      } else if (x > middleCol && y > middleRow) {
        quad4 += 1;
      }
    }
  })
  return quad1 * quad2 * quad3 * quad4;
}

console.log(await getSafetyFactor());
