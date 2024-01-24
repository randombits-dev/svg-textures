<!--<canvas class="image-output" id="image-output" bind:this={canvasEl}></canvas> -->
<div class="image-container">

    <div class="image-output" id="image-output"></div>
</div>

<script>
  // import {onMount} from "svelte";
  //
  // let canvasEl;
  //
  // onMount(() => {
  //   const ctx = canvasEl.getContext('2d');
  //
  //   // create gradient
  //   const grd = ctx.createLinearGradient(0, 0, 200, 0);
  //   grd.addColorStop(0, "rgba(253, 70, 4, 0.93)");
  //   grd.addColorStop(1, "rgba(7, 177, 250, 0.27)");
  //   ctx.fillStyle = grd;
  //   ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
  //
  //   const image = new Image(400, 300);
  //   image.src = "noise-overlay.png";
  //
  //   image.onload = function () {
  //     ctx.drawImage(this, 0, 0, 400, 300);
  //   };
  // });

</script>

<style>
    .image-container {
        background-color: white;
    }

    .image-output {
        width: 100%;
        height: 100vh;
        /*background-size: 100% 100%;*/
        background-repeat: no-repeat;
        /*background-image: linear-gradient(rgba(253, 70, 4, 0.5), rgba(7, 177, 250, 0.27)), url("texture-tile-heavy.png");*/
        /*background-image: url("texture-tile-heavy.png");*/
        background: linear-gradient(rgba(253, 70, 4, 1), rgba(7, 177, 250, 1));
        /*mask-image: url("grit.png");*/
        /*filter: invert(100%);*/
        -webkit-mask-image: url("chaos1.png");
        -webkit-mask-size: contain;
        /*-webkit-mask-image: url("grit.png");*/
        /*filter: invert(100%);*/
    }
</style>
