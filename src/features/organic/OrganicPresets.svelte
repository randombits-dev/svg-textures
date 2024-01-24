{#each organicPresets as preset, i}
    <img src={`/chaos/presets/${preset.id}.webp`} on:click={() => loadPreset(preset)}/>
{/each}

<script lang="ts">

  import {organicPresets} from "./organic-presets.ts";
  import {organicStore} from "./organicStore.ts";

  const loadPreset = (preset) => {
    organicStore.deserialize(JSON.parse(JSON.stringify(preset)));
    organicStore.regenerate();
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
