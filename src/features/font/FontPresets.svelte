{#each fontPresets as preset, i}
  <img src={`/lines/presets/${preset.id}.webp`} on:click={() => loadPreset(preset)}/>
  {/each}

<script lang="ts">

  import {fontPresets} from "./font-presets.ts";
  import {fontStore} from "./fontStore.ts";

  const loadPreset = (preset) => {
    fontStore.deserialize(JSON.parse(JSON.stringify(preset)));
    fontStore.regenerate();
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
