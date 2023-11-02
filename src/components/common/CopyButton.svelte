<button on:click={handleClick}>
    <slot/>
</button>

<script>
  import {createEventDispatcher} from 'svelte';

  const dispatch = createEventDispatcher();

  function handleClick(e) {
    dispatch('click');
    const oldValue = e.target.innerHTML;
    e.target.innerHTML = '<span class="fa-solid fa-check"/>';
    setTimeout(() => {
      e.target.innerHTML = oldValue;
    }, 2000);
  }
</script>

<style>

</style>
