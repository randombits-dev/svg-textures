<div class="container">
    <button class="preview" style:background-color={$store.hex}
            use:sveltePopper={{comp: ColorPickerPopover, props: {store}}}></button>

    <input type="text" value={hexValue} on:input={handleHexChange}>
</div>

<script lang="ts">
  import {sveltePopper} from "../../../actions/createPopper.ts";
  import {getContext, onDestroy} from "svelte";
  import ColorPickerPopover from "./ColorPickerPopover.svelte";

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
    .container {
        display: flex;
    }

    .preview {
        width: 25px;
        height: 25px;
        border-radius: 5px;
        flex: 0 0 auto;
        cursor: pointer;
    }

    input {
        width: 100%;
        flex: 1 1 auto;
        margin-left: 15px;
    }
</style>
