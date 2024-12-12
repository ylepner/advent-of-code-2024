import fs from 'fs/promises';

const getStonesSum = async () => {
  const stones = (await fs.readFile('./day-11/data.txt', { encoding: 'utf8' })).trim().split(' ');
  let stonesCopy = [...stones];

  const transformStones = (stones) => {
    return stones.map(arr => {
      if (arr === '0') {
        return ['1'];
      } else if (arr.length % 2 === 0) {
        const left = arr.substring(0, arr.length / 2);
        const right = arr.substring(arr.length / 2).replace(/^0+/, '');
        return [left, right === '' ? '0' : right]
      } else {
        return [(Number(arr) * 2024).toString()];
      }
    }).flat();
  }

  for (let i = 0; i < 25; i++) {
    stonesCopy = transformStones(stonesCopy);
  }

  return stonesCopy.length;
}

console.log(await getStonesSum());
