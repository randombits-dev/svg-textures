<ColorPicker/>
<br/>
<label for="opacity">Opacity</label>
<input name="opacity" type="range" min="0" max="1" step="0.01" bind:value={$strokeOpacity}>
<label for="stroke_width">Width</label>
<input name="stroke_width" type="range" min="1" max="10" step="1" bind:value={$strokeWidth}>
<script lang="ts">
  import ColorPicker from "../common/color-picker/ColorPickerPopover.svelte";
  import {createColorPickerStore} from "../../stores/colorPickerStore.ts";
  import {setContext} from "svelte";
  import {settingsStore} from "../../stores/settingsStore.ts";

  const {strokeColor, strokeOpacity, strokeWidth} = settingsStore;

  const store = createColorPickerStore($strokeColor);
  setContext('store', store);

  store.subscribe((value) => {
    strokeColor.set(value.hex);
  });
</script>
