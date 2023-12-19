<script>
  export let movie = {};
  const infoArray = ['actors','director','category','duration','country','release'];
  const {title,poster,douban_rating,duration,imdb_rating,totalGross,currentGross} = movie;
</script>
<article class="movie">
  <img class="movie_poster" src={poster} alt={title} loading="lazy" />
  <section class="movie_info">
    <h4 class="movie_title">{title}</h4>
    {#each infoArray as info}
      {#if movie[info]}
        <p class="">{movie[info]}</p>
      {/if}
    {/each}
    {#if totalGross}
      <p>{currentGross} / {totalGross}</p>
    {/if}
    {#if douban_rating}
    <span class="movie_rating">{douban_rating}</span>
    {/if}
    {#if imdb_rating}
    <span class="movie_rating imdb">{imdb_rating}</span>
    {/if}
  </section>
</article>
<style>
  .movie {
    display: flex;
    margin-top: 1rem;
    position: relative;
    padding-top: 1rem;
    border-top: 2px solid var(--main-color);
  }
  .movie_poster {
    width: 30%;
    border-radius: 10px;
  }
  .movie_poster::before {
    width: 100%;
    height: 100%;
    background-color: #ccc;
    content: 'Loading';
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .movie_info {
    width: calc(100% - 30%);
    padding: 10px;
  }
  .movie_info p {
    margin: 0;
    margin-top: 0.1rem;
  }
  .movie_title {
    margin: 0;
    color: var(--main-color);
  }
  .movie_rating {
    border-radius: 5px;
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 3px;
    color: #fff;
    background-color: seagreen;
  }
  .movie_rating.imdb {
    color: #000;
    background-color: #e0e000;
  }
</style>