<ColorPicker/>

<script lang="ts">
  import {settingsStore} from "../../stores/settingsStore.ts";
  import {createColorPickerStore} from "../common/color-picker/colorPickerStore.ts";
  import {onMount, setContext} from "svelte";
  import ColorPicker from "../common/color-picker/ColorPicker.svelte";

  const {backgroundColor} = settingsStore;

  const store = createColorPickerStore($backgroundColor);
  setContext('store', store);

  onMount(() => {
    return store.subscribe((value) => {
      backgroundColor.set(value.hex);
    });
  });

</script>
