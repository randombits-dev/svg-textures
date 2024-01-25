import {randomIntBetween} from '@/utils/random.ts';
import {svgHeight, svgWidth} from '@/utils/svg-size.ts';

type GenerateRect = {
  size: number
}

type GenerateCircles = GenerateRect & {
  density: number
};

export const generateRects = ({density, size}: GenerateCircles) => {
  const paths = [];
  const count = ((svgWidth * svgHeight) / (size * size)) * density;
  for (let i = 0; i < count; i++) {
    paths.push(generateRect({size}));
  }
  return paths;
};

export const generateRect = ({size}: GenerateRect) => {
  const randomWidth = randomIntBetween(size / 2, size * 2);
  const randomHeight = randomIntBetween(size / 2, size * 2);
  const randomAngle = randomIntBetween(0, 45);
  const randomX = randomIntBetween(-randomWidth, svgWidth);
  const randomY = randomIntBetween(-randomHeight, svgHeight);

  return `<rect x="${randomX}" y="${randomY}" width="${randomWidth}" height="${randomHeight}" transform="rotate(${randomAngle}, ${randomX}, ${randomY})"/>`;
};
