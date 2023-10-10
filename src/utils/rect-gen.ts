import {randomNumberBetween} from "./random.ts";
import {svgHeight, svgWidth} from "./svg-size.ts";

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
  const randomWidth = randomNumberBetween(size / 2, size * 2);
  const randomHeight = randomNumberBetween(size / 2, size * 2);
  const randomAngle = randomNumberBetween(0, 45);
  const randomX = randomNumberBetween(-randomWidth, svgWidth);
  const randomY = randomNumberBetween(-randomHeight, svgHeight);

  return `<rect x="${randomX}" y="${randomY}" width="${randomWidth}" height="${randomHeight}" transform="rotate(${randomAngle}, ${randomX}, ${randomY})"/>`;
};
