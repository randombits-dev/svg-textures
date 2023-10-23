<!--<label for="type">Style</label>-->
<!--<select bind:value={$feature} on:change={regenerate}>-->
<!--    <option value="circles">Style A</option>-->
<!--    <option value="blobs">Style B</option>-->
<!--    <option value="squiggle">Style C</option>-->
<!--</select>-->

<button on:click={regenerate}><span class="fa-solid fa-arrows-rotate"/> Regenerate</button>


<label for="density">Density</label>
<input name="density" type="range" min="0.01" max="1" step="0.01" bind:value={$density} on:mouseup={regenerate}>
<!--<pre class="status">Value: {$turbulence}</pre>-->

<label for="size">Size</label>
<input name="size" type="range" min="10" max="40" step="1" bind:value={$size} on:mouseup={regenerate}>
<!--<pre class="status">Value: {$turbulenceScale}</pre>-->
<label for="turbulence">Chaos</label>
<input name="turbulence" type="range" min="0.02" max="0.08" step="0.005" bind:value={$turbulence}>
<!--<pre class="status">Value: {$turbulence}</pre>-->

<label>Background Color</label>
<GradientColor store={backgroundGradientStore}/>


<label>Fill Color</label>

<GradientColor store={fillGradientStore}/>


<script lang="ts">
  import GradientColor from "../common/color-picker/GradientColor.svelte";
  import {organicSettingsStore} from "../../stores/organicSettingsStore.ts";

  const {feature, turbulence, density, size, fillGradientStore, backgroundGradientStore} = organicSettingsStore;

  turbulence.set(0.05);
  size.set(15);
  density.set(0.8);
  feature.set('circles');

  organicSettingsStore.regenerate();

  const regenerate = () => {
    organicSettingsStore.regenerate();
  };

</script>
