import {get, writable} from 'svelte/store';
import {settingsStore} from "./settingsStore.ts";
import {generateShapes} from "../utils/shape-gen/shape-gen.ts";

const createTextureStore = () => {
  const {blobDensity, blobSize} = settingsStore;

  const feature = writable<string>('circles');

  const initialTexture = generateShapes(get(feature), {density: get(blobDensity), size: get(blobSize)});

  const texture = writable<string[]>(initialTexture);


  const changeFeature = (newFeature: string) => {
    feature.set(newFeature);

    regenerate();
  };

  const regenerate = () => {
    texture.set(generateShapes(get(feature), {density: get(blobDensity), size: get(blobSize)}));
  };

  const changeTexture = (name: string) => {
    fetch(`/${name}`)
        .then((response) => response.text())
        .then((data) => {
          texture.set(data);
        });
  };


  return {
    changeFeature,
    regenerate,
    changeTexture,
    subscribe: texture.subscribe,
    feature
  };
};

export const textureStore = createTextureStore();
