{#each items as item}
    <div class="menu-item" on:click={() => handleClick(item)}>
        {item.label}
    </div>
{/each}

<script>
  export let items;

  export const handleClick = (item) => {
    item.action();
  };

</script>

<style>
    .menu-item {
        padding: 10px;
        cursor: pointer;
    }

    .menu-item:hover {
        background-color: var(--background-2);
    }
</style>
