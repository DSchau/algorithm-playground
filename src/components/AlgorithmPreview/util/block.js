// @flow
import { memoize } from '../../../util';

const BLOCK_SIZE = (width: number) => Math.ceil(Math.log10(width)) * 5;
const SATURATION = 100;
const LIGHTNESS = 50;

const getColorFromHue = (hue: number) =>
  ['hsl(', [hue, `${SATURATION}%`, `${LIGHTNESS}%`].join(', '), ')'].join('');

const getHueFromHsl = hsl =>
  parseInt((hsl.match(/hsl\((\d+)/) || []).pop(), 10);

const randomColor = () => {
  const randomNum = num => Math.floor(Math.random() * num);
  const hue = randomNum(360);
  return getColorFromHue(hue);
};

const rowColors = memoize((numColors: number, max: number = 360) => {
  const rangeFactor = Math.ceil(max / numColors);
  let colors = [];
  for (let i = 0; i < numColors; i++) {
    const hue = i + 1 === numColors ? max : rangeFactor * i;
    colors.push(getColorFromHue(hue));
  }
  return colors;
});

export const createBlock = (context: CanvasRenderingContext2D) => (
  color: string
) => (...args: any[]) => {
  const [x, y, height, width = height] = args;
  context.fillStyle = color;
  context.clearRect(x, y, width, height);
  context.fillRect(x, y, width, height);
  return getHueFromHsl(color);
};

export const createRow = (context: CanvasRenderingContext2D) => ({
  width,
  blockSize,
  y = 0
}: any) => {
  let blocks = [];
  const numBlocks = Math.ceil(width / blockSize);
  const colors = rowColors(numBlocks).slice(0);
  for (let i = 0; i < numBlocks; i++) {
    const color = colors
      .splice(Math.floor(Math.random() * colors.length), 1)
      .pop();
    blocks.push(createBlock(context)(color)(i * blockSize, y, blockSize));
  }
  return blocks;
};

export const createGrid = (context: CanvasRenderingContext2D) => ({
  height,
  width,
  blockSize = BLOCK_SIZE(width)
}: any) => {
  let grid = [];
  let row = 0;
  while (row * blockSize <= height) {
    grid.push(createRow(context)({ width, blockSize, y: row * blockSize }));
    row += 1;
  }
  return grid;
};

export const updateRow = (context: CanvasRenderingContext2D) => (
  row: any[],
  rowIndex: number
) => {
  return row.map((block, i) => {
    const { color, x, y, height, width, blockSize = BLOCK_SIZE(width) } = block;
    return createBlock(context)(color)(
      i * blockSize,
      rowIndex * blockSize,
      height,
      width
    );
  });
};

export const updateRowAtPosition = (context: CanvasRenderingContext2D) => ({
  cancelled,
  rowIndex,
  blockIndex,
  hue,
  width,
  blockSize = BLOCK_SIZE(width)
}: any) => {
  if (cancelled) {
    throw new Error('Sort was cancelled before being finished');
  }
  return createBlock(context)(getColorFromHue(hue))(
    blockIndex * blockSize,
    rowIndex * blockSize,
    blockSize,
    blockSize
  );
};
