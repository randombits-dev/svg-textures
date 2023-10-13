<script lang="ts">


  import {textureStore} from "../stores/textureStore.ts";

  const FEATURES = [
    {
      label: 'Circles',
      value: 'circles',
      img: '/circles.svg'
    },
    {
      label: 'Lines',
      value: 'squiggle',
      img: '/squiggles.svg'
    }, {
      label: 'Blobs',
      value: 'blobs',
      img: '/squiggles.svg'
    }, {
      label: 'Texture',
      value: 'texture',
      img: '/1.svg'
    }];

  let selectedFeature;
  const handleFeatureClick = (feature) => {
    textureStore.changeFeature(feature.value);
    selectedFeature = feature.value;
  };
</script>

<div class="control-container">
    {#each FEATURES as feature}
        <button class="control-button"
                on:click={() => handleFeatureClick(feature)}
                style:background-image={`url(${feature.img})`}
                class:active={selectedFeature === feature.value}>
            {feature.label}
        </button>
    {/each}
    <br/>
    <br/>
    <div>More coming soon...</div>
</div>

<style>
    .control-container {
        text-align: center;
        width: 200px;
        flex: 0 0 auto;
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: var(--foreground-color) var(--background-2);
    }

    .control-container::-webkit-scrollbar {
        width: 0.5rem;
    }

    .control-container::-webkit-scrollbar-track {
        background: var(--background-2);
        border-radius: 10px;
    }

    .control-container::-webkit-scrollbar-thumb {
        background: var(--foreground-color);
        border-radius: 10px;
    }

    button {
        margin: 5px auto;
        width: 140px;
        height: 140px;
        border: none;
        /*background: none;*/
        background-position: center;
        color: white;
        font-size: 1rem;
        font-weight: 600;
        text-align: left;
        padding-left: 1rem;
        cursor: pointer;
        border-radius: 10px;
    }

    button.active {
        border: 2px solid white;
    }
</style>

