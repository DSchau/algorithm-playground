const BLOCK_SIZE = 5;

const randomColor = () => {
  const randomNum = num => Math.floor(Math.random() * num);
  const hue = randomNum(360);
  return `hsl(${hue}, 100%, 50%)`;
}

export const createBlock = context => color => (...args) => {
  const [x, y, height, width = height] = args;
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
  return {
    x,
    y,
    height,
    width,
    color
  };
}

export const createRow = context => ({ width, blockSize, y = 0 }) => {
  let blocks = [];
  const numBlocks = Math.ceil(width / blockSize);
  for (let i = 0; i < numBlocks; i++) {
    blocks.push(createBlock(context)(randomColor())(i * blockSize, y, blockSize));
  }
  return blocks;
}

export const createGrid = context => ({ height, width, blockSize = BLOCK_SIZE }) => {
  let grid = [];
  let row = 0;
  while ((row * blockSize) <= height) {
    grid.push(createRow(context)({ width, blockSize, y: row * blockSize }));
    row += 1;
  }
  return grid;
};

export const updateRow = context => (row, rowIndex) => {
  return row.map((block, i) => {
    const { color, x, y, height, width } = block;
    return createBlock(context)(color)(i * BLOCK_SIZE, rowIndex * BLOCK_SIZE, height, width);
  });
};
