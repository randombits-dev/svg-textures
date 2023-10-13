import {randomNumberBetween} from "../random.ts";
import {svgHeight, svgWidth} from "../svg-size.ts";

type GenerateLine = {
  size: number
}

type GenerateLines = GenerateLine & {
  density: number
};

export const generateLines = ({density, size}: GenerateLines) => {
  const paths = [];
  const count = ((svgWidth * svgHeight) / (size)) * density;
  for (let i = 0; i < count; i++) {
    paths.push(generateLine({size}));
  }
  return paths;
};

export const generateLine = ({size}: GenerateLine) => {
  const randomWidth = randomNumberBetween(size / 4, size * 2);
  const randomHeight = 2;
  const randomAngle = randomNumberBetween(0, 180);

  const randomX = randomNumberBetween(-randomWidth, svgWidth);
  const randomY = randomNumberBetween(-randomHeight, svgHeight);

  return `<rect x="${randomX}" y="${randomY}" width="${randomWidth}" height="${randomHeight}" transform="rotate(${randomAngle}, ${randomX}, ${randomY})"/>`;
};
