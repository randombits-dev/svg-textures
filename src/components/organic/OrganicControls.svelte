<!--<label for="type">Style</label>-->
<!--<select bind:value={$feature} on:change={regenerate}>-->
<!--    <option value="circles">Style A</option>-->
<!--    <option value="blobs">Style B</option>-->
<!--    <option value="squiggle">Style C</option>-->
<!--</select>-->
<button on:click={regenerate}><span class="fa-solid fa-arrows-rotate"/> Regenerate</button>

<section>
    <label for="density">Density</label>
    <input name="density" type="range" min="0.01" max="1" step="0.01" bind:value={$density} on:mouseup={regenerate}>
    <!--<pre class="status">Value: {$turbulence}</pre>-->

    <label for="size">Size</label>
    <input name="size" type="range" min="10" max="40" step="1" bind:value={$size} on:mouseup={regenerate}>
    <!--<pre class="status">Value: {$turbulenceScale}</pre>-->
    <label for="turbulence">Chaos</label>
    <input name="turbulence" type="range" min="0.02" max="0.08" step="0.005" bind:value={$turbulence}>
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


<script lang="ts">
  import GradientColor from "../common/color-picker/GradientColor.svelte";
  import {organicSettingsStore} from "../../stores/organicSettingsStore.ts";
  import {organicPresets} from "./presets/organic-presets.ts";

  const {feature, turbulence, density, size, fillGradientStore, backgroundGradientStore} = organicSettingsStore;

  const setDefaultSettings = () => {
    turbulence.set(0.05);
    size.set(15);
    density.set(0.8);
    feature.set('circles');
    regenerate();
  };

  const regenerate = () => {
    organicSettingsStore.regenerate();
  };


  const hash = Number(document.location.hash?.slice(1));
  console.log(hash);
  if (hash > 0) {
    const preset = organicPresets[hash - 1];
    if (preset) {
      organicSettingsStore.deserialize(JSON.parse(JSON.stringify(preset)));
      regenerate();
    } else {
      setDefaultSettings();
    }
  } else {
    setDefaultSettings();
  }


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
