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
    import HuePicker from "./HuePicker.svelte";
    import {getContext, onDestroy} from "svelte";

    const store = getContext('store') as any;
    let hexValue: string;

    const unsubscribe = store.subscribe((value) => {
        hexValue = value.hex;
    });
    onDestroy(() => {
        unsubscribe();
    });

    const handleHexChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        store.setHex(target.value);
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
