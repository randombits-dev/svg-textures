import {writable} from "svelte/store";

const createSettingsStore = () => {
    const turbulence = writable(0);
    const turbulenceScale = writable(100);
    const blur = writable(0);
    const dropShadowX = writable(1);
    const dropShadowY = writable(1);
    const dropShadowBlur = writable(0);

    return {turbulence, turbulenceScale, blur, dropShadowX, dropShadowY, dropShadowBlur};
};

export const settingsStore = createSettingsStore();
