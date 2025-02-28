<script lang="ts">
  import { goto } from '$app/navigation';
  import type { PageData } from './$types';

  export let data: PageData;

  $: ({ characters, pagination: { currentPage, totalPages } } = data);
  
  async function handlePageChange(newPage: number) {
    if (newPage >= 1 && newPage <= totalPages) {
      await goto(`?page=${newPage}`, { keepFocus: true });
    }
  }

  // Function to determine status color
  function getStatusColor(status: string) {
    switch (status) {
      case 'Alive': return 'text-green-600';
      case 'Dead': return 'text-red-600';
      default: return 'text-gray-600';
    }
  }

  // Function to determine status badge color
  function getStatusBadgeColor(status: string) {
    switch (status) {
      case 'Alive': return 'bg-green-100 text-green-800';
      case 'Dead': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
</script>

<div class="min-h-screen bg-gray-100 py-8 px-4">
  <div class="max-w-7xl mx-auto">
    <header class="text-center mb-12">
      <h1 class="text-5xl font-bold text-gray-900 mb-4">Rick and Morty Library</h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">Explore the multiverse with our comprehensive guide to characters from the Rick and Morty universe.</p>
    </header>

    <!-- Search and Filter (placeholder for future functionality) -->
    <div class="mb-8 bg-white rounded-xl shadow-md p-4 flex flex-col sm:flex-row justify-between items-center">
      <div class="text-lg font-semibold text-gray-800 mb-4 sm:mb-0">
        Showing {characters.length} characters
        <span class="text-gray-500 text-sm">Page {currentPage} of {totalPages}</span>
      </div>
      
      <div class="flex space-x-2">
        <button 
          class="px-4 py-2 rounded-lg bg-purple-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
          on:click={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}>
          <span class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            Previous
          </span>
        </button>
        
        <button 
          class="px-4 py-2 rounded-lg bg-purple-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
          on:click={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}>
          <span class="flex items-center">
            Next
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </span>
        </button>
      </div>
    </div>

    <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {#each characters as character}
        <a 
          href="/character/{character.id}" 
          class="block transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-xl"
        >
          <article class="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col">
            <div class="relative">
              <img 
                src={character.image} 
                alt={character.name} 
                class="w-full h-64 object-cover"
                loading="lazy"
              />
              <div class="absolute top-3 right-3">
                <span class={`px-2 py-1 rounded-full text-xs font-bold ${getStatusBadgeColor(character.status)}`}>
                  {character.status}
                </span>
              </div>
            </div>
            <div class="p-5 flex-grow flex flex-col">
              <h2 class="font-bold text-gray-900 text-xl mb-2 hover:text-purple-600 transition-colors">{character.name}</h2>
              
              <div class="mt-auto">
                <div class="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clip-rule="evenodd" />
                  </svg>
                  <p class="text-sm text-gray-600">{character.species}</p>
                </div>
                
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                  <p class="text-sm text-gray-600 truncate">{character.location.name}</p>
                </div>
                
                {#if character.episode && character.episode.length > 0}
                  <div class="mt-3 pt-3 border-t border-gray-100">
                    <p class="text-xs text-gray-500">Appears in {character.episode.length} episodes</p>
                  </div>
                {/if}
              </div>
            </div>
          </article>
        </a>
      {/each}
    </section>

    <div class="flex justify-center items-center mt-12 space-x-2">
      <div class="inline-flex rounded-md shadow-sm">
        <button 
          class="px-4 py-2 rounded-l-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          on:click={() => handlePageChange(1)}
          disabled={currentPage === 1}>
          First
        </button>
        
        <button 
          class="px-4 py-2 bg-white border-t border-b border-r border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          on:click={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
        
        <span class="px-4 py-2 bg-purple-100 border-t border-b border-purple-300 text-purple-800 font-medium">
          {currentPage} of {totalPages}
        </span>
        
        <button 
          class="px-4 py-2 bg-white border-t border-b border-l border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          on:click={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
        
        <button 
          class="px-4 py-2 rounded-r-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          on:click={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}>
          Last
        </button>
      </div>
    </div>
  </div>
</div>