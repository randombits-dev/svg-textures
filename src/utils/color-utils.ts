// export const hsl2Rbg = (h: number, s: number, l: number) => {
//     console.log('hslToHex', h, s, l);
//     let a = s * Math.min(l, 1 - l);
//     let f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
//     return [f(0), f(8), f(4)];
// };

const rgb2hex = ([r, g, b]: number[]) => {
    // console.log('rgb2hex', r, g, b);
    return "#" + [r, g, b].map(x => x.toString(16).padStart(2, 0)).join('');
};

const hsv2rgb = (h: number, s: number, v: number) => {
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    let r, g, b;
    switch (i % 6) {
        case 0:
            r = v, g = t, b = p;
            break;
        case 1:
            r = q, g = v, b = p;
            break;
        case 2:
            r = p, g = v, b = t;
            break;
        case 3:
            r = p, g = q, b = v;
            break;
        case 4:
            r = t, g = p, b = v;
            break;
        case 5:
            r = v, g = p, b = q;
            break;
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

export const hsv2hex = (h: number, s: number, v: number) => {
    return rgb2hex(hsv2rgb(h, s, v));
};

const rbg2hsv = ([rHex, gHex, bHex]: number[]): number[] => {
    const r = rHex / 255, g = gHex / 255, b = bHex / 255;
    console.log('rbg2hsv', r, g, b);
    let v = Math.max(r, g, b), c = v - Math.min(r, g, b);
    let h = c && ((v == r) ? (g - b) / c : ((v == g) ? 2 + (b - r) / c : 4 + (r - g) / c));
    return [60 * (h < 0 ? h + 6 : h), v && c / v, v];
};

const hexToRgb = (hex: string) => {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [0, 0, 0];
};

export const hex2hsv = (hex: string) => {
    return rbg2hsv(hexToRgb(hex));
};
