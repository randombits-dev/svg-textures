import {toBase64} from "js-base64";
import {svgHeight, svgWidth} from "./svg-size.ts";
import html2canvas from "html2canvas";

export const copyClipboard = (svg: string) => {
  exportImage(svg, clipboardCopy);
};
export const downloadPNG = (svg: string) => {
  exportImage(svg, downloadImage);
};

export const downloadWebp = (svg: string, width?: number, height?: number) => {
  exportImage(svg, (context, image) => {
    return () => {
      const {canvas} = context;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      simulateDownload(
          getFileName('webp'),
          canvas.toDataURL('image/webp').replace('image/webp', 'image/octet-stream')
      );
    };
  }, width, height);
};

export const downloadWebpFromEl = (el: HTMLElement) => {
  html2canvas(el).then((canvas) => {
    simulateDownload(
        getFileName('webp'),
        canvas.toDataURL('image/webp').replace('image/webp', 'image/octet-stream')
    );
  });
};

export const downloadSVG = (svg: string) => {
  simulateDownload(getFileName('svg'), `data:image/svg+xml;base64,${getBase64SVG(svg)}`);
};

const clipboardCopy = (context, image) => {
  return () => {
    const {canvas} = context;
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      console.log(blob.type);
      try {
        if (!blob) {
          throw new Error('blob is empty');
        }
        void navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob
          })
        ]);
      } catch (error) {
        console.error(error);
      }
    });
  };
};

export const copyWebpToClipboard = (svg: string) => {
  exportImage(svg, (context, image) => {
    const {canvas} = context;
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const webp = canvas.toDataURL('image/webp').replace('image/webp', 'image/octet-stream');
    void navigator.clipboard.write([
      new ClipboardItem({
        'image/webp': webp
      })
    ]);
  });
};

const downloadImage = (context, image) => {
  return () => {
    const {canvas} = context;
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    simulateDownload(
        getFileName('png'),
        canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    );
  };
};

const getFileName = (ext: string) =>
    `chaos-${new Date().getTime()}.${ext}`;

const simulateDownload = (download: string, href: string): void => {
  const a = document.createElement('a');
  a.download = download;
  a.href = href;
  a.click();
  a.remove();
};
const exportImage = (svg: string, exporter: any, width: number = svgWidth, height: number = svgHeight) => {
  // const [width, height] = calcSize(svg);
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('context not found');
  }
  // context.fillStyle = 'white';
  // context.fillRect(0, 0, canvas.width, canvas.height);

  const image = new Image();
  image.onload = exporter(context, image);
  image.src = `data:image/svg+xml;base64,${toBase64(svg)}`;
};

const calcSize = (svg: string) => {
  const start = svg.indexOf('viewBox="');
  const end = svg.indexOf('"', start + 9);
  const viewBox = svg.substring(start + 9, end);
  const parts = viewBox.split(' ');
  const width = Number(parts[2]);
  const height = Number(parts[3]);
  const ratio = 1000 / width;
  const newHeight = height * ratio;
  const newWidth = 1000;
  return [newWidth, newHeight];
};

const getBase64SVG = (svg: string): string => {
  const svgString = svg.replaceAll('<br>', '<br/>')
      .replaceAll(/<img([^>]*)>/g, (m, g: string) => `<img ${g} />`);
  return toBase64(svgString);
};
