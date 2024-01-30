import type {IFeatureConfig} from './IFeatureConfig.ts';

export const solarConfig: IFeatureConfig = {
  name: 'Solar',
  controls: {
    turbulance: [0, 0.05, 0.1],
    size: [10, 100],
    sizeVariation: [0, 1],
    density: [0.1, 0.9],
    shadow: [0, 15, 0.1],
    blur: [0, 20, 0.1],
    stroke: [1, 25],
    gap: [0, 50],
    separation: [0, 2],
    backgroundGradient: true,
    strokeGradient: true,
    fillGradient: false,
    threeD: [0, 15, 0.1],
  },
  presetPath: 'solar',
  presets: [
    {
      'id': 'dashed',
      'feature': 'solar',
      'turbulence': 0,
      'turbulenceScale': 1,
      'blur': 0,
      'threeD': 0,
      'density': 0.5,
      'size': 60,
      'sizeVariation': 1,
      'separation': 1,
      'strokeWidth': 10,
      'fillGradient': {'rotation': 0, 'opacity': 0, 'colors': ['#e02157', '#1e53b3']},
      'backgroundGradient': {'rotation': 0, 'opacity': 1, 'colors': ['#111111']},
      'strokeGradient': {'rotation': 0, 'opacity': 1, 'colors': ['#ffa2a2', '#13ccf0']}
    },
  ]
};
