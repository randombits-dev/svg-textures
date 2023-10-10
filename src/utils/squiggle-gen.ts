import {svgHeight, svgWidth} from "./svg-size.ts";
import {randomNumberBetween} from "./random.ts";

type GenerateSquiggle = {
  size: number
}

type GenerateSquiggles = GenerateSquiggle & {
  density: number
};

export const generateSquiggle = ({size, density}: GenerateSquiggles) => {
  let path =
      `M ` +
      `${pointString()}` +
      `C ` +
      `${pointString()}` +

      `${pointString()}` +

      `${pointString()}`;

  const count = svgWidth * svgHeight * density / 1000;

  console.log(count);

  for (let i = 0; i < count; i++) {
    path += ` S ` + `${pointString()}` + `${pointString()}`;
  }
  return `<path d="${path}"></path>`;
};

function getPoint() {
  return [randomNumberBetween(-200, svgWidth + 200), randomNumberBetween(-200, svgHeight + 200)];
}

function pointString() {
  let point = getPoint();
  return `${point[0]} ${point[1]} `;
}

function getDistance(pointA: number[], pointB: number[]) {
  return Math.sqrt((pointA[0] - pointB[0]) ** 2 + (pointA[1] - pointB[1]) ** 2);
}
