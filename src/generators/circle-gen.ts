import {randomIntBetween} from '@/utils/random.ts';
import {svgHeight, svgWidth} from '@/utils/svg-size.ts';

type Options = {
  size: number;
  density: number;
  separation?: number;
  avoidOverlap?: boolean;
  sizeVariation?: number;
  randomColors?: boolean;
};

export const generateCircles = ({density, size, separation, sizeVariation, randomColors}: Options) => {
  separation = separation ?? 1;
  sizeVariation = sizeVariation ?? 0.5;
  const paths = [];
  // const count = ((svgWidth * svgHeight) / (size * size)) * density;
  const numRows = (svgWidth / (size / 2)) * (density * 0.3);
  const numCols = (svgHeight / (size / 2)) * (density * 0.3);
  const rowWidth = svgWidth / numRows;
  const colHeight = svgHeight / numCols;
  // console.log(numRows, numCols, rowWidth, colHeight);

  const minSize = size / ((0.5 + sizeVariation) * 2);
  const maxSize = size * ((2 / 3 + sizeVariation) * 1.5);
  const rowWidthWithSeparation = rowWidth * separation;
  const colHeightWithSeparation = colHeight * separation;
  for (let x = 0; x < numRows + 1; x++) {
    for (let y = 0; y < numCols + 1; y++) {
      const randomSize = randomIntBetween(minSize, maxSize);
      const xMin = rowWidth * x - rowWidthWithSeparation / 2;
      const xMax = xMin + rowWidthWithSeparation;
      const yMin = colHeight * y - colHeightWithSeparation / 2;
      const yMax = yMin + colHeightWithSeparation;
      // console.log(xMin, xMax, yMin, yMax);
      const randomX = randomIntBetween(xMin, xMax);
      const randomY = randomIntBetween(yMin, yMax);
      // console.log(randomX, randomY);
      if (!randomColors) {
        paths.push(`<circle cx="${randomX}" cy="${randomY}" r="${randomSize}" />`);
        // paths.push(`<circle cx="${randomX}" cy="${randomY}" r="${randomSize}" fill="${randomGoodColor()}"/>`);
      } else {
        paths.push(`<circle cx="${randomX}" cy="${randomY}" r="${randomSize}"/>`);

      }
    }
  }
  return paths;
};
