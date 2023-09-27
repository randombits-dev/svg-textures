<!--<div bind:this={pickerEl}>Open picker</div>-->

<div>
    <HuePicker bind:selectedColor={selectedHue}/>
    <SLPicker bind:selectedV={selectedV} bind:selectedS={selectedS} selectedHue={selectedHue}/>
    <div class="output">
        <input type="text" class="output-hex" bind:value={hexValue}/>
        <div class="output-sample" style:background-color={hexValue}></div>
    </div>
</div>

<script lang="ts">
    import HuePicker from "./HuePicker.svelte";
    import SLPicker from "./SLPicker.svelte";
    import {hex2hsv} from "../../utils/color-utils.js";

    let selectedHue = 0;
    let selectedV = 0.5;
    let selectedS = 0.5;
    let hexValue = "#ff0000";

    // $:hexValue = hsv2hex(selectedHue, selectedS, selectedV);

    $:{
        const [newHue, newS, newV] = hex2hsv(hexValue);
        if (newHue !== selectedHue) selectedHue = newHue / 360;
        if (newS !== selectedS) selectedS = newS;
        if (newV !== selectedV) selectedV = newV;
    }

</script>

<style>

    .output {
        display: flex;
    }

    .output-hex {
        width: 50%;
    }

    .output-sample {
        height: 20px;
        width: 50%;
        background-color: red;
    }
</style>
