<svg xmlns="http://www.w3.org/2000/svg" id="image-render"
     bind:this={svgEl}
     viewBox="0 0 1920 1080"
     style:background={backgroundGradientString}
     style:stroke-width={$strokeWidth}
>
  <defs>
    <linearGradient id="strokeGradient" x1={strokeRotationValues.x1 + '%'} x2={strokeRotationValues.x2 + '%'}
                    y1={strokeRotationValues.y1 + '%'} y2={strokeRotationValues.y2 + '%'}
                    gradientUnits="objectBoundingBox">
      {#each $strokeGradient.colors as color, i}
        <stop offset={calcStopOffset(i)} stop-color={color} stop-opacity={$strokeGradient.opacity}/>
        {/each}
    </linearGradient>
    <filter id="f1" x="0" y="0">
      <feTurbulence
        type="fractalNoise"
        baseFrequency={$turbulence}
        numOctaves="2"
        result="turbulence"/>
      <feDisplacementMap
        in2="turbulence"
        in="SourceGraphic"
        scale="100"
        xChannelSelector="R"
        yChannelSelector="G"/>
    </filter>
    <filter id="f2" x="0" y="0">
      <feGaussianBlur in="SourceGraphic" stdDeviation={$blur}/>
    </filter>
    <filter id="f3" x="0" y="0">
      <feDropShadow dx={$threeD} dy={$threeD} flood-color="#000" stdDeviation={0}/>
    </filter>
  </defs>
  <g filter="url(#f1) url(#f2) url(#f3)" stroke="url(#strokeGradient)" fill="none">
    <text x="50%" y="0" fill="url(#strokeGradient)" dominant-baseline="hanging" text-anchor="middle" font-size={fontSize}
          font-family={$font} font-weight={$weight}
          stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
      {#each $textContent.split('\n') as line, i}
        <tspan x="50%" y={startY + fontSize * i}>{line}</tspan>
        {/each}
    </text>
  </g>
</svg>

<div style:font-family={$font} style:font-weight={$weight} style:font-size="100px"
     style:background={`url(/textures/${$bg}.jpg), linear-gradient(to right, #09f1b8, #00a2ff, #ff00d2, #fed90f)`}
     style:background-clip="text" style:color="transparent">
  {#each $textContent.split('\n') as line, i}
    <div style:margin-top={i === 0 ? startY : 0}>{line}</div>
    {/each}
</div>

<canvas bind:this={canvasEl} width="1920" height="1080" style="width: 100%"/>

<svelte:window on:mousedown={handleMouseDown}/>
<!--<svelte:body style:background-color={$backgroundColor}/>-->

<script lang="ts">
  import {fontStore} from "./fontStore.ts";
  import {getFontSize, svgHeight, svgWidth} from "@/utils/svg-size.ts";

  const {
    texture,
    turbulence,
    blur,
    threeD,
    strokeWidth,
    backgroundGradientStore,
    strokeGradientStore,
    textContent,
    size,
    font,
    weight,
    bg,
  } = fontStore;

  const {gradient: backgroundGradient} = backgroundGradientStore;
  const {gradient: strokeGradient} = strokeGradientStore;


  let svgEl: SVGSVGElement;
  let viewportEl: HTMLDivElement;
  let canvasEl: HTMLCanvasElement;


  let svgX = -200;
  let svgY = -200;
  const handleMouseDown = (e: MouseEvent) => {
    if (e.target !== viewportEl) return;
    const startX = e.clientX;
    const startY = e.clientY;
    const startSvgX = svgX;
    const startSvgY = svgY;

    const handleMouseMove = (e: MouseEvent) => {
      svgX = e.clientX - startX + startSvgX;
      svgY = e.clientY - startY + startSvgY;
      svgEl.style.left = `${svgX}px`;
      svgEl.style.top = `${svgY}px`;
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  let strokeRotationValues = {x1: 0, x2: 0, y1: 100, y2: 100};

  let backgroundGradientString = '';
  $: {
    const radians = $strokeGradient.rotation * (Math.PI / 180);
    strokeRotationValues = {
      x1: 50 + Math.sin(radians) * 50,
      y1: 50 + Math.cos(radians) * 50,
      x2: 50 + Math.sin(radians + Math.PI) * 50,
      y2: 50 + Math.cos(radians + Math.PI) * 50,
    };

    const length = $backgroundGradient.colors.length - 1;
    if (length > 0) {
      backgroundGradientString = `linear-gradient(${$backgroundGradient.rotation}deg, ${$backgroundGradient.colors.map((color, i) => `${color} ${i / length * 100}%`).join(', ')})`;
    } else {
      backgroundGradientString = $backgroundGradient.colors[0];
    }
  }

  let fontSize = 300, startY = 200, usedSpace = 0;
  $: {
    ({size: fontSize, start: startY, usedSpace} = getFontSize($textContent, $font, $weight));

    if (canvasEl) {

      const ctx = canvasEl.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
        const lines = $textContent.split('\n');
        const margin = svgHeight / 10 / 1000;
        const widthMargin = svgWidth - margin;
        const heightMargin = svgHeight - margin;
        let size = heightMargin / lines.length;
        for (; size > 10; size -= 10) {
          ctx.font = `${$weight} ${size}px "${$font}"`;
          // console.log(ctx.font);
          let bad = false;
          for (let i = 0; i < lines.length; i++) {
            const text = lines[i];
            const textWidth = ctx.measureText(text).width;
            if (textWidth > widthMargin) {
              bad = true;
              break;
            }
          }
          if (!bad) {
            break;
          }
        }
        // const lines = $textContent.split('\n');
        // for (let i = 0; i < lines.length; i++) {
        //   const text = lines[i];
        //   const textWidth = ctx.measureText(text).width;
        //   const textHeight = 50;
        //   canvasEl.width = textWidth;
        //   canvasEl.height = textHeight;
        // }

        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        const usedSpace = size * lines.length;
        const start = (1080 - usedSpace) / 2;
        for (let i = 0; i < lines.length; i++) {
          const text = lines[i];
          ctx.fillText(text, 960, start + size * i);
        }

        // canvasEl.width = 50;
        // canvasEl.height = 50;

        // ctx.measureText($textContent);
      }
    }
  }

  const calcStopOffset = (i: number) => {
    const length = $strokeGradient.colors.length;
    return length > 1 ? i / (length - 1) : 0;
  };

</script>

<style>

  svg {
    width: 100%;
    height: 100%;
  }
</style>
