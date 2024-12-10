import fs from 'fs/promises';

const getChecksum = async () => {
  const data = (await fs.readFile('./day-9/data.txt', { encoding: 'utf8' }));

  let blocks = [];
  let index = 0;

  for (let i = 0; i < data.length; i++) {
    const count = parseInt(data[i], 10);
    if (i % 2 === 0) {
      for (let j = 0; j < count; j++) {
        blocks.push(index);
      }
      index += 1;
    } else {
      for (let j = 0; j < count; j++) {
        blocks.push('.');
      }
    }
  }

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