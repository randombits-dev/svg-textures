import {GOOD_COLORS, GRADIENTS} from '@/data/gradients.ts';

export const randomIntBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomDecimalBetween = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

// export const randomColor = () => {
//   return '#' + Math.floor(Math.random() * 16777215).toString(16);
// };

export const randomBackground = () => {
  if (Math.random() < 0.5) {
    return {
      rotation: 0,
      opacity: 1,
      colors: ['#000000']
    };
  } else {
    return {
      rotation: 0,
      opacity: 1,
      colors: ['#ffffff']
    };
  }
};

export const randomGradient = () => {
  if (Math.random() < 0.5) {
    return {
      rotation: 0,
      opacity: randomDecimalBetween(0, 1),
      colors: ['#' + GOOD_COLORS[randomIntBetween(0, GOOD_COLORS.length - 1)]]
    };
  } else {
    const gradient = GRADIENTS[randomIntBetween(0, GRADIENTS.length - 1)];
    return {
      rotation: randomIntBetween(0, 360),
      opacity: randomDecimalBetween(0, 1),
      colors: ['#' + gradient[0], '#' + gradient[1]]
    };
  }
};

export const randomIntBetweenRandomToggle = (control: [number, number, number?]) => {
  if (control) {
    if (Math.random() < (control[2] || 1)) {
      return randomDecimalBetween(control[0], control[1]);
    }
    return control[0];
  }
  return 0;
};

export const randomDecimalBetweenRandomToggle = (control: [number, number, number?]) => {
  if (control) {
    if (Math.random() < (control[2] || 1)) {
      return randomDecimalBetween(control[0], control[1]);
    }
    return control[0];
  }
  return 0;
};
