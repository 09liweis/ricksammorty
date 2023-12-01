<script>
	export let name;

  const sendRequest = async (url) => {
    const response = await fetch(url)
    return await response.json()
  }

  const fetchDog = async () => {
    return await sendRequest('https://dog.ceo/api/breeds/image/random')
  }

  const fetchMovie = async () => {
    return await sendRequest('https://samliweisen.onrender.com/api/movies/comming')//comming,in_theatre,chart
  }
  
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

  {#await fetchMovie()}
    <p>Loading Movies...</p>
  {:then movieResponse}
    {#each movieResponse.movies as movie}
    <article>
      <img src={movie.poster} />
      <h4>{movie.title} {movie.douban_rating ? movie.douban_rating : ''}</h4>
    </article>
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

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>