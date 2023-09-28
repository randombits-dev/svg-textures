<div>
    <HuePicker/>
    <SLPicker/>
    <div class="output">
        <input type="text" class="output-hex" value={hexValue} on:input={handleHexChange}/>
        <div class="output-sample" style:background-color={hexValue}></div>
    </div>
</div>

<script lang="ts">
    import SLPicker from "./SVPicker.svelte";
    import {colorPickerStore} from "../../stores/colorPickerStore.ts";
    import HuePicker from "./HuePicker.svelte";
    import {onDestroy} from "svelte";
    import {settingsStore} from "../../stores/settingsStore.ts";

    const {backgroundColor} = settingsStore;

    let hexValue: string;

    const unsubscribe = colorPickerStore.subscribe((value) => {
        hexValue = value.hex;
        backgroundColor.set(value.hex);
    });
    onDestroy(() => {
        unsubscribe();
    });

    const handleHexChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        colorPickerStore.setHex(target.value);
    };

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
