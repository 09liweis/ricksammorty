<script>
  export let movie = {};
  const {title,poster,douban_rating} = movie;
</script>
<article class="movie">
  <img class="movie_poster" src={poster} alt={title} />
  <section class="movie_info">
    <h4>{title}</h4>
    {#if douban_rating}
    <span class="movie_rating">{douban_rating}</span>
    {/if}
  </section>
</article>
<style>
  .movie {
    display: flex;
    margin-top: 2rem;
    position: relative;
  }
  .movie_poster {
    width: 30%;
    border-radius: 10px;
  }
  .movie_info {
    padding: 10px;
  }
  .movie_rating {
    border-radius: 5px;
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 5px;
    color: #fff;
    background-color: seagreen;
  }
</style>