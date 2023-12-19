<script>
  import Movie from './Movie.svelte';
	export let name;
  const boxOffice = 'Box Office';
  const Categories = [
    {'tl':'Popular','nm':'popular'},
    {'tl':'Theatre','nm':'in_theatre'},
    {'tl':'In Comming','nm':'comming'},
    {'tl':'Chart','nm':'chart'},
    {'tl':`MaoYan ${boxOffice}`,'nm':'maoyan'},
    {'tl':`All Time ${boxOffice}`,'nm':'alltime_boxoffice'},
    {'tl':`IMDB ${boxOffice}`,'nm':'imdb_boxoffice'}
  ];
  let movies = [];
  let loading = false;
  let currentCategory = Categories[0].nm;

  const getActiveCategoryClass = (category, currentCat) => {
    return currentCat == category ? 'active': '';
  }

  const sendRequest = async (url) => {
    const response = await fetch(url)
    return await response.json()
  }

  const fetchDog = async () => {
    return await sendRequest('https://dog.ceo/api/breeds/image/random')
  }

  const fetchMovie = async (category=Categories[0].nm) => {
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
    <span on:click={()=>fetchMovie(nm)} class={`category_nav ${getActiveCategoryClass(nm,currentCategory)}`}>{tl}</span>
    {/each}
  </section>

  {#if loading}
    <p class="loading">Loading Movies...</p>
  {:else}
    {#each movies as movie}
    <Movie movie={movie} />
    {/each}
  {/if}
  
</main>

<style>
  :root {
    --main-color: #ff3e00;
  }

	main {
		padding: 1em;
		max-width: 420px;
		margin: 0 auto;
	}

	h1 {
    text-align: center;
		color: var(--main-color);
		text-transform: uppercase;
		font-size: 2em;
		font-weight: 100;
	}

  .category_navs{
    
  }

  .category_nav {
    display: inline-block;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid var(--main-color);
    color: var(--main-color);
    margin: 5px;
    cursor: pointer;
    transition: 0.3s;
  }

  .category_nav.active,.category_nav:hover {
    background-color: var(--main-color);
    color: #fff;
  }

  .loading {
    text-align: center;
    color: #ccc;
    font-size: 2em;
    font-weight: 100;
  }

	@media (min-width: 640px) {
		
	}
</style>