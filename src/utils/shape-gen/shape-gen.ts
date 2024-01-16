import {generateCircles} from './circle-gen.ts';
import {generateBlobs} from './blob-gen.ts';
import {generateSquiggle} from './squiggle-gen.ts';

export type GenerateShapeOptions = {
  size: number;
  density: number;
  avoidOverlap?: boolean;
};

export const generateShapes = (feature: string, {density, size}: GenerateShapeOptions): string[] => {
  switch (feature) {
    case 'circles':
      return generateCircles({density, size});
    case 'blobs':
      return generateBlobs({density, size});
    case 'squiggle':
      return [generateSquiggle({density, size})];
    default:
      return [];
  }
};
