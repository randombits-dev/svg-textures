<script lang="ts">
  import TurbulenceSlider from "./controls/TurbulenceSlider.svelte";
  import TextureSelect from "./controls/TextureSelect.svelte";
  import BlurSlider from "./controls/BlurSlider.svelte";
  import ShadowSlider from "./controls/ShadowSlider.svelte";
  import Accordion from "./common/Accordion.svelte";
  import BackgroundColorPicker from "./controls/BackgroundColorPicker.svelte";
  import FillColorPicker from "./controls/FillColorPicker.svelte";
  import BlobSlider from "./controls/BlobSlider.svelte";
  import StrokeColorPicker from "./controls/StrokeColorPicker.svelte";
  // import type {Settings} from "../model/settings.ts";

  // let textureValue: string;
  // export let settings: Settings = {};
  //
  // $: {
  //     settings.texture = textureValue;
  // }
</script>

<div class="control-container">

    <TextureSelect/>
    <Accordion title="Blob">
        <BlobSlider/>
    </Accordion>
    <Accordion title="Background">
        <BackgroundColorPicker/>
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

