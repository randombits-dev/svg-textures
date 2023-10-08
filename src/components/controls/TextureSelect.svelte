<ControlSection>
    <label for="texture">Texture</label>
    <select name="texture" bind:value={value}>
        <option value="1.svg">One</option>
        <option value="2.svg">Two</option>
    </select>
    <button on:click={generateBlob}>Generate</button>
</ControlSection>

<script lang="ts">
  import {textureStore} from "../../stores/textureStore.ts";
  import ControlSection from "./ControlSection.svelte";

  export let value = '1.svg';

  const {changeTexture, generateBlob} = textureStore;

  $: {
    changeTexture(value);
  }
</script>

<style>

    select {
        padding: 3px 10px;
        background-color: inherit;
        width: 100%;
        /*outline: none;*/
    }

    /*select:focus {*/
    /*    background-color: var(--background-2);*/
    /*}*/
</style>
