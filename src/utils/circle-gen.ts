import {randomNumberBetween} from "./random.ts";
import {svgHeight, svgWidth} from "./svg-size.ts";

type GenerateCircle = {
  size: number,
}

type GenerateCircles = GenerateCircle & {
  density: number
};

export const generateCircles = ({density, size}: GenerateCircles) => {
  const paths = [];
  const count = ((svgWidth * svgHeight) / (size * size)) * density;
  for (let i = 0; i < count; i++) {
    paths.push(generateCircle({size}));
  }
  return paths;
};

export const generateCircle = ({size}: GenerateCircle) => {
  const randomSize = randomNumberBetween(size / 2, size);
  const randomX = randomNumberBetween(-randomSize, svgWidth);
  const randomY = randomNumberBetween(-randomSize, svgHeight);

  return `<circle cx="${randomX}" cy="${randomY}" r="${randomSize}"/>`;
};
