import {get, writable} from "svelte/store";
import {createGradientStore} from "./gradientStore.ts";
import {generateShapes} from "../utils/shape-gen/shape-gen.ts";

const feature = writable<string>('circles');
const texture = writable<string[]>([]);
const turbulence = writable(0);
const turbulenceScale = writable(100);
const blur = writable(0);
const dropShadowX = writable(0);
const dropShadowY = writable(0);
const dropShadowBlur = writable(0);
const backgroundColor = writable('#111111');
const density = writable(0.2);
const size = writable(30);

const fillGradientStore = createGradientStore({rotation: 0, colors: ['#e02157', '#1e53b3']});
const backgroundGradientStore = createGradientStore({rotation: 0, colors: ['#111111']});

const regenerate = () => {
  texture.set(generateShapes(get(feature), {density: get(density), size: get(size)}));
};

export const organicSettingsStore = {
  feature,
  texture,
  turbulence,
  turbulenceScale,
  blur,
  dropShadowX,
  dropShadowY,
  dropShadowBlur,
  backgroundColor,
  density,
  size,

  fillGradientStore,
  backgroundGradientStore,

  regenerate
};
