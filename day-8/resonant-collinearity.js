import fs from 'fs/promises';

const antennasLocations = {};
let antinodes = new Set();

const isValid = (x, y, field) => x >= 0 && y >= 0 && x < field.length && y < field[0].length;

const countLocations = async () => {

  const field = (await fs.readFile('./day-8/data.txt', { encoding: 'utf8' }))
    .trim().split('\n').map(el => el.trim());

  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[0].length; j++) {
      if (field[i][j] !== '.') {
        if (!antennasLocations[field[i][j]]) {
          antennasLocations[field[i][j]] = [];
        }
        antennasLocations[field[i][j]].push([i, j]);
      }
    }
  }

  Object.entries(antennasLocations).forEach(([antenna, coordinates]) => {
    for (let i = 0; i < coordinates.length - 1; i++) {
      for (let j = i + 1; j < coordinates.length; j++) {
        let diffX = coordinates[j][0] - coordinates[i][0];
        let diffY = coordinates[j][1] - coordinates[i][1];
        let antinode1 = [coordinates[i][0] - diffX, coordinates[i][1] - diffY];
        let antinode2 = [coordinates[j][0] + diffX, coordinates[j][1] + diffY];
        if (isValid(antinode1[0], antinode1[1], field)) {
          antinodes.add(antinode1.toString());
        }
        if (isValid(antinode2[0], antinode2[1], field)) {
          antinodes.add(antinode2.toString());
        }
      }
    }
  })
  return antinodes.size;
}

console.log(await countLocations())