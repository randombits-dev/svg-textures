import {writable} from "svelte/store";
import {createGradientStore} from "../components/common/color-picker/gradientStore.ts";

const createSettingsStore = () => {
  const turbulence = writable(0);
  const turbulenceScale = writable(100);
  const blur = writable(0);
  const dropShadowX = writable(0);
  const dropShadowY = writable(0);
  const dropShadowBlur = writable(0);
  const backgroundColor = writable('#111111');
  // const fillColor = writable('#506f9e');
  // const fillColor2 = writable('#992222');
  // const fillOpacity = writable(1);
  // const fillOpacity2 = writable(1);
  // const strokeColor = writable('#506f9e');
  // const strokeOpacity = writable(0);
  // const strokeWidth = writable(1);
  const blobDensity = writable(0.2);
  const blobSize = writable(30);
  const fillRotation = writable(270);

  const fillGradientStore = createGradientStore({rotation: 0, opacity: 1, colors: ['#e02157', '#1e53b3']});
  const backgroundGradientStore = createGradientStore({rotation: 0, opacity: 1, colors: ['#111111']});

  return {
    turbulence,
    turbulenceScale,
    blur,
    dropShadowX,
    dropShadowY,
    dropShadowBlur,
    backgroundColor,
    fillRotation,
    blobDensity,
    blobSize,

    fillGradientStore,
    backgroundGradientStore
  };
};

export const settingsStore = createSettingsStore();
