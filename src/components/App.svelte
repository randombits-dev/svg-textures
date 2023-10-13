<script lang="ts">
  import ControlContainer from "./ControlContainer.svelte";
  import ImageRenderer from "./ImageRenderer.svelte";
  import FeatureSelection from "./FeatureSelection.svelte";
  import Footer from "./layout/Footer.svelte";
</script>

<div class="wrapper">
    <div class="title">
        SVG Textures
    </div>
    <div class="flex">
        <FeatureSelection/>
        <ImageRenderer/>
        <ControlContainer/>
    </div>
    <Footer/>
</div>

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    .flex {
        display: flex;
        flex: 1 1 auto;
    }

    .title {
        text-align: center;
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 1rem;
    }
</style>
