<ColorPicker/>

<script lang="ts">
    import ColorPicker from "../common/color-picker/ColorPicker.svelte";
    import {createColorPickerStore} from "../../stores/colorPickerStore.ts";
    import {setContext} from "svelte";
    import {settingsStore} from "../../stores/settingsStore.ts";

    const {fillColor} = settingsStore;

    const store = createColorPickerStore();
    setContext('store', store);

    store.subscribe((value) => {
        fillColor.set(value.hex);
    });
</script>
