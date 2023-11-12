{#each staticPresets as preset, i}
    <img src={`/static/presets/${preset.id}.webp`} on:click={() => loadPreset(preset)}/>
{/each}

<script lang="ts">

  import {staticPresets} from "./static-presets.ts";
  import {staticStore} from "./staticStore.ts";

  const loadPreset = (preset) => {
    staticStore.deserialize(JSON.parse(JSON.stringify(preset)));
    staticStore.regenerate();
  };
</script>

<style>
    img {
        cursor: pointer;
        border-radius: 5px;
        margin: 3px 0;
        height: auto;
        width: 100%;
    }
</style>
