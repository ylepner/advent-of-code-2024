import fs from 'fs/promises';

const getChecksum = async () => {
  const data = (await fs.readFile('./day-9/data.txt', { encoding: 'utf8' }));

  let blocks = [];
  let index = 0;

  data.split('').forEach((char, i) => {
    const count = parseInt(char, 10);
    if (i % 2 === 0) {
      blocks = blocks.concat(Array(count).fill(index));
      index += 1;
    } else {
      blocks = blocks.concat(Array(count).fill('.'));
    }
  });

  let lastIndex = blocks.length - 1;
  blocks = blocks.map((block, i) => {
    if (block === '.') {
      while (blocks[lastIndex] === '.' && lastIndex > i) {
        lastIndex--;
      }
      if (lastIndex > i) {
        const temp = blocks[lastIndex];
        blocks[lastIndex] = '.';
        lastIndex--;
        return temp;
      }
    }
    return block;
  });

  const sum = blocks.reduce((acc, block, i) => {
    if (block !== '.') {
      return acc + block * i;
    }
    return acc;
  })

  return sum;
}

console.log(await getChecksum());