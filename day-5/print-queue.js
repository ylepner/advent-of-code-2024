import fs from 'fs/promises';

const getCount = async () => {
  const data = (await fs.readFile('./day-5/data.txt', { encoding: 'utf8' })).trim().split('\n').map(el => el.trim());

  const part1 = data.slice(0, data.indexOf(''));
  const part2 = data.slice(data.indexOf('') + 1);

  const orderingRules = part1.map(line => line.split('|').map(Number));
  const updatePages = part2.map(line => line.split(',').map(Number));

  let result = 0;

  updatePages.forEach((line => {
    let allPairsValid = true;
    for (let i = 0; i < line.length; i++) {
      for (let j = i + 1; j < line.length; j++) {
        const el = [line[i], line[j]];
        if (!orderingRules.some(item => item[0] === el[0] && item[1] === el[1])) {
          allPairsValid = false;
          break
        }
      }
      if (!allPairsValid) break;
    }
    if (allPairsValid) {
      result += line[Math.floor(line.length / 2)];
    }
  }))
  return result;
};

console.log(await getCount());
