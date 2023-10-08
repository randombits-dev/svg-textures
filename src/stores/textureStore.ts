import {writable} from 'svelte/store';

const createTextureStore = () => {
  const {subscribe, set, update} = writable<string>('');

  const changeTexture = (name: string) => {
    fetch(`/${name}`)
        .then((response) => response.text())
        .then((data) => {
          set(data);
        });
  };


  return {
    subscribe,
    changeTexture,
    set
  };
};

export const textureStore = createTextureStore();
