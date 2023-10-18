<label for="density">Density</label>
<input name="density" type="range" min="0.01" max="1" step="0.01" bind:value={$blobDensity} on:mouseup={handleMouseUp}>
<!--<pre class="status">Value: {$turbulence}</pre>-->

<label for="size">Size</label>
<input name="size" type="range" min="10" max="40" step="1" bind:value={$blobSize} on:mouseup={handleMouseUp}>
<!--<pre class="status">Value: {$turbulenceScale}</pre>-->
<label for="turbulence">Turbulence</label>
<input name="turbulence" type="range" min="0.02" max="0.08" step="0.005" bind:value={$turbulence}>
<!--<pre class="status">Value: {$turbulence}</pre>-->

<label>Background Color</label>
<BackgroundColor/>

<label>Fill Color</label>
<FillColor/>

<label>Fill Color 2</label>
<FillColor2/>


<script lang="ts">
  import {settingsStore} from "../../stores/settingsStore.ts";
  import {textureStore} from "../../stores/textureStore.ts";
  import BackgroundColor from "../controls/BackgroundColor.svelte";
  import FillColor from "../controls/FillColor.svelte";
  import FillColor2 from "../controls/FillColor2.svelte";

  const {turbulence, blobDensity, blobSize} = settingsStore;
  const {regenerate} = textureStore;

  turbulence.set(0.05);
  blobSize.set(15);
  blobDensity.set(0.8);

  const handleMouseUp = () => {
    regenerate();
  };

</script>
