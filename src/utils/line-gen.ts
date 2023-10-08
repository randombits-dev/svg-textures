type GenerateLine = {
  size: number,
  width: number,
  height: number
}

type GenerateLines = GenerateLine & {
  density: number
};

export const generateLines = ({density, size, width, height}: GenerateLines) => {
  const paths = [];
  const count = ((width * height) / (size)) * density;
  for (let i = 0; i < count; i++) {
    paths.push(generateLine({size, width, height}));
  }
  return paths;
};

export const generateLine = ({size, width, height}: GenerateLine) => {
  const randomWidth = randomNumberBetween(size / 4, size * 2);
  const randomHeight = 2;
  const randomAngle = randomNumberBetween(0, 180);

  const randomX = randomNumberBetween(-randomWidth, width);
  const randomY = randomNumberBetween(-randomHeight, height);

  return `<rect x="${randomX}" y="${randomY}" width="${randomWidth}" height="${randomHeight}" transform="rotate(${randomAngle}, ${randomX}, ${randomY})"/>`;
};

const randomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
