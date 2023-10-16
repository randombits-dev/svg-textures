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

    button:first-child {
        border-radius: 20px 0 0 20px;
    }

    button:last-child {
        border-radius: 0 20px 20px 0;
    }
</style>
