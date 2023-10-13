import {get, writable} from 'svelte/store';
import {generateShapes} from "../utils/shape-gen/shape-gen.ts";
import {settingsStore} from "./settingsStore.ts";

const createFeatureStore = () => {
  const feature = writable<string>('circles');
  const {blobDensity, blobSize} = settingsStore;


  const changeFeature = (newFeature: string) => {
    feature.set(newFeature);
  };

  const regenerate = () => {
    generateShapes(get(feature), {density: get(blobDensity), size: get(blobSize)});
  };

  return {
    changeFeature,
    regenerate
  };
};

export const featureStore = createFeatureStore();
