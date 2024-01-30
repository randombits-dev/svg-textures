<button on:click={regenerate}><i class="fa-solid fa-arrows-rotate"/> Regenerate</button>
<button on:click={regenRandom}><i class="fa-solid fa-dice"/> Random Settings</button>

<section>
  <label for="density">Density</label>
  <input name="density" type="range"
         min={staticRanges.density[0]} max={staticRanges.density[1]} step="0.01"
         bind:value={$density} on:mouseup={regenerate}>

  <!--    <label for="size">Size</label>-->
  <!--    <input name="size" type="range"-->
  <!--           min={staticRanges.size[0]} max={staticRanges.size[1]} step="1"-->
  <!--           bind:value={$size} on:mouseup={regenerate}>-->
  <label for="scale">Scale</label>
  <input name="scale" type="range"
         min="50" max="100" step="10"
         bind:value={$turbulenceScale}>

  <label for="turbulence">Chaos</label>
  <input name="turbulence" type="range"
         min={staticRanges.turbulance[0]} max={staticRanges.turbulance[1]} step="0.005"
         bind:value={$turbulence}>
</section>

<section>
  <label>Background Color</label>
  <GradientColor store={backgroundGradientStore}/>
</section>

<section>
  <label>Fill Color</label>
  <ColorPicker initialColor={$fillColor} on:change={(e) => fillColor.set(e.detail)}/>
</section>

<section>
  <label for="font-size">Font</label>
  <input name="font-size" type="number" bind:value={$fontSize}>
</section>


{#if import.meta.env.DEV}
  <button on:click={copySettings}><i class="fa-solid fa-copy"/> Copy Settings</button>
{/if}

<script lang="ts">
  import GradientColor from "@/components//common/color-picker/GradientColor.svelte";
  import {staticStore} from "./staticStore.ts";
  import {staticPresets} from "./static-presets.ts";
  import {staticRanges} from "./static-ranges.ts";
  import ColorPicker from "@/components//common/color-picker/ColorPicker.svelte";

  const {
    feature, turbulence,
    turbulenceScale, density, size,
    fillColor, backgroundGradientStore,
    fontSize
  } = staticStore;

  const setDefaultSettings = () => {
    turbulence.set(0.05);
    size.set(15);
    density.set(0.1);
    feature.set('circles');
    backgroundGradientStore.setOpacity(0);
    regenerate();
  };

  const regenerate = () => {
    staticStore.regenerate();
  };

  const regenRandom = () => {
    staticStore.regenerateRandom();
  };


  const hash = document.location.hash?.slice(1);
  if (hash) {
    const preset = staticPresets.find(p => p.id === hash);
    if (preset) {
      staticStore.deserialize(JSON.parse(JSON.stringify(preset)));
      regenerate();
    } else {
      setDefaultSettings();
    }
  } else {
    setDefaultSettings();
  }

  const copySettings = () => {
    void navigator.clipboard.writeText(staticStore.serialize());
  };

</script>

<style>
  section, button {
    background-color: var(--background-1);
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 10px;
  }

  button {
    width: 100%;
  }
</style>
