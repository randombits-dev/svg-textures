type GenerateRect = {
  size: number,
  width: number,
  height: number
}

type GenerateCircles = GenerateRect & {
  density: number
};

export const generateRects = ({density, size, width, height}: GenerateCircles) => {
  const paths = [];
  const count = ((width * height) / (size * size)) * density;
  for (let i = 0; i < count; i++) {
    paths.push(generateRect({size, width, height}));
  }
  return paths;
};

export const generateRect = ({size, width, height}: GenerateRect) => {
  const randomWidth = randomNumberBetween(size / 2, size * 2);
  const randomHeight = randomNumberBetween(size / 2, size * 2);
  const randomAngle = randomNumberBetween(0, 45);
  const randomX = randomNumberBetween(-randomWidth, width);
  const randomY = randomNumberBetween(-randomHeight, height);

  return `<rect x="${randomX}" y="${randomY}" width="${randomWidth}" height="${randomHeight}" transform="rotate(${randomAngle}, ${randomX}, ${randomY})"/>`;
};

const randomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
