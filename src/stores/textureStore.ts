import {writable} from 'svelte/store';

const createTextureStore = () => {
    const {subscribe, set, update} = writable(null);

    const changeTexture = (name: string) => {
        fetch(`/${name}`)
            .then((response) => response.text())
            .then((data) => {
                set(data);
            });
    };

    return {
        subscribe,
        changeTexture
    };
};

export const textureStore = createTextureStore();
