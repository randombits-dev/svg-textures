<svg xmlns="http://www.w3.org/2000/svg" id="image-render"
     bind:this={svgEl}
     viewBox="0 0 1920 1080"
>
  <defs>
    <filter id="f1" x="0" y="0">
      <feTurbulence
        type="fractalNoise"
        baseFrequency={$turbulence}
        numOctaves="2"
        result="turbulence"/>
      <feDisplacementMap
        in2="turbulence"
        in="SourceGraphic"
        scale={$turbulenceScale}
        xChannelSelector="R"
        yChannelSelector="G"/>
    </filter>
    <mask id="hole">
      <rect x="0" y="0" width="100%" height="100%" fill="white"/>
      <g filter="url(#f1)" fill="black">{@html $texture}</g>
    </mask>
    <mask id="hole2">
      <rect fill="black" width="100%" height="100%" mask="url(#hole)"/>
    </mask>
  </defs>
  <rect fill="black" width="100%" height="100%" mask="url(#hole)"/>

  <!--  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="500px" stroke="#fff"-->
  <!--        fill="#fff" mask="url(#hole)">-->
  <!--    /test-->
  <!--  </text>-->
</svg>

<!--<canvas id="canvas-output"></canvas>-->

<div id="text-container" style:background={backgroundGradientString}>
  <div id="text-renderer" contenteditable="false"
       style:color={$fillColor}
       style:-webkit-mask-image={`url("data:image/svg+xml, ${svgHtml}")`}>
    <svg xmlns="http://www.w3.org/2000/svg" width="500px" style="display: block"
         viewBox="0 0 1200 675.000002" height="300px">
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="500px" stroke="#fff"
            fill="#fff">
        /test
      </text>
    </svg>

  </div>
</div>


<!--<div id="text-renderer"-->
<!--     style:color="#7722a2"-->
<!--     style:width="100%"-->
<!--     style:height="300px"-->
<!--     style:-webkit-mask-image={`url("data:image/svg+xml, ${svgHtml}")`} style:background={$fillColor}>-->

<!--</div>-->

<svelte:window on:mousedown={handleMouseDown}/>
<svelte:body style:background-color={$backgroundColor}/>

<script lang="ts">


  import {staticStore} from "./staticStore.ts";
  import {afterUpdate} from "svelte";
  import {hex2rgba} from "@/utils/color-utils.ts";
  import {get} from "svelte/store";

  const {
    texture,
    turbulence,
    turbulenceScale,
    fontSize,
    backgroundColor,
    fillColor,
    backgroundGradientStore
  } = staticStore;

  const {gradient: backgroundGradient} = backgroundGradientStore;


  let svgEl: SVGSVGElement;
  let viewportEl: HTMLDivElement;
  let svgHtml: string = '';


  let svgX = -200;
  let svgY = -200;
  const handleMouseDown = (e: MouseEvent) => {
    if (e.target !== viewportEl) return;
    const startX = e.clientX;
    const startY = e.clientY;
    const startSvgX = svgX;
    const startSvgY = svgY;

    const handleMouseMove = (e: MouseEvent) => {
      svgX = e.clientX - startX + startSvgX;
      svgY = e.clientY - startY + startSvgY;
      svgEl.style.left = `${svgX}px`;
      svgEl.style.top = `${svgY}px`;
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  let backgroundGradientString = '';
  $: {
    console.log(get(texture));
    const length = $backgroundGradient.colors.length - 1;
    if (length > 0) {
      backgroundGradientString = `linear-gradient(${$backgroundGradient.rotation}deg, ${$backgroundGradient.colors.map((color, i) => `rgba(${hex2rgba(color, $backgroundGradient.opacity).join(',')}) ${i / length * 100}%`).join(', ')})`;
    } else {
      backgroundGradientString = `rgba(${hex2rgba($backgroundGradient.colors[0], $backgroundGradient.opacity).join(',')})`;
    }
    console.log(backgroundGradientString);
  }

  afterUpdate(() => {
    svgHtml = encodeURIComponent(svgEl?.outerHTML ?? '');

    // const canvas = document.getElementById('canvas-output') as HTMLCanvasElement;
    // const ctx = canvas.getContext('2d')!;
    //
    // const img = new Image();
    // img.onload = () => {
    //
    //   const textImg = new Image();
    //   textImg.onload = () => {
    //     // ctx.imageSmoothingEnabled = false;
    //
    //     var hRatio = canvas.width / img.width;
    //     var vRatio = canvas.height / img.height;
    //     var ratio = Math.min(hRatio, vRatio);
    //
    //     ctx.drawImage(textImg, 0, 0, canvas.width, canvas.height);
    //     ctx.globalCompositeOperation = 'source-in';
    //     ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width * ratio, img.height * ratio);
    //     ctx.fillStyle = 'white';
    //     ctx.fillRect(0, 0, canvas.width, canvas.height);
    //   };
    //   // textImg.src = '/test.png';
    //   textImg.src = '/test.svg';
    //   // textImg.src = `data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" zoomAndPan="magnify" viewBox="0 0 1200 675.000002" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><g/></defs><g fill="#ffffff" fill-opacity="1"><g transform="translate(50.683581, 516.734422)"><g><path d="M 168.949219 -359.46875 C 163.558594 -359.46875 160.414062 -357.222656 158.613281 -352.277344 L 14.378906 25.164062 C 12.132812 31.453125 14.828125 35.496094 21.566406 35.496094 L 63.804688 35.496094 C 69.199219 35.496094 72.34375 33.25 74.140625 28.308594 L 217.925781 -349.132812 C 220.171875 -355.421875 217.476562 -359.46875 210.738281 -359.46875 Z M 168.949219 -359.46875 "/></g></g></g><g fill="#000000" fill-opacity="1"><g transform="translate(287.032997, 516.734422)"><g><path d="M 186.023438 -314.535156 C 190.96875 -314.535156 193.214844 -311.839844 193.214844 -307.34375 L 193.214844 -262.410156 C 193.214844 -257.917969 190.96875 -255.222656 186.023438 -255.222656 L 133.902344 -255.222656 L 133.902344 -7.1875 C 133.902344 -2.246094 131.65625 0 126.710938 0 L 79.980469 0 C 75.488281 0 72.792969 -2.246094 72.792969 -7.1875 L 72.792969 -255.222656 L 20.667969 -255.222656 C 16.175781 -255.222656 13.480469 -257.917969 13.480469 -262.410156 L 13.480469 -307.34375 C 13.480469 -311.839844 16.175781 -314.535156 20.667969 -314.535156 Z M 186.023438 -314.535156 "/></g></g></g><g fill="#000000" fill-opacity="1"><g transform="translate(493.726454, 516.734422)"><g><path d="M 201.75 -307.34375 C 201.75 -311.839844 199.953125 -314.535156 194.5625 -314.535156 L 29.207031 -314.535156 C 25.164062 -314.535156 22.464844 -311.839844 22.464844 -307.34375 L 22.464844 -7.1875 C 22.464844 -2.695312 25.164062 0 29.207031 0 L 194.5625 0 C 199.953125 0 201.75 -2.695312 201.75 -7.1875 L 201.75 -52.121094 C 201.75 -57.066406 199.953125 -59.3125 194.5625 -59.3125 L 83.578125 -59.3125 L 83.578125 -125.8125 L 168.050781 -125.8125 C 172.542969 -125.8125 175.242188 -128.507812 175.242188 -133.453125 L 175.242188 -177.9375 C 175.242188 -182.878906 172.542969 -185.574219 168.050781 -185.574219 L 83.578125 -185.574219 L 83.578125 -254.773438 L 194.5625 -254.773438 C 199.953125 -254.773438 201.75 -257.917969 201.75 -262.410156 Z M 201.75 -307.34375 "/></g></g></g><g fill="#000000" fill-opacity="1"><g transform="translate(717.943881, 516.734422)"><g><path d="M 87.171875 -314.535156 C 45.382812 -314.535156 22.464844 -292.066406 22.464844 -249.828125 L 22.464844 -172.09375 C 22.464844 -163.558594 26.511719 -158.164062 34.597656 -155.46875 L 142.4375 -120.421875 L 142.4375 -75.039062 C 142.4375 -62.90625 136.148438 -57.066406 124.464844 -57.066406 L 100.203125 -57.066406 C 88.96875 -57.066406 82.226562 -62.90625 82.226562 -75.039062 L 82.226562 -93.910156 C 82.226562 -98.855469 79.980469 -101.101562 75.039062 -101.101562 L 29.65625 -101.101562 C 25.164062 -101.101562 22.464844 -98.855469 22.464844 -93.910156 L 22.464844 -64.703125 C 22.464844 -22.464844 45.382812 0 87.171875 0 L 137.496094 0 C 179.734375 0 202.199219 -22.464844 202.199219 -64.703125 L 202.199219 -149.179688 C 202.199219 -157.714844 198.15625 -163.109375 190.519531 -165.804688 L 81.777344 -200.851562 L 81.777344 -239.046875 C 81.777344 -250.730469 88.519531 -257.019531 99.753906 -257.019531 L 124.464844 -257.019531 C 136.597656 -257.019531 142.4375 -250.730469 142.4375 -239.046875 L 142.4375 -220.171875 C 142.4375 -215.679688 145.136719 -212.984375 149.628906 -212.984375 L 195.011719 -212.984375 C 199.953125 -212.984375 202.199219 -215.679688 202.199219 -220.171875 L 202.199219 -249.828125 C 202.199219 -292.066406 179.734375 -314.535156 137.496094 -314.535156 Z M 87.171875 -314.535156 "/></g></g></g><g fill="#000000" fill-opacity="1"><g transform="translate(942.61062, 516.734422)"><g><path d="M 186.023438 -314.535156 C 190.96875 -314.535156 193.214844 -311.839844 193.214844 -307.34375 L 193.214844 -262.410156 C 193.214844 -257.917969 190.96875 -255.222656 186.023438 -255.222656 L 133.902344 -255.222656 L 133.902344 -7.1875 C 133.902344 -2.246094 131.65625 0 126.710938 0 L 79.980469 0 C 75.488281 0 72.792969 -2.246094 72.792969 -7.1875 L 72.792969 -255.222656 L 20.667969 -255.222656 C 16.175781 -255.222656 13.480469 -257.917969 13.480469 -262.410156 L 13.480469 -307.34375 C 13.480469 -311.839844 16.175781 -314.535156 20.667969 -314.535156 Z M 186.023438 -314.535156 "/></g></g></g></svg>`;
    // };
    // img.src = `data:image/svg+xml, ${svgHtml}`;
  });

</script>

<style>

  svg {
    width: 100%;
    height: 100%;
    /*display: none;*/
  }

  svg#image-render {
    border-radius: 10px;

  }

  #text-container {
    width: 100%;
    aspect-ratio: 16/9;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #text-renderer {
    text-align: center;
    font-weight: 900;
    font-size: 20cqw;
  }

  /*#canvas-output {*/
  /*    width: 100%;*/
  /*    height: 300px;*/
  /*}*/
</style>
