import {svgHeight, svgWidth} from '@/utils/svg-size.ts';
import {randomIntBetween} from '@/utils/random.ts';

export const generateLinesAcross = ({density}) => {

  let path = '';
  const count = svgWidth * svgHeight * density / 1000;

  for (let i = 0; i < count; i++) {
    path += getLine(false);
  }
  return `<path d="${path}"></path>`;
};

export const generateLinesAcrossWithCurves = ({density}) => {

  let path = '';
  const count = svgWidth * svgHeight * density / 1000;

  for (let i = 0; i < count; i++) {
    path += getLine(true);
  }
  return `<path d="${path}"></path>`;
};

function getLine(curves) {
  const positionA = randomIntBetween(0, 3);
  while (true) {
    const positionB = randomIntBetween(0, 3);
    if (positionA !== positionB) {
      if (curves) {
        return ` M ${pointString(getPointByIndex(positionA))} Q ${pointString(getControlPoint())} ${pointString(
          getPointByIndex(positionB))}`;
      }
      return ` M ${pointString(getPointByIndex(positionA))} L ${pointString(getPointByIndex(positionB))}`;
    }
  }
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
