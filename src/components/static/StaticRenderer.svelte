<svg xmlns="http://www.w3.org/2000/svg" id="image-render"
     bind:this={svgEl}
     viewBox="0 0 1920 1080"
>
    <defs>
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
        <mask id="hole">
            <rect x="0" y="0" width="100%" height="100%" fill="white"/>
            <g filter="url(#f1)" fill="black">{@html $texture}</g>
        </mask>
    </defs>
    <rect fill="black" width="100%" height="100%" mask="url(#hole)"/>
</svg>

<div id="text-container" style:background={backgroundGradientString}>
    <div id="text-renderer" contenteditable="false"
         style:font-size={`${$fontSize}px`}
         style:color={$fillColor}
         style:-webkit-mask-image={`url("data:image/svg+xml, ${svgHtml}")`}>
        /test
    </div>
</div>


<!--<div id="text-renderer"-->
<!--     style:color="#7722a2"-->
<!--     style:width="100%"-->
<!--     style:height="300px"-->
<!--     style:-webkit-mask-image={`url("data:image/svg+xml, ${svgHtml}")`} style:background={$fillColor}>-->

<!--</div>-->

<svelte:window on:mousedown={handleMouseDown}/>
<svelte:body style:background-color={$backgroundColor}/>

<script lang="ts">


  import {staticStore} from "./staticStore.ts";
  import {hex2rgba} from "../../utils/color-utils.js";
  import {afterUpdate} from "svelte";

  const {
    texture,
    turbulence,
    turbulenceScale,
    fontSize,
    backgroundColor,
    fillColor,
    backgroundGradientStore
  } = staticStore;

  const {gradient: backgroundGradient} = backgroundGradientStore;


  let svgEl: SVGSVGElement;
  let viewportEl: HTMLDivElement;
  let svgHtml: string = '';


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

  let backgroundGradientString = '';
  $: {
    const length = $backgroundGradient.colors.length - 1;
    if (length > 0) {
      backgroundGradientString = `linear-gradient(${$backgroundGradient.rotation}deg, ${$backgroundGradient.colors.map((color, i) => `rgba(${hex2rgba(color, $backgroundGradient.opacity).join(',')}) ${i / length * 100}%`).join(', ')})`;
    } else {
      backgroundGradientString = `rgba(${hex2rgba($backgroundGradient.colors[0], $backgroundGradient.opacity).join(',')})`;
    }
    console.log(backgroundGradientString);
  }

  afterUpdate(() => {
    svgHtml = encodeURIComponent(svgEl?.outerHTML ?? '');
  });

</script>

<style>

    svg {
        width: 100%;
        height: 100%;
        display: none;
    }

    svg#image-render {
        border-radius: 10px;

    }

    #text-renderer {
        text-align: center;
        font-weight: 900;
    }
</style>
