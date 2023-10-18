<div class="color-range" bind:this={parentEl} on:mousedown={handleMouseDown}>
    <div class="color-range-circle" bind:this={circleEl}></div>
</div>

<script lang="ts">
  import {getContext, onMount} from "svelte";

  let circleEl: HTMLDivElement;
  let parentEl: HTMLDivElement;
  let box: DOMRect;

  const store = getContext('store') as any;

  onMount(() => {
    return store.subscribe(value => {
      circleEl.style.left = (value.h * parentEl.clientWidth) + 'px';
    });
  });

  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    box = parentEl.getBoundingClientRect();
    handleMouseMove(e);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const x = Math.max(0, Math.min(parentEl.clientWidth, e.clientX - box.left));
    store.setHue(x / parentEl.clientWidth);
  };

  const handleMouseUp = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

</script>

<style>
    .color-range {
        width: 100%;
        height: 15px;
        background: linear-gradient(0.25turn, #ff0000, #ffff00 17.2%, #ffff00 18.2%, #00ff00 33.3%, #00ffff 49.5%, #00ffff 51.5%,
        #0000ff 67.7%, #ff00ff 83.3%, #ff0000);
        position: relative;
        margin-bottom: 5px;
    }

    .color-range-circle {
        top: -2px;
        position: absolute;
        z-index: 1;
        display: block;
        width: 5px;
        height: 100%;
        transform: translate(-50%, 0);

        border: 2px solid black;
        background-color: white;
    }
</style>
