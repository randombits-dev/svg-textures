import {get, writable} from 'svelte/store';
import {createGradientStore} from '../common/color-picker/gradientStore.ts';
import {generateShapes} from '../../utils/shape-gen/shape-gen.ts';

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
const strokeWidth = writable(1);

// const fillGradientStore = createGradientStore({rotation: 0, opacity: 1, colors: ['#e02157', '#1e53b3']});
const backgroundGradientStore = createGradientStore({rotation: 0, opacity: 1, colors: ['#eeeeee']});
const strokeGradientStore = createGradientStore({rotation: 0, opacity: 1, colors: ['#111111']});

const regenerate = () => {
  texture.set(generateShapes(get(feature), {density: get(density), size: get(size)}));
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
    strokeWidth: get(strokeWidth),
    // fillGradient: get(fillGradientStore.gradient),
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
  strokeWidth.set(obj.strokeWidth || 0);
  // fillGradientStore.set(obj.fillGradient);
  backgroundGradientStore.set(obj.backgroundGradient);
  strokeGradientStore.set(obj.strokeGradient || {rotation: 0, opacity: 1, colors: ['#111111']});
};

export const lineStore = {
  feature,
  texture,
  turbulence,
  turbulenceScale,
  blur,
  threeD,
  density,
  size,
  strokeWidth,

  backgroundGradientStore,
  strokeGradientStore,

  regenerate,
  // regenerateRandom,
  serialize,
  deserialize
};
