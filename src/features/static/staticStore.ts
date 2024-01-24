import {get, writable} from 'svelte/store';
import {createGradientStore} from '@/components//common/color-picker/gradientStore.ts';
import {generateShapes} from '@/utils/shape-gen/shape-gen.ts';
import {randomDecimalBetween} from '@/utils/random.ts';
import {staticRanges} from './static-ranges.ts';

const feature = writable<string>('circles');
const texture = writable<string[]>([]);
const turbulence = writable(0);
const turbulenceScale = writable(100);
const backgroundColor = writable('#111111');
const density = writable(0.2);
const size = writable(30);
const fontSize = writable(200);

const fillColor = writable('#ffffff');
const backgroundGradientStore = createGradientStore({rotation: 0, opacity: 1, colors: ['#111111']});

const regenerate = () => {
  texture.set(generateShapes(get(feature), {density: get(density), size: get(size)}));
};

const regenerateRandom = () => {
  turbulence.set(randomDecimalBetween(...staticRanges.turbulance));
  size.set(randomDecimalBetween(...staticRanges.size));
  density.set(randomDecimalBetween(...staticRanges.density));

  regenerate();
};

const serialize = () => {
  return JSON.stringify({
    feature: get(feature),
    turbulence: get(turbulence),
    turbulenceScale: get(turbulenceScale),
    density: get(density),
    size: get(size),
    fillColor: get(fillColor),
    // fontSize: get(fontSize),
    backgroundGradient: get(backgroundGradientStore.gradient)
  });
};

const deserialize = (obj: any) => {
  feature.set(obj.feature);
  turbulence.set(obj.turbulence);
  turbulenceScale.set(obj.turbulenceScale);
  density.set(obj.density);
  size.set(obj.size);
  fillColor.set(obj.fillColor);
  // fontSize.set(obj.fontSize);
  backgroundGradientStore.set(obj.backgroundGradient);
};

export const staticStore = {
  feature,
  texture,
  turbulence,
  turbulenceScale,
  backgroundColor,
  density,
  size,
  fontSize,

  fillColor,
  backgroundGradientStore,

  regenerate,
  regenerateRandom,
  serialize,
  deserialize
};
