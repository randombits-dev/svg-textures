import {svgHeight, svgWidth} from '@/utils/svg-size.ts';
import {randomIntBetween} from '@/utils/random.ts';

export const generateCirclesDashed = ({density}) => {
  const startX = svgWidth / 2;
  const startY = svgHeight / 2;
  const radius = svgWidth / 20;
  const paths = [];
  for (let i = 1; i < density * 125; i++) {
    const length = 1 / density;
    const dash = randomIntBetween(i * length, i * length * 10);
    const gap = randomIntBetween(i * length, i * length * 10);
    const offset = randomIntBetween(0, 100);
    const radius = i / density * 10;
    paths.push(
      `<circle stroke-linecap="round" cx="${startX}" cy="${startY}" r="${radius}" stroke-dasharray="${dash} ${gap}" stroke-dashoffset="${offset}"/>`);
  }
  return paths;
};
