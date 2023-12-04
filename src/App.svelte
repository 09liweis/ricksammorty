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
    return await sendRequest('https://samliweisen.onrender.com/api/movies/chart')//comming,in_theatre,chart
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
    {#each movieResponse.movies as {title,poster,douban_rating}}
    <article class="movie">
      <img class="movie_poster" src={poster} alt={title} />
      <section class="movie_info">
        <h4>{title} {douban_rating ? douban_rating : ''}</h4>
      </section>
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

	h2 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
  .movie {
    display: flex;
    margin-top: 2rem;
  }
  .movie_poster {
    width: 30%;
  }

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>