<div class="container">
  <div class="viewport">
    <PatternRenderer/>

  </div>

  <!--    <div class="controls controls-top">-->
  <!--        <ButtonBarButton on:click={regen}><span class="fa-solid fa-arrows-rotate"/></ButtonBarButton>-->
  <!--    </div>-->

  <div class="controls controls-bottom">
    <div class="btn-group">
      <div class="btn-group-title">Copy →</div>
      <CopyButton on:click={copySvg}>SVG</CopyButton>
      <CopyButton on:click={copyPng}>PNG</CopyButton>
      <CopyButton on:click={copyWebp}>Webp</CopyButton>
    </div>

    <div class="btn-group">
      <div class="btn-group-title">Save →</div>
      <button on:click={saveSvg}>SVG</button>
      <button on:click={savePng}>PNG</button>
      <button on:click={saveWebp}>Webp</button>
      {#if import.meta.env.DEV}
        <button on:click={saveWebpThumbnail}>Thumb</button>
      {/if}
    </div>
  </div>

  <div class="controls controls-left scrollable">
    <PatternControls/>
  </div>

  <div class="controls controls-right scrollable">
    <PatternPresets/>
  </div>
</div>
<!--<svelte:window on:resize={handleWindowResize} on:mousedown={handleMouseDown}/>-->
<!--<svelte:body style:background-color={$backgroundColor}/>-->

<script lang="ts">

  import {copyClipboard, copyWebpToClipboard, downloadPNG, downloadSVG, downloadWebp} from "@/utils/saveImage.ts";
  import CopyButton from "@/components/common/CopyButton.svelte";
  import PatternRenderer from "./PatternRenderer.svelte";
  import PatternControls from "./PatternControls.svelte";
  import PatternPresets from "./PatternPresets.svelte";


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

  const copyWebp = () => {
    copyWebpToClipboard(getSVGContent());
  };

  const saveWebp = () => {
    downloadWebp(getSVGContent());
  };

  const saveWebpThumbnail = () => {
    downloadWebp(getSVGContent(), 300, 300 * 9 / 16);
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
    position: fixed;
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
  }


</style>
