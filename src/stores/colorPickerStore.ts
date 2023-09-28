import {writable} from 'svelte/store';
import {hex2hsv, hsv2hex} from "../utils/color-utils.ts";

export type ColorValue = {
    hex: string;
    h: number;
    s: number;
    v: number;
}

const initialValue: ColorValue = {
    hex: '#405a81',
    h: 0.6,
    s: 0.5,
    v: 0.5
};

const createColorPickerStore = () => {
    const {subscribe, set, update} = writable<ColorValue>(initialValue);

    const setHex = (hex: string) => {
        const [h, s, v] = hex2hsv(hex);
        set({hex, h, s, v});
    };

    const setHue = (h: number) => {
        update((color: ColorValue) => {
            const hex = hsv2hex(h, color.s, color.v);
            return {...color, h, hex};
        });
    };

    const setSV = (s: number, v: number) => {
        update((color: ColorValue) => {
            const hex = hsv2hex(color.h, s, v);
            return {...color, s, v, hex};
        });
    };

    return {
        subscribe,
        setHex,
        setHue,
        setSV
    };
};

export const colorPickerStore = createColorPickerStore();
