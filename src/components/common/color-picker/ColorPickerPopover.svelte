<div class="color-picker">
    <HuePicker/>
    <SLPicker/>
</div>

<script lang="ts">
  import SLPicker from "./SVPicker.svelte";
  import HuePicker from "./HuePicker.svelte";
  import {setContext} from "svelte";

  export let store;
  setContext('store', store);

</script>

<style>
    .color-picker {
        width: 150px;
    }
</style>
