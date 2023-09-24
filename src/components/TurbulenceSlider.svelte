<input type="range" min="0" max="0.2" step="0.01" bind:value={$turbulence}>

<pre class="status">Value: {$turbulence}</pre>

<script lang="ts">
    import {settingsStore} from "../stores/settingsStore.ts";

    const {turbulence} = settingsStore;
</script>

