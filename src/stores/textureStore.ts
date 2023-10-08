import {writable} from 'svelte/store';
import {generator} from "../utils/blob-gen.js";

const createTextureStore = () => {
  const {subscribe, set, update} = writable<string>('');

  const changeTexture = (name: string) => {
    fetch(`/${name}`)
        .then((response) => response.text())
        .then((data) => {
          set(data);
        });
  };

  const generateBlob = () => {
    const paths = [];
    for (let i = 0; i < 10000; i++) {
      paths.push(`<path d="${generator().path}"></path>`);
    }
    set(paths.join(''));
  };

  return {
    subscribe,
    changeTexture,
    generateBlob
  };
};

export const textureStore = createTextureStore();
