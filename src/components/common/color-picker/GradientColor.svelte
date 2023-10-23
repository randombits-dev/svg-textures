{#each $gradient.colors as color, i}
    <ColorPicker initialColor={color} index={i} gradientStore={store}/>
{/each}

<button on:click={() => addColor()}><span class="fa-solid fa-plus"/> Add Color</button>

{#if $gradient.colors.length > 1}
    <label for="rotation">Rotation</label>
    <div class="range-control">
        <input name="rotation" type="range" min="0" max="360" step="45" value={$gradient.rotation}
               on:change={handleChangeRotation}>
        <input type="text" value={$gradient.rotation} on:change={handleChangeRotation}/>
    </div>
{/if}


<script lang="ts">
  import ColorPicker from "./ColorPicker.svelte";

  export let store: any;

  const {gradient, addColor, setRotation} = store;

  const handleChangeRotation = (e) => {
    setRotation(Number(e.target.value));
  };
</script>

<style>
    button {
        margin: 10px 0;
    }
</style>
