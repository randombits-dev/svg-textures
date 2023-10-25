<div class="container">
    <div class="viewport">
        <OrganicRenderer/>

    </div>

    <!--    <div class="controls controls-top">-->
    <!--        <ButtonBarButton on:click={regen}><span class="fa-solid fa-arrows-rotate"/></ButtonBarButton>-->
    <!--    </div>-->

    <div class="controls controls-bottom">
        <ButtonBarButton on:click={saveSvg}>Save SVG</ButtonBarButton>
        <ButtonBarButton on:click={copySvg}>Copy SVG</ButtonBarButton>
        <ButtonBarButton on:click={savePng}>Save PNG</ButtonBarButton>
        <ButtonBarButton on:click={copyPng}>Copy PNG</ButtonBarButton>
        <ButtonBarButton on:click={saveWebp}>Save Webp</ButtonBarButton>
        <ButtonBarButton on:click={copySettings}>Copy Settings</ButtonBarButton>
    </div>

    <div class="controls controls-left">
        <BurlControls/>
    </div>

    <div class="controls controls-right">
        <OrganicPresets/>
    </div>
</div>
<!--<svelte:window on:resize={handleWindowResize} on:mousedown={handleMouseDown}/>-->
<!--<svelte:body style:background-color={$backgroundColor}/>-->

<script lang="ts">


  import {copyClipboard, downloadPNG, downloadSVG, downloadWebp} from "../../utils/saveImage.ts";
  import ButtonBarButton from "../common/ButtonBarButton.svelte";
  import BurlControls from "./OrganicControls.svelte";
  import OrganicRenderer from "./OrganicRenderer.svelte";
  import {organicSettingsStore} from "../../stores/organicSettingsStore.ts";
  import OrganicPresets from "./OrganicPresets.svelte";


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

  const copyWebp = () => {
    copyClipboard(getSVGContent());
  };

  const saveWebp = () => {
    downloadWebp(getSVGContent(), 300, 300 * 9 / 16);
  };

  const copySvg = () => {
    void navigator.clipboard.writeText(getSVGContent());
  };

  const copySettings = () => {
    void navigator.clipboard.writeText(organicSettingsStore.serialize());
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
        background-color: var(--background-2);
    }

    .viewport {
        position: absolute;
        top: 0;
        left: 280px;
        right: 280px;
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
        /*background-color: var(--background-1);*/
        /*position: fixed;*/
        /*justify-content: center;*/
        /*align-items: center;*/
        left: 20px;
        top: 20px;
        bottom: 20px;
        width: 200px;
        overflow-y: auto;

        scrollbar-width: thin;
        scrollbar-color: var(--foreground-color) var(--background-2);
    }

    .controls-right {
        position: fixed;
        right: 20px;
        top: 20px;
        bottom: 20px;
        width: 200px;
        overflow-y: auto;

        scrollbar-width: thin;
        scrollbar-color: var(--foreground-color) var(--background-2);
    }


    .controls-left::-webkit-scrollbar {
        width: 0.5rem;
    }

    .controls-left::-webkit-scrollbar-track {
        background: var(--background-2);
        border-radius: 10px;
    }

    .controls-left::-webkit-scrollbar-thumb {
        background: var(--foreground-color);
        border-radius: 10px;
    }
</style>
