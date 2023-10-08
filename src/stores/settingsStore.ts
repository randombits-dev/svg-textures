import {writable} from "svelte/store";

const createSettingsStore = () => {
  const turbulence = writable(0);
  const turbulenceScale = writable(100);
  const blur = writable(0);
  const dropShadowX = writable(0);
  const dropShadowY = writable(0);
  const dropShadowBlur = writable(0);
  const backgroundColor = writable('#111111');
  const fillColor = writable('#506f9e');
  const fillOpacity = writable('1');
  const blobDensity = writable(0.2);
  const blobSize = writable(30);

  return {
    turbulence,
    turbulenceScale,
    blur,
    dropShadowX,
    dropShadowY,
    dropShadowBlur,
    backgroundColor,
    fillColor,
    fillOpacity,
    blobDensity,
    blobSize
  };
};

export const settingsStore = createSettingsStore();
