<script>
  import { onMount } from 'svelte';
  import {fetchGql} from '$lib/fetch.js';

  let title = "Rick and Morty Library";
  const updatTitle = () => {
    title = "Rick and Morty Done";
  }

  let characters = [];
  
  onMount(async() => {
		const charactersResp = await fetchGql();
    characters = charactersResp.results;
	});
  
  
</script>
<h1>Welcome to {title}</h1>
<button on:click={updatTitle}>Click</button>
<section class="flex flex-wrap">
{#each characters as c}
<article class="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-1">
  <img src={c.image} alt={c.name} class="rounded"/>
  <h2>{c.name}</h2>
  <p>{c.species} - {c.status}</p>
  <p>{c.location.name}</p>
</article>
{/each}
</section>