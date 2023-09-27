<script lang="ts">
    import TurbulenceSlider from "./TurbulenceSlider.svelte";
    import TextureSelect from "./TextureSelect.svelte";
    import BlurSlider from "./BlurSlider.svelte";
    import ShadowSlider from "./ShadowSlider.svelte";
    import Accordion from "./Accordion.svelte";
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
    <ColorPicker/>
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

