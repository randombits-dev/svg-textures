<div class="image-output">
    <svg xmlns="http://www.w3.org/2000/svg" id="image-render"
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

            <filter id='noiseFilter'>
                <feTurbulence
                        type='fractalNoise'
                        baseFrequency='0.5'
                        numOctaves='2'
                        stitchTiles='stitch'/>
            </filter>
        </defs>
        <g filter="url(#f1) url(#f2) url(#f3)">{@html $textureStore}</g>


        <!--        <rect width='100%' height='100%' fill="red"/>-->
        <!--        <rect width='100%' height='100%' filter='url(#noiseFilter)'/>-->
        <!--    <use xlink:href={`/${settings?.texture}#main`} filter="url(#f1) url(#f2)"/>-->
    </svg>

    <SaveButton on:click={saveSvg}>Save SVG</SaveButton>
    <SaveButton on:click={copySvg}>Copy SVG</SaveButton>
    <SaveButton on:click={savePng}>Save PNG</SaveButton>
    <SaveButton on:click={copyPng}>Copy PNG</SaveButton>

    <div id="canvas"></div>
</div>


<script lang="ts">
  import {settingsStore} from "../stores/settingsStore.ts";
  import {textureStore} from "../stores/textureStore.ts";
  import {copyClipboard, downloadPNG, downloadSVG} from "../utils/saveImage.ts";
  import SaveButton from "./common/SaveButton.svelte";

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

  const getSVGContent = () => {
    return new XMLSerializer().serializeToString(document.getElementById('image-render'));
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

</script>

<style>
    .image-output {
        text-align: center;
        flex: 1 1 auto;
        align-self: center;
        /*border: 1px solid #333;*/
    }

    svg {
        border-radius: 30px;
        /*max-height: 99vh;*/
        width: 1000px;
        /*width: 1000px;*/
        height: 800px;
        object-fit: cover;
        /*width: 100%;*/
        /*height: 500px;*/
        /*fill: #000 !important;*/
        /*fill-opacity: 0.3;*/
        /*background-color: var(--svg-background-color);*/
        /*fill: var(--svg-fill-color);*/
        /*fill-opacity: var(--svg-fill-opacity);*/
        /*stroke: var(--svg-stroke-color);*/
        /*stroke-opacity: var(--svg-stroke-opacity);*/
    }
</style>
