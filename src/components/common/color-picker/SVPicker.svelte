<div class="color-select" bind:this={selectEl} on:mousedown={handleMouseDown}>
    <div class="color-circle" bind:this={circleEl}></div>
</div>

<script lang="ts">
  import {hsv2hex} from "../../../utils/color-utils.ts";
  import {getContext, onMount} from "svelte";

  let selectEl: HTMLDivElement;
  let circleEl: HTMLDivElement;
  const store = getContext('store') as any;
  let box: DOMRect;

  onMount(() => {
    return store.subscribe((value) => {
      circleEl.style.top = ((1 - value.v) * selectEl.clientHeight) + 'px';
      circleEl.style.left = (value.s * selectEl.clientWidth) + 'px';
      selectEl.style.backgroundColor = hsv2hex(value.h, 1, 1);
    });
  });

  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    box = selectEl.getBoundingClientRect();
    handleMouseMove(e);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const y = Math.max(0, Math.min(selectEl.clientHeight, e.clientY - box.top));
    const x = Math.max(0, Math.min(selectEl.clientWidth, e.clientX - box.left));
    store.setSV(x / selectEl.clientWidth, 1 - y / selectEl.clientHeight);
  };

  const handleMouseUp = (e: MouseEvent) => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

</script>

<style>
    .color-select {
        position: relative;
        width: 100%;
        height: 100px;
        background-image: linear-gradient(#ffffff00, #000000ff),
        linear-gradient(0.25turn, #ffffffff, #00000000);
    }

    .color-circle {
        position: absolute;
        z-index: 1;
        display: block;
        width: 12px;
        height: 12px;
        transform: translate(-50%, -50%);

        border: 3px solid white;
        border-radius: 100%;
    }
</style>
