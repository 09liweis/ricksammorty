<script lang="ts">
  import { goto } from '$app/navigation';
  import type { PageData } from './$types';

  export let data: PageData;
  
  let title = "Rick and Morty Episodes";
  $: ({ episodes, pagination: { currentPage, totalPages } } = data);
  
  async function handlePageChange(newPage: number) {
    if (newPage >= 1 && newPage <= totalPages) {
      await goto(`?page=${newPage}`, { keepFocus: true });
    }
  }

  function getSeasonFromEpisode(episode: string): string {
    const match = episode.match(/S(\d+)E\d+/);
    return match ? `Season ${parseInt(match[1])}` : 'Unknown Season';
  }
</script>

<div class="min-h-screen bg-gray-100 py-8 px-4">
  <div class="max-w-7xl mx-auto">
    <header class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
    </header>

    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each episodes as episode}
        <article class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-200">
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <span class="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold mb-2">
                  {episode.episode}
                </span>
                <a href="/episode/{episode.id}" class="hover:text-purple-600 transition-colors">
                  <h2 class="text-xl font-bold text-gray-900">{episode.name}</h2>
                </a>
              </div>
            </div>
            
            <div class="space-y-2 mb-4">
              <p class="text-gray-600">
                <span class="font-medium">Air Date:</span> {episode.air_date}
              </p>
              <p class="text-gray-600">
                <span class="font-medium">Season:</span> {getSeasonFromEpisode(episode.episode)}
              </p>
            </div>

            <div class="mt-4">
              <p class="text-sm text-gray-500 mb-2">Featured Characters:</p>
              <div class="flex -space-x-2 overflow-hidden">
                {#each episode.characters.slice(0, 5) as character}
                  <img 
                    src={character.image} 
                    alt={character.name}
                    class="w-8 h-8 rounded-full border-2 border-white"
                    title={character.name}
                  />
                {/each}
                {#if episode.characters.length > 5}
                  <div class="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs text-gray-600">
                    +{episode.characters.length - 5}
                  </div>
                {/if}
              </div>
            </div>
          </div>
        </article>
      {/each}
    </section>

    <div class="flex justify-center items-center mt-8 space-x-2">
      <button 
        class="px-4 py-2 rounded-lg bg-purple-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
        on:click={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}>
        Previous
      </button>
      
      <span class="px-4 py-2 text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      
      <button 
        class="px-4 py-2 rounded-lg bg-purple-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
        on:click={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  </div>
</div>