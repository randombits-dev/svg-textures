import {get, writable} from 'svelte/store';
import {createGradientStore} from '@/components/common/color-picker/gradientStore.ts';
import {generateShapes} from '../generators/shape-gen.ts';

const feature = writable<string>('circles');
const texture = writable<string[]>([]);
const turbulence = writable(0);
const scale = writable(50);
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
const fillGradientStore = createGradientStore({rotation: 0, opacity: 1, colors: ['#111111']});

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
    scale: get(scale),
    gap: get(gap),
    fontSize: get(fontSize),
    backgroundGradient: get(backgroundGradientStore.gradient),
    strokeGradient: get(strokeGradientStore.gradient),
    fillGradient: get(fillGradientStore.gradient),
    strokeWidth: get(strokeWidth),
    sizeVariation: get(sizeVariation),
    separation: get(separation),
  };
};

const deserialize = (obj: any) => {
  feature.set(obj.feature);
  turbulence.set(obj.turbulence);
  scale.set(obj.scale);
  blur.set(obj.blur);
  threeD.set(obj.threeD || 0);
  density.set(obj.density);
  strokeWidth.set(obj.strokeWidth || 0);
  gap.set(obj.gap || 0);
  size.set(obj.size);
  fontSize.set(obj.fontSize);
  backgroundGradientStore.set(obj.backgroundGradient);
  strokeGradientStore.set(obj.strokeGradient || {rotation: 0, opacity: 0, colors: ['#111111']});
  fillGradientStore.set(obj.fillGradient || {rotation: 0, opacity: 0, colors: ['#111111']});
  sizeVariation.set(obj.sizeVariation || 0.5);
  separation.set(obj.separation || 1);
};

export const controlStore = {
  feature,
  texture,
  turbulence,
  scale,
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
  fillGradientStore,

  regenerate,
  serialize,
  deserialize
};
