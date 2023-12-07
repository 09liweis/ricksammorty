<script>
  export let movie = {};
  const infoArray = ['actors','director','category','duration','country','release'];
  const {title,poster,douban_rating,duration} = movie;
</script>
<article class="movie">
  <img class="movie_poster" src={poster} alt={title} />
  <section class="movie_info">
    <h4 class="movie_title">{title}</h4>
    {#each infoArray as info}
      {#if movie[info]}
        <p class="">{movie[info]}</p>
      {/if}
    {/each}
    {#if douban_rating}
    <span class="movie_rating">{douban_rating}</span>
    {/if}
  </section>
</article>
<style>
  .movie {
    display: flex;
    margin-top: 1rem;
    position: relative;
  }
  .movie_poster {
    width: 30%;
    border-radius: 10px;
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
</style>