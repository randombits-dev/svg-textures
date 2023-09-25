<label for="turbulence">Turbulence</label>
<input name="turbulence" type="range" min="0" max="0.1" step="0.005" bind:value={$turbulence}>
<!--<pre class="status">Value: {$turbulence}</pre>-->

<label for="turbulence_scale">Turbulence Scale</label>
<input name="turbulence_scale" type="range" min="0" max="100" step="1" bind:value={$turbulenceScale}>
<!--<pre class="status">Value: {$turbulenceScale}</pre>-->


<script lang="ts">
    import {settingsStore} from "../stores/settingsStore.ts";

    const {turbulence, turbulenceScale} = settingsStore;
</script>

