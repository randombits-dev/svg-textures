<!--<label for="type">Style</label>-->
<!--<select bind:value={$feature} on:change={regenerate}>-->
<!--    <option value="circles">Style A</option>-->
<!--    <option value="blobs">Style B</option>-->
<!--    <option value="squiggle">Style C</option>-->
<!--</select>-->
<button on:click={regenerate}><i class="fa-solid fa-arrows-rotate"/> Regenerate</button>
<button on:click={regenRandom}><i class="fa-solid fa-dice"/> Random Settings</button>

<section>
  <label>Shape</label>
  <select bind:value={$feature} on:change={regenerate}>
    <option value="circles">Style A</option>
    <option value="blobs">Style B</option>
    <option value="squiggle">Style C</option>
  </select>
</section>

<section>
  <label for="density">Density</label>
  <input name="density" type="range"
         min={lineRanges.density[0]} max={lineRanges.density[1]} step="0.01"
         bind:value={$density} on:mouseup={regenerate}>

  <!--  <label for="size">Size</label>-->
  <!--  <input name="size" type="range"-->
  <!--         min={lineRanges.size[0]} max={lineRanges.size[1]} step="1"-->
  <!--         bind:value={$size} on:mouseup={regenerate}>-->

</section>

<section>
  <label>Background Color</label>
  <GradientColor store={backgroundGradientStore} opacity={false}/>
</section>

<!--<pre class="status">Value: {$turbulence}</pre>-->

<section>
  <label>Stroke Color</label>
  <GradientColor store={strokeGradientStore}/>
  <label for="stroke">Stroke Width</label>
  <input name="stroke" type="range"
         min={lineRanges.stroke[0]} max={lineRanges.stroke[1]} step="1"
         bind:value={$strokeWidth}>
</section>

<section>
  <label for="3d">3D Effect</label>
  <input name="3d" type="range" min="0" max="15" step="0.1" bind:value={$threeD}>

  <label for="turbulence">Chaos</label>
  <input name="turbulence" type="range"
         min={lineRanges.turbulance[0]} max={lineRanges.turbulance[1]} step="0.005"
         bind:value={$turbulence}>

  <label for="blur">Blur</label>
  <input name="blur" type="range" min={lineRanges.blur[0]} max={lineRanges.blur[1]} step="1" bind:value={$blur}>
</section>

{#if import.meta.env.DEV}
  <button on:click={copySettings}><i class="fa-solid fa-copy"/> Copy Settings</button>
{/if}

<script lang="ts">
  import GradientColor from "../common/color-picker/GradientColor.svelte";
  import {lineStore} from "./lineStore.ts";
  import {linePresets} from "./line-presets.ts";
  import {lineRanges} from "./line-ranges.ts";

  const {
    feature,
    turbulence,
    density,
    size,
    blur,
    threeD,
    strokeWidth,
    backgroundGradientStore,
    strokeGradientStore
  } = lineStore;

  const setDefaultSettings = () => {
    size.set(60);
    density.set(0.5);
    feature.set('squiggle');
    regenerate();
  };

  const regenerate = () => {
    lineStore.regenerate();
  };

  const regenRandom = () => {
    lineStore.regenerateRandom();
  };


  const hash = document.location.hash?.slice(1);
  if (hash) {
    const preset = linePresets.find(p => p.id === hash);
    if (preset) {
      lineStore.deserialize(JSON.parse(JSON.stringify(preset)));
      regenerate();
    } else {
      setDefaultSettings();
    }
  } else {
    setDefaultSettings();
  }

  const copySettings = () => {
    void navigator.clipboard.writeText(lineStore.serialize());
  };

</script>

<style>
  section, button {
    background-color: var(--background-1);
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 10px;
  }

  button {
    width: 100%;
  }
</style>
