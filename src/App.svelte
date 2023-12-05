<script>
  import Movie from './Movie.svelte';
	export let name;

  const sendRequest = async (url) => {
    const response = await fetch(url)
    return await response.json()
  }

  const fetchDog = async () => {
    return await sendRequest('https://dog.ceo/api/breeds/image/random')
  }

  const fetchMovie = async (category='in_theatre') => {
    return await sendRequest(`https://samliweisen.onrender.com/api/movies/${category}`)//comming,in_theatre,chart
  }

  const Categories = [
    {'tl':'In Theatre','nm':'in_theatre'},
    {'tl':'Comming','nm':'comming'},
    {'tl':'Chart','nm':'chart'}
  ];
  
</script>

<main>
	<h2>Hello {name}!</h2>

  <!-- {#await fetchDog()}
    <p>...waiting</p>
  {:then data}
    <img src={data.message} alt="Dog image" />
  {:catch error}
    <p>An error occurred!</p>
  {/await} -->

  <section class="category_navs">
    {#each Categories as {tl,nm}}
    <span on:click={()=>fetchMovie(nm)} class="category_nav">{tl}</span>
    {/each}
  </section>

  {#await fetchMovie()}
    <p>Loading Movies...</p>
  {:then movieResponse}
    {#each movieResponse.movies as movie}
    <Movie movie={movie} />
    {/each}
  {:catch error}
    <p>Movie Error</p>
  {/await}
  
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h2 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

  .category_nav {
    padding: 5px;
    border-radius: 5px;
    background-color: #ff3e00;
    color: #fff;
    margin: 5px;
  }

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>