<script lang="ts">
    import TurbulenceSlider from "./controls/TurbulenceSlider.svelte";
    import TextureSelect from "./controls/TextureSelect.svelte";
    import BlurSlider from "./controls/BlurSlider.svelte";
    import ShadowSlider from "./controls/ShadowSlider.svelte";
    import Accordion from "./common/Accordion.svelte";
    import ColorPicker from "./color-picker/ColorPicker.svelte";
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
    <Accordion title="Background">
        <ColorPicker/>
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
    }
</style>

