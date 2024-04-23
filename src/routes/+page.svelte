<script>
  let title = "Rick and Morty Library";
  const updatTitle = () => {
    title = "Rick and Morty Done";
  }

  let characters = [];
  
  import { request, gql } from 'graphql-request'

  const document = gql`
    {
      characters(page: 1) {
        info {
          count
        }
        results {
          id
          name
          status
          species
          gender
          image
          episode {
            name
            episode
          }
          location {
            name
          }
        }
      }
    }
  `
  request('https://rickandmortyapi.com/graphql', document).then((resp)=>{
    characters = resp.characters.results;
  }).catch((err)=>{

  });
</script>
<h1>Welcome to {title}</h1>
<button on:click={updatTitle}>Click</button>
{#each characters as c}
<article>
  <img src={c.image} alt={c.name}/>
  <h2>{c.name}</h2>
</article>
{/each}