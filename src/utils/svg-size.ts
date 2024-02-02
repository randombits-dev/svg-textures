export const svgWidth = 1920;
export const svgHeight = 1080;

export const getFontSize = (text: string, lineHeight: number = 1) => {
  const canvasEl = document.createElement('canvas');
  canvasEl.width = svgWidth;
  canvasEl.height = svgHeight;
  const ctx = canvasEl.getContext('2d');
  const lines = text.split('\n');
  const margin = svgHeight / 10;
  const widthMargin = svgWidth - margin;
  const heightMargin = svgHeight - margin;
  let size = heightMargin / lines.length;

  const measureText = () => {
    for (let i = 0; i < lines.length; i++) {
      const textWidth = ctx.measureText(lines[i]).width;
      if (textWidth > widthMargin) {
        return false;
      }
    }
    return true;
  };

  for (; size > 10; size -= 10) {
    ctx.font = `${size}px Arial`;
    const fits = measureText();
    if (fits) {
      break;
    }
  }
  const usedSpace = size * lines.length;
  const start = (svgHeight - usedSpace) / 2;
  return {size, start, usedSpace};
};
