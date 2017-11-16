const randomColor = () => {
  const randomNum = num => Math.floor(Math.random() * num);
  const hue = randomNum(360);
  return `hsl(${hue}, 100%, 50%)`;
}

export const createBlock = context => color => (...args) => {
  const [x, y, height, width = height] = args;
  context.fillStyle = color;
  context.fillRect(x, y, height, width);
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

export const createGrid = context => ({ height, width, blockSize = 2 }) => {
  let grid = [];
  let row = 0;
  while ((row * blockSize) <= height) {
    grid.push(createRow(context)({ width, blockSize, y: row * blockSize }));
    row += 1;
  }
  return grid;
};
