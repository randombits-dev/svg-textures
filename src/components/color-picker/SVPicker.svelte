<div class="color-select" bind:this={selectEl} on:mousedown={handleMouseDown} style:background-color={selectedHueHex}>
    <div class="color-circle" bind:this={circleEl}></div>
</div>

<script lang="ts">
    import {hsv2hex} from "../../utils/color-utils.ts";

    let selectEl: HTMLDivElement;
    let circleEl: HTMLDivElement;

    export let selectedV: number;
    export let selectedS: number;

    export let selectedHue: number;

    $:selectedHueHex = hsv2hex(selectedHue, 1, 1);

    $: {
        if (selectEl && circleEl) {
            circleEl.style.top = selectEl.clientHeight * (1 - selectedV) + 'px';
            circleEl.style.left = selectEl.clientWidth * selectedS + 'px';
        }
    }

    const handleMouseDown = (e: MouseEvent) => {
        e.preventDefault();
        handleMouseMove(e);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        const y = Math.max(0, Math.min(selectEl.clientHeight, e.clientY - selectEl.offsetTop));
        const x = Math.max(0, Math.min(selectEl.clientWidth, e.clientX - selectEl.offsetLeft));
        selectedS = x / selectEl.clientWidth;
        selectedV = 1 - y / selectEl.clientHeight;
        circleEl.style.top = y + 'px';
        circleEl.style.left = x + 'px';
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
        height: 200px;
        background-image: linear-gradient(#ffffff00, #000000ff),
        linear-gradient(0.25turn, #ffffffff, #00000000);
    }

    .color-circle {
        position: absolute;
        z-index: 1;
        display: block;
        width: 10px;
        height: 10px;
        transform: translate(-50%, -50%);

        border: 2px solid white;
        border-radius: 100%;
    }
</style>
