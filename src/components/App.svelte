<script lang="ts">
  import ControlContainer from "./ControlContainer.svelte";
  import ImageRenderer from "./ImageRenderer.svelte";
</script>

<div class="flex">
    <ControlContainer/>
    <ImageRenderer/>

</div>

<style>
    .flex {
        display: flex;
        height: 100vh;
    }
</style>
