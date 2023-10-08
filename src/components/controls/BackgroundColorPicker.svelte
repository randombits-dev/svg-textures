<ColorPicker/>

<script lang="ts">
  import ColorPicker from "../common/color-picker/ColorPicker.svelte";
  import {createColorPickerStore} from "../../stores/colorPickerStore.ts";
  import {setContext} from "svelte";
  import {settingsStore} from "../../stores/settingsStore.ts";

  const {backgroundColor} = settingsStore;

  const store = createColorPickerStore($backgroundColor);
  setContext('store', store);

  store.subscribe((value) => {
    backgroundColor.set(value.hex);
  });
</script>
