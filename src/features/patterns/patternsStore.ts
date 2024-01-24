import {get, writable} from 'svelte/store';
import {createGradientStore} from '@/components/common/color-picker/gradientStore.ts';
import {generateShapes} from '@/utils/shape-gen/shape-gen.ts';
import {
  randomColor, randomDecimalBetween, randomDecimalBetweenRandomToggle, randomIntBetween, randomIntBetweenRandomToggle
} from '@/utils/random.ts';

const feature = writable<string>('circles');
const texture = writable<string[]>([]);
const turbulence = writable(0);
const turbulenceScale = writable(1);
const blur = writable(0);
// const dropShadowX = writable(0);
// const dropShadowY = writable(0);
// const dropShadowBlur = writable(0);
const threeD = writable(0);
const density = writable(0.2);
const size = writable(30);
const sizeVariation = writable(1);
const separation = writable(1);
const strokeWidth = writable(0);

const fillGradientStore = createGradientStore({rotation: 0, opacity: 1, colors: ['#e02157', '#1e53b3']});
const backgroundGradientStore = createGradientStore({rotation: 0, opacity: 1, colors: ['#111111']});
const strokeGradientStore = createGradientStore({rotation: 0, opacity: 0, colors: ['#111111']});

const regenerate = () => {
  texture.set(
    generateShapes(get(feature), {density: get(density), size: get(size), separation: get(separation), sizeVariation: get(sizeVariation)}));
};

const regenerateRandom = () => {
  // feature.set(randomElement(['circles', 'blobs']));
  turbulence.set(randomDecimalBetweenRandomToggle(0, 0.05, 0.1));
  turbulenceScale.set(randomDecimalBetween(0, 1));
  blur.set(randomIntBetweenRandomToggle(0, 20, 0.1));
  threeD.set(randomIntBetweenRandomToggle(0, 15, 0.3));
  density.set(randomDecimalBetween(0.1, 0.9));
  size.set(randomIntBetween(10, 100));
  sizeVariation.set(randomDecimalBetween(0, 1));
  separation.set(randomDecimalBetween(0, 2));
  strokeWidth.set(randomIntBetweenRandomToggle(0, 25, 0.4));
  fillGradientStore.set({
    rotation: randomIntBetween(0, 360),
    opacity: randomDecimalBetween(0, 1),
    colors: [randomColor(), randomColor()]
  });
  regenerate();
};

const serialize = () => {
  return JSON.stringify({
    feature: get(feature),
    turbulence: get(turbulence),
    turbulenceScale: get(turbulenceScale),
    blur: get(blur),
    threeD: get(threeD),
    density: get(density),
    size: get(size),
    sizeVariation: get(sizeVariation),
    separation: get(separation),
    strokeWidth: get(strokeWidth),
    fillGradient: get(fillGradientStore.gradient),
    backgroundGradient: get(backgroundGradientStore.gradient),
    strokeGradient: get(strokeGradientStore.gradient)
  });
};

const deserialize = (obj: any) => {
  feature.set(obj.feature);
  turbulence.set(obj.turbulence);
  turbulenceScale.set(obj.turbulenceScale);
  blur.set(obj.blur);
  threeD.set(obj.threeD || 0);
  density.set(obj.density);
  size.set(obj.size);
  sizeVariation.set(obj.sizeVariation);
  separation.set(obj.separation);
  strokeWidth.set(obj.strokeWidth || 0);
  fillGradientStore.set(obj.fillGradient);
  backgroundGradientStore.set(obj.backgroundGradient);
  strokeGradientStore.set(obj.strokeGradient || {rotation: 0, opacity: 1, colors: ['#111111']});
};

export const patternsStore = {
  feature,
  texture,
  turbulence,
  turbulenceScale,
  blur,
  threeD,
  density,
  size,
  sizeVariation,
  separation,
  strokeWidth,

  fillGradientStore,
  backgroundGradientStore,
  strokeGradientStore,

  regenerate,
  regenerateRandom,
  // regenerateRandom,
  serialize,
  deserialize
};
