import {get, writable} from 'svelte/store';
import {createGradientStore} from '../common/color-picker/gradientStore.ts';
import {generateShapes} from '../../utils/shape-gen/shape-gen.ts';
import {randomDecimalBetween} from '../../utils/random.ts';
import {organicRanges} from './organic-ranges.ts';

const feature = writable<string>('circles');
const texture = writable<string[]>([]);
const turbulence = writable(0);
const turbulenceScale = writable(100);
const blur = writable(0);
// const dropShadowX = writable(0);
// const dropShadowY = writable(0);
// const dropShadowBlur = writable(0);
const threeD = writable(0);
const density = writable(0.2);
const size = writable(30);

const fillGradientStore = createGradientStore({rotation: 0, opacity: 1, colors: ['#e02157', '#1e53b3']});
const backgroundGradientStore = createGradientStore({rotation: 0, opacity: 1, colors: ['#111111']});

const regenerate = () => {
  texture.set(generateShapes(get(feature), {density: get(density), size: get(size)}));
};

const regenerateRandom = () => {
  turbulence.set(randomDecimalBetween(...organicRanges.turbulance));
  size.set(randomDecimalBetween(...organicRanges.size));
  density.set(randomDecimalBetween(...organicRanges.density));
  threeD.set(randomDecimalBetween(...organicRanges.shadow));

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
    fillGradient: get(fillGradientStore.gradient),
    backgroundGradient: get(backgroundGradientStore.gradient)
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
  fillGradientStore.set(obj.fillGradient);
  backgroundGradientStore.set(obj.backgroundGradient);
};

export const organicStore = {
  feature,
  texture,
  turbulence,
  turbulenceScale,
  blur,
  threeD,
  density,
  size,

  fillGradientStore,
  backgroundGradientStore,

  regenerate,
  regenerateRandom,
  serialize,
  deserialize
};
