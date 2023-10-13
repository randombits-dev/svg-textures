import {generateCircles} from "./circle-gen.ts";
import {generateBlobs} from "./blob-gen.ts";
import {generateSquiggle} from "./squiggle-gen.ts";

export type GenerateShapeOptions = {
  size: number;
  density: number
};

export const generateShapes = (feature: string, {density, size}: GenerateShapeOptions) => {
  switch (feature) {
    case 'circles':
      return generateCircles({density, size});
    case 'blobs':
      return generateBlobs({density, size});
    case 'squiggle':
      return generateSquiggle({density, size});
  }
};
