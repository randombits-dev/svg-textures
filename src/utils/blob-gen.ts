let randomX: number;
let randomY: number;

type GenerateBlob = {
  size: number,
  width: number,
  height: number
}

type GenerateBlobs = GenerateBlob & {
  density: number
};

export const generateBlobs = ({density, size, width, height}: GenerateBlobs) => {
  const paths = [];
  const count = ((width * height) / (size)) * density;
  for (let i = 0; i < count; i++) {
    paths.push(generateBlob({size, width, height}));
  }
  return paths;
};

export const generateBlob = ({size, width, height}: GenerateBlob) => {
  randomX = randomNumberBetween(-25, width);
  randomY = randomNumberBetween(-50, height);
  // const size = randomNumberBetween(size/2, size*2);
  // const growth = randomNumberBetween(2, 8);
  // const edges = randomNumberBetween(3, 5);
  const destPoints = _createPoints(size, 1, 3);
  const path = _createSvgPath(destPoints);

  return `<path d="${path}"></path>`;
};

const randomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const _toRad = (deg: number) => deg * (Math.PI / 180.0);

const _divide = (count: number) => {
  var deg = 360 / count;

  return Array(count)
      .fill("a")
      .map((_, i) => i * deg);
};

const _magicPoint = (value: number, min: number, max: number) => {
  let radius = min + value * (max - min);
  if (radius > max) {
    radius = radius - min;
  } else if (radius < min) {
    radius = radius + min;
  }
  return radius;
};

const _point = (origin: number, radius: number, degree: number) => {
  var x = origin + randomX + radius * Math.cos(_toRad(degree));
  var y = origin + randomY + radius * Math.sin(_toRad(degree));
  return [Math.round(x), Math.round(y)];
};

const _createPoints = (size: number, minGrowth: number, edgesCount: number) => {
  let outerRad = size / 2;
  let innerRad = minGrowth * (outerRad / 10);
  let center = size / 2;

  let slices = _divide(edgesCount);
  let destPoints: any[] = [];

  slices.forEach((degree) => {
    let O = _magicPoint(Math.random(), innerRad, outerRad);
    let end = _point(center, O, degree);
    destPoints.push(end);
  });
  return destPoints;
};

const _createSvgPath = (points: any[]) => {
  let svgPath = "";
  var mid = [
    (points[0][0] + points[1][0]) / 2,
    (points[0][1] + points[1][1]) / 2,
  ];
  svgPath += "M" + mid[0] + "," + mid[1];

  for (var i = 0; i < points.length; i++) {
    var p1 = points[(i + 1) % points.length];
    var p2 = points[(i + 2) % points.length];
    mid = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
    svgPath += "Q" + p1[0] + "," + p1[1] + "," + mid[0] + "," + mid[1];
  }
  svgPath += "Z";
  return svgPath;
};
