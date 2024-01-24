<!--<label for="type">Style</label>-->
<!--<select bind:value={$feature} on:change={regenerate}>-->
<!--    <option value="circles">Style A</option>-->
<!--    <option value="blobs">Style B</option>-->
<!--    <option value="squiggle">Style C</option>-->
<!--</select>-->
<button on:click={regenerate}><i class="fa-solid fa-arrows-rotate"/> Regenerate</button>
<button on:click={regenRandom}><i class="fa-solid fa-dice"/> Random Settings</button>

<section>
  <label for="density">Density</label>
  <input name="density" type="range"
         min={organicRanges.density[0]} max={organicRanges.density[1]} step="0.01"
         bind:value={$density} on:mouseup={regenerate}>

  <!--    <label for="size">Size</label>-->
  <!--    <input name="size" type="range"-->
  <!--           min={organicRanges.size[0]} max={organicRanges.size[1]} step="1"-->
  <!--           bind:value={$size} on:mouseup={regenerate}>-->

  <label for="scale">Scale</label>
  <input name="scale" type="range"
         min={organicRanges.scale[0]} max={organicRanges.scale[1]} step="10"
         bind:value={$turbulenceScale}>

  <label for="turbulence">Chaos</label>
  <input name="turbulence" type="range"
         min={organicRanges.turbulance[0]} max={organicRanges.turbulance[1]} step="0.005"
         bind:value={$turbulence}>
</section>

<section>
  <label>Background Color</label>
  <GradientColor store={backgroundGradientStore}/>
</section>

<!--<pre class="status">Value: {$turbulence}</pre>-->

<section>
  <label>Fill Color</label>

  <GradientColor store={fillGradientStore}/>
</section>

<section>
  <label for="3d">3D Effect</label>
  <input name="3d" type="range" min="0" max="15" step="0.1" bind:value={$threeD}>
</section>

{#if import.meta.env.DEV}
  <button on:click={copySettings}><i class="fa-solid fa-copy"/> Copy Settings</button>
{/if}

<script lang="ts">
  import GradientColor from "@/components//common/color-picker/GradientColor.svelte";
  import {organicStore} from "./organicStore.ts";
  import {organicPresets} from "./organic-presets.ts";
  import {organicRanges} from "./organic-ranges.ts";

  const {feature, turbulence, turbulenceScale, density, size, threeD, fillGradientStore, backgroundGradientStore} = organicStore;

  const setDefaultSettings = () => {
    turbulence.set(0.05);
    size.set(30);
    density.set(0.8);
    threeD.set(5);
    feature.set('circles');
    regenerate();
  };

  const regenerate = () => {
    organicStore.regenerate();
  };

  const regenRandom = () => {
    organicStore.regenerateRandom();
  };


  const hash = document.location.hash?.slice(1);
  if (hash) {
    const preset = organicPresets.find(p => p.id === hash);
    if (preset) {
      organicStore.deserialize(JSON.parse(JSON.stringify(preset)));
      regenerate();
    } else {
      setDefaultSettings();
    }
  } else {
    setDefaultSettings();
  }

  const copySettings = () => {
    void navigator.clipboard.writeText(organicStore.serialize());
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
