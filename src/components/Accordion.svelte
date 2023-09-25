<div class="accordion">
    <button class="accordion-header" on:click="{() => open = !open}">
        <span>{title}</span>
        <AngleIcon direction={open ? 'up' : 'down'}/>
    </button>
    {#if open}
        <div class="accordion-body">
            <slot></slot>
        </div>
    {/if}
</div>

<script lang="ts">
    import AngleIcon from "../icons/AngleIcon.svelte";

    let open = false;
    export let title: string = '';
</script>

<style>
    button {
        border: none;
        /*border-bottom: 1px solid var(--border-color);*/
        background-color: inherit;
        cursor: pointer;
        width: 100%;
        text-align: left;
        padding: 3px 10px;
    }

    button:hover {
        background-color: var(--background-2);
    }

    .accordion {
        /*border-top: 1px solid var(--border-color);*/
        border-bottom: 1px solid var(--border-color);
    }

    .accordion-header {
        padding: 10px 25px;
        text-transform: uppercase;
        font-size: 12px;
        display: flex;
        align-items: center;
    }

    .accordion-header span {
        flex-grow: 1;
    }

    .accordion-body {
        padding: 10px 25px;
    }

</style>
