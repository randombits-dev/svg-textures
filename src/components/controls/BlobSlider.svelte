<label for="blob_density">Density</label>
<input name="blob_density" type="range" min="0.01" max="1" step="0.01" bind:value={$blobDensity}>
<!--<pre class="status">Value: {$turbulence}</pre>-->

<label for="blob_size">Size</label>
<input name="blob_size" type="range" min="5" max="100" step="1" bind:value={$blobSize}>
<!--<pre class="status">Value: {$turbulenceScale}</pre>-->

<button on:click={handleBlobGeneration}>Generate Blob</button>
<button on:click={handleCircleGeneration}>Generate Circle</button>
<button on:click={handleRectGeneration}>Generate Rect</button>
<button on:click={handleLineGeneration}>Generate Lines</button>


<script lang="ts">
  import {settingsStore} from "../../stores/settingsStore.ts";
  import {generateBlobs} from "../../utils/blob-gen.ts";
  import {textureStore} from "../../stores/textureStore.ts";
  import {generateCircles} from "../../utils/circle-gen.ts";
  import {generateRects} from "../../utils/rect-gen.ts";
  import {generateLines} from "../../utils/line-gen.ts";

  const {set} = textureStore;
  const {blobDensity, blobSize} = settingsStore;

  const handleBlobGeneration = () => {
    set(generateBlobs({density: $blobDensity, size: $blobSize, height: 500, width: 1000}).join(''));
  };

  const handleCircleGeneration = () => {
    set(generateCircles({density: $blobDensity, size: $blobSize, height: 500, width: 1000}).join(''));
  };

  const handleRectGeneration = () => {
    set(generateRects({density: $blobDensity, size: $blobSize, height: 500, width: 1000}).join(''));
  };

  const handleLineGeneration = () => {
    set(generateLines({density: $blobDensity, size: $blobSize, height: 500, width: 1000}).join(''));
  };
</script>

