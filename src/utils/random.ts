export const randomIntBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomDecimalBetween = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};
