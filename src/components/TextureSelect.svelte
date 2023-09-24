<select bind:value={value}>
    <option value="1.svg">One</option>
    <option value="2.svg">Two</option>
</select>

<script lang="ts">
    import {textureStore} from "../stores/textureStore.ts";

    export let value = '1.svg';

    const {changeTexture} = textureStore;

    $: {
        changeTexture(value);
    }
</script>
