import {writable} from "svelte/store";

const createSettingsStore = () => {
  const turbulence = writable(0);
  const turbulenceScale = writable(100);
  const blur = writable(0);
  const dropShadowX = writable(0);
  const dropShadowY = writable(0);
  const dropShadowBlur = writable(0);
  const backgroundColor = writable('#ffffff');
  const fillColor = writable('#ffffff');
  const fillOpacity = writable('1');

  return {
    turbulence,
    turbulenceScale,
    blur,
    dropShadowX,
    dropShadowY,
    dropShadowBlur,
    backgroundColor,
    fillColor,
    fillOpacity
  };
};

export const settingsStore = createSettingsStore();
