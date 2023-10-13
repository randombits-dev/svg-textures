<label for="density">Density</label>
<input name="density" type="range" min="0.01" max="1" step="0.01" bind:value={$blobDensity}>
<!--<pre class="status">Value: {$turbulence}</pre>-->

<label for="size">Size</label>
<input name="size" type="range" min="5" max="100" step="1" bind:value={$blobSize}>
<!--<pre class="status">Value: {$turbulenceScale}</pre>-->


<script lang="ts">
  import {settingsStore} from "../../stores/settingsStore.ts";

  const {blobDensity, blobSize} = settingsStore;

</script>

