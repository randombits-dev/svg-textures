<div class="container">
    <div class="viewport">
        <OrganicRenderer/>

    </div>

    <div class="controls controls-top">
        <ButtonBarButton on:click={regen}><span class="fa-solid fa-arrows-rotate"/></ButtonBarButton>
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
<!--<svelte:window on:resize={handleWindowResize} on:mousedown={handleMouseDown}/>-->
<!--<svelte:body style:background-color={$backgroundColor}/>-->

<script lang="ts">


  import {copyClipboard, downloadPNG, downloadSVG} from "../../utils/saveImage.ts";
  import ButtonBarButton from "../common/ButtonBarButton.svelte";
  import BurlControls from "./OrganicControls.svelte";
  import OrganicRenderer from "./OrganicRenderer.svelte";
  import {organicSettingsStore} from "../../stores/organicSettingsStore.ts";


  const getSVGContent = () => {
    return new XMLSerializer().serializeToString(document.getElementById('image-render'));
  };

  const regen = () => {
    organicSettingsStore.regenerate();
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
</style>
