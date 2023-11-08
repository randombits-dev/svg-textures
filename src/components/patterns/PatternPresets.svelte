{#each patternPresets as preset, i}
    <img src={`/patterns/presets/${preset.id}.webp`} on:click={() => loadPreset(preset)}/>
{/each}

<script lang="ts">

  import {patternPresets} from "./pattern-presets.ts";
  import {patternsStore} from "../../stores/patternsStore.ts";

  const loadPreset = (preset) => {
    patternsStore.deserialize(JSON.parse(JSON.stringify(preset)));
    patternsStore.regenerate();
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
