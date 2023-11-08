<div class="container">
    <button class="preview" style:background-color={$store.hex}
            use:sveltePopper={{comp: ColorPickerPopover, props: {store}}}></button>

    <input type="text" value={hexValue} on:input={handleHexChange}>
    {#if showTrash}
        <button on:click={removeColor}><span class="fa-solid fa-trash"></span></button>

    {/if}
</div>

<script lang="ts">
  import {sveltePopper} from "../../../actions/createPopper.ts";
  import {createEventDispatcher, onDestroy, setContext} from "svelte";
  import ColorPickerPopover from "./ColorPickerPopover.svelte";
  import type {ColorValue} from "./colorPickerStore.ts";
  import {createColorPickerStore} from "./colorPickerStore.ts";

  export let initialColor: string;
  export let showTrash: boolean;


  const dispatch = createEventDispatcher();

  const store = createColorPickerStore();
  setContext('store', store);

  let hexValue: string;

  const unsubscribe = store.subscribe((value: ColorValue) => {
    hexValue = value.hex;
    dispatch('change', value.hex);
    // modifyColor(index, value.hex);
  });
  onDestroy(() => {
    unsubscribe();
  });

  const handleHexChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    store.setHex(target.value);
  };

  const removeColor = () => {
    dispatch('remove');
  };

  $: {
    store.setHex(initialColor);
  }

</script>

<style>
    .container {
        display: flex;
        margin-top: 10px;
    }

    .preview {
        width: 25px;
        height: 25px;
        border-radius: 5px;
        flex: 0 0 auto;
        cursor: pointer;
        border: 1px solid var(--border-color);
    }

    input {
        flex: 1 1 auto;
        margin-left: 15px;
    }

    button:last-child {
        margin-left: 10px;
    }
</style>
