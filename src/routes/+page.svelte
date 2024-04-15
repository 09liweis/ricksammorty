<script>
  let title = "Rick and Morty Library";
  const updatTitle = () => {
    title = "Rick and Morty Done";
  }
</script>
<h1>Welcome to {title}</h1>
<button on:click={updatTitle}>Click</button>
