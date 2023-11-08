import {get, writable} from "svelte/store";
import {createGradientStore} from "../common/color-picker/gradientStore.ts";
import {generateShapes} from "../../utils/shape-gen/shape-gen.ts";

const feature = writable<string>('circles');
const texture = writable<string[]>([]);
const turbulence = writable(0);
const turbulenceScale = writable(1);
const blur = writable(0);
// const dropShadowX = writable(0);
// const dropShadowY = writable(0);
// const dropShadowBlur = writable(0);
const threeD = writable(0);
const backgroundColor = writable('#111111');
const density = writable(0.2);
const size = writable(30);
const strokeWidth = writable(0);

const fillGradientStore = createGradientStore({rotation: 0, opacity: 1, colors: ['#e02157', '#1e53b3']});
const backgroundGradientStore = createGradientStore({rotation: 0, opacity: 1, colors: ['#111111']});
const strokeGradientStore = createGradientStore({rotation: 0, opacity: 0, colors: ['#111111']});

const regenerate = () => {
  texture.set(generateShapes(get(feature), {density: get(density), size: get(size)}));
};

// const regenerateRandom = () => {
//   turbulence.set(randomDecimalBetween(...organicRanges.turbulance));
//   size.set(randomDecimalBetween(...organicRanges.size));
//   density.set(randomDecimalBetween(...organicRanges.density));
//   threeD.set(randomDecimalBetween(...organicRanges.shadow));
//   regenerate();
// };

const serialize = () => {
  return JSON.stringify({
    feature: get(feature),
    turbulence: get(turbulence),
    turbulenceScale: get(turbulenceScale),
    blur: get(blur),
    threeD: get(threeD),
    backgroundColor: get(backgroundColor),
    density: get(density),
    size: get(size),
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
  backgroundColor.set(obj.backgroundColor);
  density.set(obj.density);
  size.set(obj.size);
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
  backgroundColor,
  density,
  size,
  strokeWidth,

  fillGradientStore,
  backgroundGradientStore,
  strokeGradientStore,

  regenerate,
  // regenerateRandom,
  serialize,
  deserialize
};
