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
    <option value="dashed">Dashed</option>
  </select>
</section>

<section>
  <label for="density">Density</label>
  <input name="density" type="range"
         min={patternRanges.density[0]} max={patternRanges.density[1]} step="0.01"
         bind:value={$density} on:mouseup={regenerate}>

  <label for="size">Size</label>
  <input name="size" type="range"
         min={patternRanges.size[0]} max={patternRanges.size[1]} step="1"
         bind:value={$size} on:mouseup={regenerate}>

  <label for="sizeVariation">Size Variation</label>
  <input name="sizeVariation" type="range"
         min={patternRanges.sizeVariation[0]} max={patternRanges.sizeVariation[1]} step="0.1"
         bind:value={$sizeVariation} on:mouseup={regenerate}>

  <label for="separation">Placement Randomness</label>
  <input name="separation" type="range"
         min={patternRanges.separation[0]} max={patternRanges.separation[1]} step="0.05"
         bind:value={$separation} on:mouseup={regenerate}>

</section>

<section>
  <label>Background Color</label>
  <GradientColor store={backgroundGradientStore} opacity={false}/>
</section>

<!--<pre class="status">Value: {$turbulence}</pre>-->

<section>
  <label>Fill Color</label>
  <GradientColor store={fillGradientStore}/>
</section>

<section>
  <label>Stroke Color</label>
  <GradientColor store={strokeGradientStore}/>
  <label for="stroke">Stroke Width</label>
  <input name="stroke" type="range"
         min={patternRanges.stroke[0]} max={patternRanges.stroke[1]} step="1"
         bind:value={$strokeWidth}>
</section>

<section>
  <label for="3d">3D Effect</label>
  <input name="3d" type="range" min="0" max="15" step="0.1" bind:value={$threeD}>

  <label for="turbulence">Chaos</label>
  <input name="turbulence" type="range"
         min={patternRanges.turbulance[0]} max={patternRanges.turbulance[1]} step="0.005"
         bind:value={$turbulence}>

  <label for="blur">Blur</label>
  <input name="blur" type="range" min={patternRanges.blur[0]} max={patternRanges.blur[1]} step="1" bind:value={$blur}>
</section>

{#if import.meta.env.DEV}
  <button on:click={copySettings}><i class="fa-solid fa-copy"/> Copy Settings</button>
{/if}

<script lang="ts">
  import GradientColor from "@/components/common/color-picker/GradientColor.svelte";
  import {patternsStore} from "./patternsStore.ts";
  import {patternPresets} from "./pattern-presets.ts";
  import {patternRanges} from "./pattern-ranges.ts";

  const {
    feature,
    turbulence,
    density,
    size,
    sizeVariation,
    separation,
    blur,
    threeD,
    strokeWidth,
    fillGradientStore,
    backgroundGradientStore,
    strokeGradientStore
  } = patternsStore;

  const setDefaultSettings = () => {
    size.set(60);
    density.set(0.5);
    feature.set('circles');
    regenerate();
  };

  const regenerate = () => {
    patternsStore.regenerate();
  };

  const regenRandom = () => {
    patternsStore.regenerateRandom();
  };


  const hash = document.location.hash?.slice(1);
  if (hash) {
    const preset = patternPresets.find(p => p.id === hash);
    if (preset) {
      patternsStore.deserialize(JSON.parse(JSON.stringify(preset)));
      regenerate();
    } else {
      setDefaultSettings();
    }
  } else {
    setDefaultSettings();
  }

  const copySettings = () => {
    void navigator.clipboard.writeText(patternsStore.serialize());
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
