{#each linePresets as preset, i}
  <img src={`/lines/presets/${preset.id}.webp`} on:click={() => loadPreset(preset)}/>
{/each}

<script lang="ts">

  import {linePresets} from "./line-presets.ts";
  import {lineStore} from "./lineStore.ts";

  const loadPreset = (preset) => {
    lineStore.deserialize(JSON.parse(JSON.stringify(preset)));
    lineStore.regenerate();
  };
</script>

<style>
  .container {
    /*background-color: var(--background-1);*/
    /*padding: 10px;*/
  }

  img {
    cursor: pointer;
    border-radius: 5px;
    margin: 3px 0;
    height: auto;
    width: 100%;
  }
</style>
