<svg xmlns="http://www.w3.org/2000/svg" id="image-render"
     bind:this={svgEl}
     viewBox="0 0 1920 1080"
     style:background={backgroundGradientString}
>
    <defs>
        <linearGradient id="fillGradient" x1={fillRotationValues.x1 + '%'} x2={fillRotationValues.x2 + '%'}
                        y1={fillRotationValues.y1 + '%'} y2={fillRotationValues.y2 + '%'}
                        gradientUnits="userSpaceOnUse">
            {#each $fillGradient.colors as color, i}
                <stop offset={i/($fillGradient.colors.length-1)} stop-color={color} stop-opacity={1}/>
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
                    scale={$turbulenceScale}
                    xChannelSelector="R"
                    yChannelSelector="G"/>
        </filter>
        <filter id="f2" x="0" y="0">
            <feGaussianBlur in="SourceGraphic" stdDeviation={$blur}/>
        </filter>
        <filter id="f3" x="0" y="0">
            <feDropShadow dx={$dropShadowX} dy={$dropShadowY} stdDeviation={$dropShadowBlur}/>
        </filter>
    </defs>
    <g filter="url(#f1) url(#f2) url(#f3)" fill="url(#fillGradient)">{@html $texture}</g>
</svg>

<svelte:window on:mousedown={handleMouseDown}/>
<svelte:body style:background-color={$backgroundColor}/>

<script lang="ts">


  import {organicSettingsStore} from "../../stores/organicSettingsStore.ts";

  const {
    texture,
    turbulence,
    turbulenceScale,
    blur,
    dropShadowX,
    dropShadowY,
    dropShadowBlur,
    backgroundColor,
    fillGradientStore,
    backgroundGradientStore
  } = organicSettingsStore;

  const {gradient: fillGradient} = fillGradientStore;
  const {gradient: backgroundGradient} = backgroundGradientStore;


  let svgEl: SVGSVGElement;
  let viewportEl: HTMLDivElement;


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

  let fillRotationValues = {x1: 0, x2: 0, y1: 100, y2: 100};
  let backgroundGradientString = '';
  $: {
    const radians = $fillGradient.rotation * (Math.PI / 180);
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

</script>

<style>

    svg {
        width: 100%;
        height: 100%;
    }

    svg#image-render {
        /*mask: url(#svg-mask);*/
        /*clip-path: inset(650px 0px 0px 520px);*/
        /*clip-path: url(#svg-clip);*/
    }
</style>
