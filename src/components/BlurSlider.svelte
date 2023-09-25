<label for="blur">Blur</label>
<input name="blur" type="range" min="0" max="20" step="1" bind:value={$blur}>
<!--<pre class="status">Value: {$blur}</pre>-->

<!--<div>Turbulence Scale</div>-->
<!--<input type="range" min="0" max="100" step="1" bind:value={$turbulenceScale}>-->
<!--<pre class="status">Value: {$turbulenceScale}</pre>-->


<script lang="ts">
    import {settingsStore} from "../stores/settingsStore.ts";

    const {blur} = settingsStore;
</script>

