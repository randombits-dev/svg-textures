<button on:click>
    <slot/>
</button>

<style>
    button {
        padding: 10px 20px;
        font-size: 18px;
        border: none;
        background-color: var(--background-1);
    }

    button:hover {
        background-color: var(--background-2);
    }
</style>
