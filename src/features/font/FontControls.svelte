<!--<label for="type">Style</label>-->
<!--<select bind:value={$feature} on:change={regenerate}>-->
<!--    <option value="circles">Style A</option>-->
<!--    <option value="blobs">Style B</option>-->
<!--    <option value="squiggle">Style C</option>-->
<!--</select>-->
<button on:click={regenerate}>
  <i class="fa-solid fa-arrows-rotate"/>
  Regenerate
</button>
<button on:click={regenRandom}>
  <i class="fa-solid fa-dice"/>
  Random Settings
</button>

<section>
  <label>Text</label>
  <textarea rows="3" bind:value={$textContent}></textarea>
  <label for="weight">Weight</label>
  <select name="weight" bind:value={$weight}>
    <option value="normal">Normal</option>
    <option value="bold">Bold</option>
  </select>
  <label for="font">Font</label>
  <select name="font" value={$font} on:change={changeFont}>
    {#each fontList as font}
      <option>{font}</option>
      {/each}
  </select>
  <label for="texture">Texture</label>
  <input name="texture" type="number" bind:value={$bg}>
</section>

<section>
  <label>Background Color</label>
  <GradientColor store={backgroundGradientStore} opacity={false}/>
</section>

<!--<pre class="status">Value: {$turbulence}</pre>-->

<section>
  <label>Stroke Color</label>
  <GradientColor store={strokeGradientStore}/>
  <label for="stroke">Stroke Width</label>
  <input name="stroke" type="range"
         min={fontRanges.stroke[0]} max={fontRanges.stroke[1]} step="1"
         on:mouseup={(e) => strokeWidth.set(e.target.value)}>
</section>

<section>
  <label for="3d">3D Effect</label>
  <input name="3d" type="range" min="0" max="15" step="0.1" bind:value={$threeD}>

  <label for="turbulence">Chaos</label>
  <input name="turbulence" type="range"
         min={fontRanges.turbulance[0]} max={fontRanges.turbulance[1]} step="0.005"
         bind:value={$turbulence}>

  <label for="blur">Blur</label>
  <input name="blur" type="range" min={fontRanges.blur[0]} max={fontRanges.blur[1]} step="1" bind:value={$blur}>
</section>

{#if import.meta.env.DEV}
  <button on:click={copySettings}>
    <i class="fa-solid fa-copy"/>
    Copy Settings
  </button>
  {/if}

<script lang="ts">
  import GradientColor from "@/components/common/color-picker/GradientColor.svelte";
  import {fontStore} from "./fontStore.ts";
  import {fontPresets} from "./font-presets.ts";
  import {fontRanges} from "./font-ranges.ts";
  import fontList from "../../data/fonts.json";
  import * as WebFont from "webfontloader";

  const {
    turbulence,
    density,
    blur,
    threeD,
    strokeWidth,
    backgroundGradientStore,
    strokeGradientStore,
    textContent,
    size,
    font,
    weight,
    bg
  } = fontStore;

  const changeFont = (e) => {
    const newFont = e.target.value;
    WebFont.load({
      google: {
        families: [newFont]
      },
      active: () => {
        font.set(newFont);
        // regenerate();
      }
    });
  };

  const setDefaultSettings = () => {
    density.set(0.5);
    regenerate();
  };

  const regenerate = () => {
    fontStore.regenerate();
  };

  const regenRandom = () => {
    fontStore.regenerateRandom();
  };


  const hash = document.location.hash?.slice(1);
  if (hash) {
    const preset = fontPresets.find(p => p.id === hash);
    if (preset) {
      fontStore.deserialize(JSON.parse(JSON.stringify(preset)));
      regenerate();
    } else {
      setDefaultSettings();
    }
  } else {
    setDefaultSettings();
  }

  const copySettings = () => {
    void navigator.clipboard.writeText(fontStore.serialize());
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
