import {get, writable} from 'svelte/store';
import {generateSquiggle} from '../../generators/squiggle-gen.ts';
import {generateLinesAcross} from '../../generators/line-across-gen.ts';
import {createGradientStore} from '@/components/common/color-picker/gradientStore.ts';

const feature = writable<string>('circles');
const texture = writable<string[]>([]);
const turbulence = writable(0);
const blur = writable(0);
const size = writable(200);
// const dropShadowX = writable(0);
// const dropShadowY = writable(0);
// const dropShadowBlur = writable(0);
const threeD = writable(0);
const density = writable(0.2);
const strokeWidth = writable(1);
const textContent = writable('Hello World');

// const fillGradientStore = createGradientStore({rotation: 0, opacity: 1, colors: ['#e02157', '#1e53b3']});
const backgroundGradientStore = createGradientStore({rotation: 0, opacity: 1, colors: ['#eeeeee']});
const strokeGradientStore = createGradientStore({rotation: 0, opacity: 1, colors: ['#111111']});

const regenerate = () => {
  const type = get(feature);
  if (type === 'continuous') {
    texture.set([generateSquiggle({density: get(density)})]);
  } else if (type === 'straight') {
    texture.set([generateLinesAcross({density: get(density), curves: false})]);
  } else if (type === 'curves') {
    texture.set([generateLinesAcross({density: get(density), curves: true})]);
  }
};

const serialize = () => {
  return JSON.stringify({
    feature: get(feature),
    turbulence: get(turbulence),
    blur: get(blur),
    threeD: get(threeD),
    density: get(density),
    strokeWidth: get(strokeWidth),
    size: get(size),
    // fillGradient: get(fillGradientStore.gradient),
    backgroundGradient: get(backgroundGradientStore.gradient),
    strokeGradient: get(strokeGradientStore.gradient),
    textContent: get(textContent)
  });
};

const deserialize = (obj: any) => {
  feature.set(obj.feature);
  turbulence.set(obj.turbulence);
  blur.set(obj.blur);
  threeD.set(obj.threeD || 0);
  density.set(obj.density);
  strokeWidth.set(obj.strokeWidth || 0);
  size.set(obj.size || 0);
  // fillGradientStore.set(obj.fillGradient);
  backgroundGradientStore.set(obj.backgroundGradient);
  strokeGradientStore.set(obj.strokeGradient || {rotation: 0, opacity: 1, colors: ['#111111']});
  textContent.set(obj.textContent || 'Hello World');
};

export const fontStore = {
  feature,
  texture,
  turbulence,
  blur,
  threeD,
  density,
  strokeWidth,
  size,

  backgroundGradientStore,
  strokeGradientStore,

  textContent,

  regenerate,
  // regenerateRandom,
  serialize,
  deserialize
};
