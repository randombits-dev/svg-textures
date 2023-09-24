import {writable} from "svelte/store";

const createSettingsStore = () => {
    const turbulence = writable(0);
    const blur = writable(0);

    return {turbulence, blur};
};

export const settingsStore = createSettingsStore();
