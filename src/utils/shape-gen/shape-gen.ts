import {generateCircles} from './circle-gen.ts';
import {generateBlobs} from './blob-gen.ts';
import {generateCirclesDashed} from '@/features/patterns/circles-gen.ts';

export type GenerateShapeOptions = {
  size: number;
  density: number;
  separation?: number;
  avoidOverlap?: boolean;
  sizeVariation?: number;
};

export const generateShapes = (feature: string, {density, size, separation, sizeVariation}: GenerateShapeOptions): string[] => {
  switch (feature) {
    case 'circles':
      return generateCircles({density, size, separation, sizeVariation});
    case 'blobs':
      return generateBlobs({density, size});
    case 'dashed':
      return generateCirclesDashed({density});
    default:
      return [];
  }
};
