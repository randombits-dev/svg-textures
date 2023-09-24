<script>
    let count = 0;

    $: {
        console.log(`The count is ${count}`);
    }
    const increment = () => {
        count += 1;
    };
</script>

<div>Hello World {count}</div>
<button on:click={increment}>Increment</button>
