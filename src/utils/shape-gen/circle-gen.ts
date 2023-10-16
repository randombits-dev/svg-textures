import {randomNumberBetween} from "../random.ts";
import {svgHeight, svgWidth} from "../svg-size.ts";
import type {GenerateShapeOptions} from "./shape-gen.ts";

export const generateCircles = ({density, size}: GenerateShapeOptions) => {
  const paths = [];
  // const count = ((svgWidth * svgHeight) / (size * size)) * density;
  const numRows = svgWidth / size * density;
  const numCols = svgHeight / size * density;
  const rowWidth = svgWidth / numRows;
  const colHeight = svgHeight / numCols;
  // console.log(numRows, numCols, rowWidth, colHeight);
  for (let x = 0; x < numRows; x++) {
    for (let y = 0; y < numCols; y++) {
      const randomSize = randomNumberBetween(size, size);
      const xMin = rowWidth * x - rowWidth / 2;
      const xMax = xMin + rowWidth;
      const yMin = colHeight * y - colHeight / 2;
      const yMax = yMin + colHeight;
      // console.log(xMin, xMax, yMin, yMax);
      const randomX = randomNumberBetween(xMin, xMax);
      const randomY = randomNumberBetween(yMin, yMax);
      // console.log(randomX, randomY);
      paths.push(`<circle cx="${randomX}" cy="${randomY}" r="${randomSize}"/>`);
    }
  }
  return paths;
};
