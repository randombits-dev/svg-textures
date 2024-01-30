<div style:-webkit-mask-image={`url("data:image/svg+xml, ${svgHtml}")`}>
  <svg xmlns="http://www.w3.org/2000/svg" id="image-render"
       bind:this={svgEl}
       viewBox="0 0 1920 1080"
       style:background={backgroundGradientString}
       style:stroke-width={$strokeWidth}
  >
    <defs>
      <linearGradient id="fillGradient" x1={fillRotationValues.x1 + '%'} x2={fillRotationValues.x2 + '%'}
                      y1={fillRotationValues.y1 + '%'} y2={fillRotationValues.y2 + '%'}
                      gradientUnits="userSpaceOnUse">
        {#each $fillGradient.colors as color, i}
          <stop offset={calcStopOffsetFill(i)} stop-color={color} stop-opacity={$fillGradient.opacity}/>
        {/each}
      </linearGradient>
      <linearGradient id="strokeGradient" x1={strokeRotationValues.x1 + '%'} x2={strokeRotationValues.x2 + '%'}
                      y1={strokeRotationValues.y1 + '%'} y2={strokeRotationValues.y2 + '%'}
                      gradientUnits="userSpaceOnUse">
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
          scale={$scale}
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
    <g filter="url(#f1) url(#f2) url(#f3)" stroke="url(#strokeGradient)" fill="url(#fillGradient)"
       stroke-dasharray={$gap}>{@html $texture}</g>
  </svg>
</div>

<svg bind:this={textOutputEl} xmlns="http://www.w3.org/2000/svg" width="500px" style="display: block"
     viewBox="0 0 1200 675.000002" height="300px">
  <!--  <rect x="0" y="0" width="100%" height="100%" fill="white"/>-->
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="500px"
        fill="#000">
    Hello World
  </text>

</svg>

<svelte:window on:mousedown={handleMouseDown}/>
<!--<svelte:body style:background-color={$backgroundColor}/>-->

<script lang="ts">
  import {controlStore} from "../stores/controlStore.ts";
  import {afterUpdate} from "svelte";

  const {
    texture,
    turbulence,
    scale,
    blur,
    threeD,
    strokeWidth,
    gap,
    backgroundGradientStore,
    fillGradientStore,
    strokeGradientStore,
  } = controlStore;

  const {gradient: backgroundGradient} = backgroundGradientStore;
  const {gradient: strokeGradient} = strokeGradientStore;
  const {gradient: fillGradient} = fillGradientStore;


  let svgEl: SVGSVGElement;
  let textOutputEl: SVGSVGElement;
  let viewportEl: HTMLDivElement;
  let svgHtml = '';


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
  let fillRotationValues = {x1: 0, x2: 0, y1: 100, y2: 100};

  let backgroundGradientString = '';
  $: {
    const radians = $strokeGradient.rotation * (Math.PI / 180);
    strokeRotationValues = {
      x1: 50 + Math.sin(radians) * 50,
      y1: 50 + Math.cos(radians) * 50,
      x2: 50 + Math.sin(radians + Math.PI) * 50,
      y2: 50 + Math.cos(radians + Math.PI) * 50,
    };
    fillRotationValues = {
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

  const calcStopOffset = (i: number) => {
    const length = $strokeGradient.colors.length;
    return length > 1 ? i / (length - 1) : 0;
  };

  const calcStopOffsetFill = (i: number) => {
    const length = $fillGradient.colors.length;
    return length > 1 ? i / (length - 1) : 0;
  };

  afterUpdate(() => {
    svgHtml = encodeURIComponent(textOutputEl?.outerHTML ?? '');
  });


</script>

<style>

  svg {
    width: 100%;
    height: 100%;
    /*position: fixed;*/
    /*left: 0;*/
    /*top: 0;*/
    /*right: 0;*/
    /*bottom: 0;*/
  }
</style>
