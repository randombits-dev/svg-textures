<ColorPicker/>
<br/>
<label for="opacity">Opacity</label>
<input name="opacity" type="range" min="0" max="1" step="0.01" bind:value={$fillOpacity}>

<script lang="ts">
  import ColorPicker from "../common/color-picker/ColorPicker.svelte";
  import {createColorPickerStore} from "../../stores/colorPickerStore.ts";
  import {setContext} from "svelte";
  import {settingsStore} from "../../stores/settingsStore.ts";

  const {fillColor, fillOpacity} = settingsStore;

  const store = createColorPickerStore($fillColor);
  setContext('store', store);

  store.subscribe((value) => {
    fillColor.set(value.hex);
  });
</script>
