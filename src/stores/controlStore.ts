import {get, writable} from 'svelte/store';
import {createGradientStore} from '@/components/common/color-picker/gradientStore.ts';
import {randomDecimalBetween} from '@/utils/random.ts';
import {generateShapes} from '../generators/shape-gen.ts';

const feature = writable<string>('circles');
const texture = writable<string[]>([]);
const turbulence = writable(0);
const blur = writable(0);
const threeD = writable(0);
const density = writable(0.2);
const strokeWidth = writable(1);
const gap = writable(0);
const size = writable(30);
const fontSize = writable(200);
const sizeVariation = writable(1);
const separation = writable(1);
const backgroundGradientStore = createGradientStore({rotation: 0, opacity: 1, colors: ['#eeeeee']});
const strokeGradientStore = createGradientStore({rotation: 0, opacity: 1, colors: ['#111111']});

const regenerate = () => {
  texture.set([generateShapes(getValues())]);
};

const serialize = () => {
  return JSON.stringify(getValues());
};

const getValues = () => {
  return {
    feature: get(feature),
    density: get(density),
    size: get(size),
    blur: get(blur),
    threeD: get(threeD),
    turbulence: get(turbulence),
    gap: get(gap),
    fontSize: get(fontSize),
    backgroundGradient: get(backgroundGradientStore.gradient),
    strokeGradient: get(strokeGradientStore.gradient),
    strokeWidth: get(strokeWidth),
    sizeVariation: get(sizeVariation),
    separation: get(separation),
  };
};

const deserialize = (obj: any) => {
  feature.set(obj.feature);
  turbulence.set(obj.turbulence);
  blur.set(obj.blur);
  threeD.set(obj.threeD || 0);
  density.set(obj.density);
  strokeWidth.set(obj.strokeWidth || 0);
  gap.set(obj.gap || 0);
  size.set(obj.size);
  fontSize.set(obj.fontSize);
  backgroundGradientStore.set(obj.backgroundGradient);
  strokeGradientStore.set(obj.strokeGradient || {rotation: 0, opacity: 1, colors: ['#111111']});
  sizeVariation.set(randomDecimalBetween(0, 1));
  separation.set(randomDecimalBetween(0, 2));
};

export const controlStore = {
  feature,
  texture,
  turbulence,
  blur,
  threeD,
  density,
  strokeWidth,
  gap,
  size,
  fontSize,
  sizeVariation,
  separation,

  backgroundGradientStore,
  strokeGradientStore,

  regenerate,
  // regenerateRandom,
  serialize,
  deserialize
};
