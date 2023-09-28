<label for="shadow_x">x offset</label>
<input name="shadow_x" type="range" min="0" max="20" step="1" bind:value={$dropShadowX}>
<!--<pre class="status">Value: {$dropShadowX}</pre>-->

<label for="shadow_y">y offset</label>
<input name="shadow_y" type="range" min="0" max="20" step="1" bind:value={$dropShadowY}>
<!--<pre class="status">Value: {$dropShadowY}</pre>-->

<label for="shadow_blur">Blur</label>
<input name="shadow_blur" type="range" min="0" max="20" step="1" bind:value={$dropShadowBlur}>
<!--<pre class="status">Value: {$dropShadowBlur}</pre>-->

<!--<div>Turbulence Scale</div>-->
<!--<input type="range" min="0" max="100" step="1" bind:value={$turbulenceScale}>-->
<!--<pre class="status">Value: {$turbulenceScale}</pre>-->


<script lang="ts">
    import {settingsStore} from "../../stores/settingsStore.ts";

    const {dropShadowX, dropShadowY, dropShadowBlur} = settingsStore;
</script>

