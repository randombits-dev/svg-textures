{#each $gradient.colors as color, i}
  <ColorPicker initialColor={color} showTrash={i > 0} on:change={(e) => modifyColor(i, e.detail)}
               on:remove={() => removeColor(i)}/>
  {/each}

<button on:click={() => addColor()}><span class="fa-solid fa-plus"/>&nbsp;&nbsp;&nbsp;Add Color
</button>

{#if opacity}
  <label for="rotation">Opacity</label>
  <div class="range-control">
    <input name="opacity" type="range" min="0" max="1" step="0.05" value={$gradient.opacity}
           on:change={handleChangeOpacity}>
  </div>
  {/if}

{#if $gradient.colors.length > 1}
  <label for="rotation">Rotation</label>
  <div class="range-control">
    <input name="rotation" type="range" min="0" max="360" step="45" value={$gradient.rotation}
           on:input={handleChangeRotation}>
    <input type="text" value={$gradient.rotation} on:change={handleChangeRotation}/>
  </div>
  {/if}


<script lang="ts">
  import ColorPicker from "./ColorPicker.svelte";

  export let store: any;
  export let opacity = true;

  const {gradient, addColor, modifyColor, removeColor, setRotation, setOpacity} = store;

  const handleChangeRotation = (e) => {
    setRotation(Number(e.target.value));
  };

  const handleChangeOpacity = (e) => {
    setOpacity(Number(e.target.value));
  };
</script>

<style>
  button {
    margin: 15px 0;
  }
</style>
