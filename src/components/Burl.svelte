<script lang="ts">
  import ControlContainer from "./ControlContainer.svelte";
  import Footer from "./layout/Footer.svelte";
  import BurlRenderer from "./burl/BurlRenderer.svelte";
</script>

<div class="wrapper">
    <div class="title">
        Organic Textures
    </div>
    <div class="flex">
        <BurlRenderer/>
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
