import type {IFeatureConfig} from './IFeatureConfig.ts';

export const wavesConfig: IFeatureConfig = {
  name: 'Waves',
  controls: {
    turbulance: [0, 0.05, 0.1],
    density: [0.01, 1],
    blur: [0, 20, 0.1],
    stroke: [1, 10, 0.1],
    gap: [0, 50, 0.1],
    backgroundGradient: true,
    strokeGradient: true,
    fillGradient: false,
    threeD: false
  },
  presetPath: 'waves',
  presets: [
    {
      'id': 'one',
      'feature': 'waves',
      'density': 0.45,
      'size': 60,
      'blur': 0,
      'threeD': 0,
      'turbulence': 0,
      'gap': 0,
      'backgroundGradient': {'rotation': 0, 'opacity': 1, 'colors': ['#000000']},
      'strokeGradient': {'rotation': 0, 'opacity': 0.9, 'colors': ['#b82020', '#0c03e0']},
      'fillGradient': {'rotation': 0, 'opacity': 0, 'colors': ['#111111']},
      'strokeWidth': 0.5,
      'sizeVariation': 0.5,
      'separation': 1
    },
    {
      'id': 'two',
      'feature': 'waves',
      'density': 0.45,
      'size': 60,
      'blur': 0,
      'threeD': 0,
      'turbulence': 0.025,
      'gap': 0,
      'backgroundGradient': {'rotation': 0, 'opacity': 1, 'colors': ['#000000']},
      'strokeGradient': {'rotation': 225, 'opacity': 0.9, 'colors': ['#0069f0', '#ffffff']},
      'fillGradient': {'rotation': 0, 'opacity': 0, 'colors': ['#111111']},
      'strokeWidth': '1',
      'sizeVariation': 0.5,
      'separation': 1
    },
  ]
};
