export const randomIntBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomDecimalBetween = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const randomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

export const randomIntBetweenRandomToggle = (min: number, max: number, chanceToToggle: number) => {
  if (Math.random() < chanceToToggle) {
    return randomIntBetween(min, max);
  }
  return 0;
};

export const randomDecimalBetweenRandomToggle = (min: number, max: number, chanceToToggle: number) => {
  if (Math.random() < chanceToToggle) {
    return randomDecimalBetween(min, max);
  }
  return 0;
};

const colors = ['#f35757', '#f3b057', '#f3f357', '#57f357', '#57f3b0', '#57f3f3', '#57b0f3', '#5757f3', '#b057f3', '#f357f3', '#f357b0',
  '#f35757'];
export const randomGoodColor = () => {
  return colors[randomIntBetween(0, colors.length - 1)];
};
