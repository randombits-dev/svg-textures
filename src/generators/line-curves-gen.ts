import {svgHeight, svgWidth} from '@/utils/svg-size.ts';
import {randomIntBetween} from '@/utils/random.ts';

export const generateLineCurves = ({density}) => {

  let path = '';
  const count = svgWidth * svgHeight * density / 10000;

  const topPoint = pointString(getTopPoint());
  const bottomPoint = pointString(getBottomPoint());

  for (let i = 0; i < count; i++) {
    path += getLine(topPoint, bottomPoint);
  }
  return `<path d="${path}"></path>`;
};

function getLine(topPoint: string, bottomPoint: string) {
  const pointA = pointString(getLeftPoint());
  // const topPoint = pointString(getTopPoint());
  // const bottomPoint = pointString(getBottomPoint());
  const center = pointString([svgWidth / 2, svgHeight / 2]);
  const pointB = pointString(getRightPoint());

  return ` M ${pointA} C ${topPoint} ${bottomPoint} ${pointB}`;
}

function getPointByIndex(index: number): number[] {
  switch (index % 4) {
    case 0:
      return getLeftPoint();
    case 1:
      return getRightPoint();
    case 2:
      return getTopPoint();
    case 3:
      return getBottomPoint();
    default:
      return [0, 0];
  }
}

function getLeftPoint() {
  return [0, randomIntBetween(0, svgHeight)];
}

function getRightPoint() {
  return [svgWidth, randomIntBetween(0, svgHeight)];
}

function getTopPoint() {
  return [randomIntBetween(0, svgWidth), 0];
}

function getBottomPoint() {
  return [randomIntBetween(0, svgWidth), svgHeight];
}

function getControlPoint() {
  return [randomIntBetween(0, svgWidth), randomIntBetween(0, svgHeight)];
}

function pointString(point: number[]) {
  return `${point[0]} ${point[1]} `;
}
