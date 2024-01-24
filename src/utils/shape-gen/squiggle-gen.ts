import {svgHeight, svgWidth} from '../svg-size.ts';
import {randomIntBetween} from '../random.ts';

const OUTSIDE_MARGIN = 500;

export const generateSquiggle = ({density}) => {

  let path =
    `M ` +
    `${pointString()}` +
    `C ` +
    `${pointString()}` +

    `${pointString()}` +

    `${pointString()}`;

  const count = svgWidth * svgHeight * density / 1000;
  console.log(svgWidth, svgHeight, density, count);

  for (let i = 0; i < count; i++) {
    path += ` S ` + `${pointString()}` + `${pointString()}`;
  }
  return `<path d="${path}"></path>`;
};

function getPoint() {
  return [randomIntBetween(-OUTSIDE_MARGIN, svgWidth + OUTSIDE_MARGIN), randomIntBetween(-OUTSIDE_MARGIN, svgHeight + OUTSIDE_MARGIN)];
}

function pointString() {
  let point = getPoint();
  return `${point[0]} ${point[1]} `;
}

function getDistance(pointA: number[], pointB: number[]) {
  return Math.sqrt((pointA[0] - pointB[0]) ** 2 + (pointA[1] - pointB[1]) ** 2);
}
