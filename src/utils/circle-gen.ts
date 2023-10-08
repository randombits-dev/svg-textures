type GenerateCircle = {
  size: number,
  width: number,
  height: number
}

type GenerateCircles = GenerateCircle & {
  density: number
};

export const generateCircles = ({density, size, width, height}: GenerateCircles) => {
  const paths = [];
  const count = ((width * height) / (size * size)) * density;
  for (let i = 0; i < count; i++) {
    paths.push(generateCircle({size, width, height}));
  }
  return paths;
};

export const generateCircle = ({size, width, height}: GenerateCircle) => {
  const randomSize = randomNumberBetween(size / 2, size);
  const randomX = randomNumberBetween(-randomSize, width);
  const randomY = randomNumberBetween(-randomSize, height);

  return `<circle cx="${randomX}" cy="${randomY}" r="${randomSize}"/>`;
};
const randomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
