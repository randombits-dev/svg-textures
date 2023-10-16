<div class="container" style:background-color={$backgroundColor}>


    <svg xmlns="http://www.w3.org/2000/svg" id="image-render"
         bind:this={svgEl}
         style:background-color={$backgroundColor}
         style:fill={$fillColor}
         style:stroke={$strokeColor}
         style:fill-opacity={$fillOpacity}
         style:stroke-opacity={$strokeOpacity}
         style:stroke-width={$strokeWidth}
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
            <filter id="f2" x="0" y="0">
                <feGaussianBlur in="SourceGraphic" stdDeviation={$blur}/>
            </filter>
            <filter id="f3" x="0" y="0">
                <feDropShadow dx={$dropShadowX} dy={$dropShadowY} stdDeviation={$dropShadowBlur}/>
            </filter>
            <clipPath id="viewport">
                <rect x="400" y="400" width="500px" height="500px"/>
            </clipPath>
        </defs>
        <g filter="url(#f1) url(#f2) url(#f3)" clip-path="url(#viewport)">{@html $textureStore}</g>
    </svg>

    <div class="viewport" bind:this={viewportEl}></div>
    <div style:left={`${viewport[0]}px`}
         style:top={`${viewport[1]}px`}
         style:width={`${viewport[2]}px`}
         style:height={`${viewport[3]}px`}/>

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
        <BasicControls/>
        <BackgroundColorPicker/>
        <FillColorPicker/>
        <TurbulenceSlider/>
    </div>


    <div id="canvas"></div>

</div>
<svelte:window on:resize={handleWindowResize} on:mousedown={handleMouseDown}/>
<svelte:body style:background-color={$backgroundColor}/>

<script lang="ts">


  import {copyClipboard, downloadPNG, downloadSVG} from "../../utils/saveImage.ts";
  import {settingsStore} from "../../stores/settingsStore.ts";
  import {textureStore} from "../../stores/textureStore.ts";
  import ButtonBarButton from "../common/ButtonBarButton.svelte";
  import BasicControls from "../controls/BasicControls.svelte";
  import BackgroundColorPicker from "../controls/BackgroundColorPicker.svelte";
  import FillColorPicker from "../controls/FillColorPicker.svelte";
  import TurbulenceSlider from "../controls/TurbulenceSlider.svelte";

  const {
    turbulence,
    turbulenceScale,
    blur,
    dropShadowX,
    dropShadowY,
    dropShadowBlur,
    backgroundColor,
    fillColor,
    fillOpacity,
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
      svgX = Math.max(e.clientX - startX + startSvgX, -200);
      svgY = Math.max(e.clientY - startY + startSvgY, -200);
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
    }

    .viewport {
        position: absolute;
        top: 0;
        left: 320px;
        right: 100px;
        bottom: 0;
        margin: auto;
        /*position: fixed;*/
        border: 2px solid white;
        aspect-ratio: 16 / 9;
        /*width: 80%;*/
        /*margin: 0 auto;*/
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
        position: fixed;
        left: -200px;
        right: -200px;
        top: -200px;
        bottom: -200px;
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
</style>
