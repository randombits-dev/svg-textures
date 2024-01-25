import type {IFeatureConfig} from './IFeatureConfig.ts';

export const linesConfig: IFeatureConfig = {
  name: 'Lines',
  controls: {
    turbulance: [0, 0.05],
    density: [0.01, 1],
    shadow: [0, 15],
    blur: [0, 20],
    stroke: [1, 10],
    gap: [0, 20],
    backgroundGradient: true,
    strokeGradient: true,
    threeD: true
  },
  presetPath: 'lines',
  presets: [
    {
      'id': 'bluered',
      'feature': 'line',
      'turbulence': 0,
      'turbulenceScale': 1,
      'blur': 0,
      'threeD': 0,
      'density': 0.5,
      'size': 60,
      'strokeWidth': 0.5,
      'backgroundGradient': {'rotation': 0, 'opacity': 1, 'colors': ['#ffffff']},
      'strokeGradient': {'rotation': 0, 'opacity': 0.5, 'colors': ['#b82020', '#0c03e0']}
    },
    {
      'id': 'vibrant',
      'feature': 'line',
      'turbulence': 0,
      'turbulenceScale': 0,
      'blur': 0,
      'threeD': 0,
      'density': 0.62,
      'size': 60,
      'strokeWidth': 1,
      'backgroundGradient': {'rotation': 0, 'opacity': 1, 'colors': ['#000000']},
      'strokeGradient': {'rotation': 90, 'opacity': 1, 'colors': ['#00ffeb', '#f21b9c']}
    },
    {
      'id': 'grey',
      'feature': 'line',
      'turbulence': 0,
      'turbulenceScale': 1,
      'blur': 0,
      'threeD': 0,
      'density': 1,
      'size': 60,
      'strokeWidth': 1,
      'backgroundGradient': {'rotation': 0, 'opacity': 1, 'colors': ['#ffffff']},
      'strokeGradient': {'rotation': 90, 'opacity': 0.05, 'colors': ['#333333']}
    },
    {
      'id': 'purpteal',
      'feature': 'line',
      'turbulence': 0,
      'turbulenceScale': 1,
      'blur': 0,
      'threeD': 0,
      'density': 0.06,
      'size': 60,
      'strokeWidth': 2,
      'backgroundGradient': {'rotation': 0, 'opacity': 1, 'colors': ['#ffffff']},
      'strokeGradient': {'rotation': 45, 'opacity': 0.7, 'colors': ['#00cccc', '#bf03fa']}
    }
  ]
};
