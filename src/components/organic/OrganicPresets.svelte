{#each organicPresets as preset, i}
    <img src={`/chaos/presets/${preset.id}.webp`} on:click={() => loadPreset(preset)}/>
{/each}

<script lang="ts">

  import {organicPresets} from "./presets/organic-presets.ts";
  import {organicSettingsStore} from "../../stores/organicSettingsStore.ts";

  const loadPreset = (preset) => {
    organicSettingsStore.deserialize(JSON.parse(JSON.stringify(preset)));
    organicSettingsStore.regenerate();
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
