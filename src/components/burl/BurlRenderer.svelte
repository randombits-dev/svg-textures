<div class="container">
    <div class="viewport" bind:this={viewportEl}>
        <svg xmlns="http://www.w3.org/2000/svg" id="image-render"
             bind:this={svgEl}
             viewBox="0 0 1920 1080"
             style:background-color={$backgroundColor}
             style:stroke={$strokeColor}
             style:stroke-opacity={$strokeOpacity}
             style:stroke-width={$strokeWidth}
        >
            <defs>
                <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color={$fillColor} stop-opacity={$fillOpacity}/>
                    <stop offset="100%" stop-color={$fillColor2} stop-opacity={$fillOpacity2}/>
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
            <g filter="url(#f1) url(#f2) url(#f3)" fill="url(#linear)">{@html $textureStore}</g>
        </svg>
    </div>
    <div style:left={`${viewport[0]}px`}
         style:top={`${viewport[1]}px`}
         style:width={`${viewport[2]}px`}
         style:height={`${viewport[3]}px`}/>

    <!--    <div class="viewport-block-left"></div>-->
    <!--    <div class="viewport-block-left"></div>-->

    <div class="controls controls-top">
        <ButtonBarButton on:click={regen}>Generate (same settings)</ButtonBarButton>
        <ButtonBarButton on:click={randomize}>Randomize Settings</ButtonBarButton>
    </div>

    <div class="controls controls-bottom">
        <ButtonBarButton on:click={saveSvg}>Save SVG</ButtonBarButton>
        <ButtonBarButton on:click={copySvg}>Copy SVG</ButtonBarButton>
        <ButtonBarButton on:click={savePng}>Save PNG</ButtonBarButton>
        <ButtonBarButton on:click={copyPng}>Copy PNG</ButtonBarButton>
    </div>

    <div class="controls controls-left">

        <BurlControls/>
    </div>
</div>
<svelte:window on:resize={handleWindowResize} on:mousedown={handleMouseDown}/>
<svelte:body style:background-color={$backgroundColor}/>

<script lang="ts">


  import {copyClipboard, downloadPNG, downloadSVG} from "../../utils/saveImage.ts";
  import {settingsStore} from "../../stores/settingsStore.ts";
  import {textureStore} from "../../stores/textureStore.ts";
  import ButtonBarButton from "../common/ButtonBarButton.svelte";
  import BurlControls from "./BurlControls.svelte";

  const {
    turbulence,
    turbulenceScale,
    blur,
    dropShadowX,
    dropShadowY,
    dropShadowBlur,
    backgroundColor,
    fillColor,
    fillColor2,
    fillOpacity,
    fillOpacity2,
    strokeColor,
    strokeOpacity,
    strokeWidth
  } = settingsStore;

  let svgEl: SVGSVGElement;
  let viewportEl: HTMLDivElement;
  let viewport = [200, 200, 400, 400];

  const getSVGContent = () => {
    return new XMLSerializer().serializeToString(document.getElementById('image-render'));
  };

  const regen = () => {
    textureStore.regenerate();
  };

  const randomize = () => {

  };

  const saveSvg = () => {
    downloadSVG(getSVGContent());
  };

  const savePng = () => {
    downloadPNG(getSVGContent());
  };

  const copyPng = () => {
    copyClipboard(getSVGContent());
  };

  const copySvg = () => {
    void navigator.clipboard.writeText(getSVGContent());
  };

  const handleWindowResize = () => {

  };

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


</script>

<style>
    .container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        justify-content: center;
        align-items: center;
        text-align: center;
        background-color: var(--background-2);
    }

    .viewport {
        position: absolute;
        top: 0;
        left: 320px;
        right: 100px;
        bottom: 0;
        margin: auto;
        /*position: fixed;*/
        /*border: 2px solid var(--border-color);*/
        aspect-ratio: 16 / 9;
        /*width: 80%;*/
        /*margin: 0 auto;*/
        /*mask: url(#image-render);*/
    }

    .viewport-block-left {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 320px;
        background-color: inherit;
    }

    .controls {
        position: relative;
    }

    .controls-top {
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 20px;
        left: 0;
        right: 0;
    }

    .controls-bottom {
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        bottom: 20px;
        left: 0;
        right: 0;
    }

    .controls-left {
        background-color: var(--background-1);
        position: fixed;
        justify-content: center;
        align-items: center;
        left: 20px;
        top: 20px;
        bottom: 20px;
        border-radius: 20px;
        padding: 10px;
        width: 200px;
    }

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
