<svg viewBox="0 0 1000 500">
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
                    scale="50"
                    xChannelSelector="R"
                    yChannelSelector="G"/>
        </filter>
    </defs>
    <g filter="url(#f1)">{@html $textureStore}</g>
    <!--    <use xlink:href={`/${settings?.texture}#main`} filter="url(#f1) url(#f2)"/>-->
</svg>

<script lang="ts">
    import {textureStore} from "../stores/textureStore.ts";
    import {settingsStore} from "../stores/settingsStore.ts";

    const {turbulence} = settingsStore;
</script>

<style>
    svg {
        width: 100%;
        height: 500px;
        fill: #000 !important;
        fill-opacity: 0.3;
    }
</style>
