<button on:click={regenerate}><i class="fa-solid fa-arrows-rotate"/> Regenerate</button>
<button on:click={regenRandom}><i class="fa-solid fa-dice"/> Random Settings</button>

<section>
  <label>Feature</label>
  <select bind:value={$feature} on:change={changeFeature}>
    <option value="circles">Circles</option>
    <option value="lines">Lines</option>
    <!--    <option value="straight">Straight</option>-->
    <!--    <option value="curves">Curves</option>-->
    <option value="waves">Waves</option>
    <option value="solar">Solar</option>
    <option value="chaos">Chaos</option>
  </select>
</section>

<section>
  {#if controls.density}
    <label for="density">Density</label>
    <input name="density" type="range"
           min={controls.density[0]} max={controls.density[1]} step="0.01"
           bind:value={$density} on:mouseup={regenerate}>
  {/if}

  {#if controls.size}
    <label for="size">Size</label>
    <input name="size" type="range"
           min={controls.size[0]} max={controls.size[1]} step="1"
           bind:value={$size} on:mouseup={regenerate}>
  {/if}

  {#if controls.sizeVariation}
    <label for="sizeVariation">Size Variation</label>
    <input name="sizeVariation" type="range"
           min={controls.sizeVariation[0]} max={controls.sizeVariation[1]} step="0.1"
           bind:value={$sizeVariation} on:mouseup={regenerate}>
  {/if}

  {#if controls.separation}
    <label for="separation">Placement Randomness</label>
    <input name="separation" type="range"
           min={controls.separation[0]} max={controls.separation[1]} step="0.05"
           bind:value={$separation} on:mouseup={regenerate}>
  {/if}

</section>

{#if controls.backgroundGradient}
  <section>
    <label>Background Color</label>
    <GradientColor store={backgroundGradientStore} opacity={false}/>
  </section>
{/if}

{#if controls.fillGradient}
  <section>
    <label>Fill Color</label>
    <GradientColor store={fillGradientStore}/>
  </section>
{/if}

{#if controls.strokeGradient}
  <section>
    <label>Stroke Color</label>
    <GradientColor store={strokeGradientStore}/>
    {#if controls.stroke}
      <label for="stroke">Stroke Width</label>
      <input name="stroke" type="range" value={$strokeWidth}
             min={controls.stroke[0]} max={controls.stroke[1]} step="1"
             on:mouseup={(e) => strokeWidth.set(e.target.value)}>
    {/if}
    {#if controls.gap}
      <label for="gap">Gap</label>
      <input name="gap" type="range"
             min={controls.gap[0]} max={controls.gap[1]} step="1" bind:value={$gap}>
    {/if}
  </section>
{/if}

<section>
  {#if controls.threeD}
    <label for="3d">3D Effect</label>
    <input name="3d" type="range" min={controls.threeD[0]} max={controls.threeD[1]} step="0.1" bind:value={$threeD}>
  {/if}
  {#if controls.turbulance}
    <label for="turbulence">Chaos</label>
    <input name="turbulence" type="range"
           min={controls.turbulance[0]} max={controls.turbulance[1]} step="0.005"
           bind:value={$turbulence}>
  {/if}
  {#if controls.scale}
    <label for="scale">Chaos Scale</label>
    <input name="scale" type="range"
           min={controls.scale[0]} max={controls.scale[1]} step="0.005"
           bind:value={$scale}>
  {/if}
  {#if controls.blur}
    <label for="blur">Blur</label>
    <input name="blur" type="range" min={controls.blur[0]} max={controls.blur[1]} step="1" bind:value={$blur}>
  {/if}
</section>

{#if import.meta.env.DEV}
  <button on:click={copySettings}><i class="fa-solid fa-copy"/> Copy Settings</button>
{/if}

<script lang="ts">
  import GradientColor from "@/components/common/color-picker/GradientColor.svelte";
  import {controlStore} from "../stores/controlStore.ts";
  import {randomDecimalBetweenRandomToggle, randomGradient, randomIntBetweenRandomToggle} from "@/utils/random.ts";

  export let controls = {};
  console.log(controls);

  const {
    feature,
    scale,
    turbulence,
    density,
    blur,
    threeD,
    strokeWidth,
    gap,
    size,
    backgroundGradientStore,
    strokeGradientStore,
    fillGradientStore,
    separation,
    sizeVariation
  } = controlStore;

  const setDefaultSettings = () => {
    density.set(0.5);
    regenerate();
  };

  const changeFeature = () => {
    controlStore.regenerate();
  };

  const regenerate = () => {
    controlStore.regenerate();
  };

  const regenRandom = () => {
    console.log(controls);
    // feature.set(randomElement(['circles', 'blobs']));
    turbulence.set(randomDecimalBetweenRandomToggle(controls.turbulance));
    scale.set(randomIntBetweenRandomToggle(controls.scale));
    blur.set(randomIntBetweenRandomToggle(controls.blur));
    threeD.set(randomIntBetweenRandomToggle(controls.threeD));
    density.set(randomIntBetweenRandomToggle(controls.density));
    size.set(randomIntBetweenRandomToggle(controls.size));
    sizeVariation.set(randomDecimalBetweenRandomToggle(controls.sizeVariation));
    separation.set(randomDecimalBetweenRandomToggle(controls.separation));
    strokeWidth.set(randomIntBetweenRandomToggle(controls.stroke));
    // backgroundGradientStore.set(randomBackground());
    if (controls.fillGradient) fillGradientStore.set(randomGradient());
    if (controls.strokeGradient) strokeGradientStore.set(randomGradient());
    regenerate();
  };


  // const hash = document.location.hash?.slice(1);
  // if (hash) {
  //   const preset = linePresets.find(p => p.id === hash);
  //   if (preset) {
  //     controlStore.deserialize(JSON.parse(JSON.stringify(preset)));
  //     regenerate();
  //   } else {
  //     setDefaultSettings();
  //   }
  // } else {
  //   setDefaultSettings();
  // }

  const copySettings = () => {
    void navigator.clipboard.writeText(controlStore.serialize());
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
