<script lang="ts">
  import TurbulenceSlider from "./controls/TurbulenceSlider.svelte";
  import TextureSelect from "./controls/TextureSelect.svelte";
  import BlurSlider from "./controls/BlurSlider.svelte";
  import ShadowSlider from "./controls/ShadowSlider.svelte";
  import Accordion from "./common/Accordion.svelte";
  import FillColorPicker from "./controls/FillColor.svelte";
  import BlobSlider from "./controls/BasicControls.svelte";
  import StrokeColorPicker from "./controls/StrokeColor.svelte";
  import {textureStore} from "../stores/textureStore.ts";
  import BackgroundColor from "./controls/BackgroundColor.svelte";

  const {feature} = textureStore;
</script>

<div class="control-container">

    <Accordion title="General">
        {#if $feature === 'texture'}
            <TextureSelect/>
        {/if}
        <BlobSlider/>
    </Accordion>
    <Accordion title="Background">
        <BackgroundColor/>
    </Accordion>
    <Accordion title="Fill">
        <FillColorPicker/>
    </Accordion>
    <Accordion title="Stroke">
        <StrokeColorPicker/>
    </Accordion>
    <Accordion title="Turbulence">
        <TurbulenceSlider/>
    </Accordion>
    <Accordion title="Blur">
        <BlurSlider/>
    </Accordion>
    <Accordion title="Drop Shadow">
        <ShadowSlider/>
    </Accordion>
</div>

<style>
    .control-container {
        width: 200px;
        flex: 0 0 auto;
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: var(--foreground-color) var(--background-2);
    }

    .control-container::-webkit-scrollbar {
        width: 0.5rem;
    }

    .control-container::-webkit-scrollbar-track {
        background: var(--background-2);
        border-radius: 10px;
    }

    .control-container::-webkit-scrollbar-thumb {
        background: var(--foreground-color);
        border-radius: 10px;
    }
</style>

