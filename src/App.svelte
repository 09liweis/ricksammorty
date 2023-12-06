<script>
  import Movie from './Movie.svelte';
	export let name;
  const Categories = [
    {'tl':'In Theatre','nm':'in_theatre'},
    {'tl':'Comming','nm':'comming'},
    {'tl':'Chart','nm':'chart'}
  ];
  let movies = [];
  let loading = false;
  let currentCategory = Categories[0].nm;

  const sendRequest = async (url) => {
    const response = await fetch(url)
    return await response.json()
  }

  const fetchDog = async () => {
    return await sendRequest('https://dog.ceo/api/breeds/image/random')
  }

  const fetchMovie = async (category='in_theatre') => {
    if (loading) return;
    currentCategory = category;
    loading = true;
    const moviesResponse = await sendRequest(`https://samliweisen.onrender.com/api/movies/${category}`)//comming,in_theatre,chart
    movies = moviesResponse.movies;
    loading = false;
  }

  fetchMovie();
  
</script>

<main>
  <h1>Svelte Movies</h1>
  <!-- {#await fetchDog()}
    <p>...waiting</p>
  {:then data}
    <img src={data.message} alt="Dog image" />
  {:catch error}
    <p>An error occurred!</p>
  {/await} -->

  <section class="category_navs">
    {#each Categories as {tl,nm}}
    <span on:click={()=>fetchMovie(nm)} class={`category_nav ${currentCategory == nm ? 'active': ''}`}>{tl}</span>
    {/each}
  </section>

  {#if loading}
    <p>Loading Movies...</p>
  {:else}
    {#each movies as movie}
    <Movie movie={movie} />
    {/each}
  {/if}
  
</main>

<style>
	main {
		padding: 1em;
		max-width: 360px;
		margin: 0 auto;
	}

	h1 {
    text-align: center;
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 2em;
		font-weight: 100;
	}

  .category_nav {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
    color: #ff3e00;
    margin: 5px;
    cursor: pointer;
    transition: 0.3s;
  }

  .category_nav.active,.category_nav:hover {
    background-color: #ff3e00;
    color: #fff;
  }

	@media (min-width: 640px) {
		
	}
</style>