import {generateCircles} from './circle-gen.ts';
import {generateBlobs} from './blob-gen.ts';
import {generateSquiggle} from './squiggle-gen.ts';
import {generateLinesAcross, generateLinesAcrossWithCurves} from './line-across-gen.ts';
import {generateLineCurves} from './cool-line-gen.ts';
import {generateSolar} from './dashed-circles-gen.ts';

export const generateShapes = ({feature, ...rest}): string[] => {
  switch (feature) {
    case 'chaos':
      return generateCircles(rest);
    case 'circles':
      return generateCircles(rest);
    case 'blobs':
      return generateBlobs(rest);
    case 'lines':
      return [generateSquiggle(rest)];
    case 'straight':
      return [generateLinesAcross(rest)];
    case 'curves':
      return [generateLinesAcrossWithCurves(rest)];
    case 'waves':
      return [generateLineCurves(rest)];
    case 'solar':
      return generateSolar(rest);
    default:
      return [];
  }
};
