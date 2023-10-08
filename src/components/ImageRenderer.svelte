<div class="image-output">
    <svg viewBox="0 0 1000 500"
         style:--svg-background-color={$backgroundColor}
         style:--svg-fill-color={$fillColor}
         style:--svg-fill-opacity={$fillOpacity}
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
</div>


<script lang="ts">
  import {settingsStore} from "../stores/settingsStore.ts";
  import {textureStore} from "../stores/textureStore.ts";

  const {
    turbulence,
    turbulenceScale,
    blur,
    dropShadowX,
    dropShadowY,
    dropShadowBlur,
    backgroundColor,
    fillColor,
    fillOpacity
  } = settingsStore;

</script>

<style>
    .image-output {
        border: 1px solid #333;
    }

    svg {
        width: 100%;
        height: 500px;
        /*fill: #000 !important;*/
        /*fill-opacity: 0.3;*/
        background-color: var(--svg-background-color);
        fill: var(--svg-fill-color);
        fill-opacity: var(--svg-fill-opacity);
    }
</style>
