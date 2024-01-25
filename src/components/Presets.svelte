{#each presets as preset, i}
  <img src={`/${path}/presets/${preset.id}.webp`} on:click={() => loadPreset(preset)}/>
{/each}

<script lang="ts">

  import {controlStore} from "../stores/controlStore.ts";

  export let presets;
  export let path;

  const loadPreset = (preset) => {
    controlStore.deserialize(JSON.parse(JSON.stringify(preset)));
    controlStore.regenerate();
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
