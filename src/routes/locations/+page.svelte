<script lang="ts">
  import { goto } from '$app/navigation';
  import type { PageData } from './$types';

  export let data: PageData;
  
  let title = "Rick and Morty Locations";
  $: ({ locations, pagination: { currentPage, totalPages } } = data);
  
  async function handlePageChange(newPage: number) {
    if (newPage >= 1 && newPage <= totalPages) {
      await goto(`?page=${newPage}`, { keepFocus: true });
    }
  }
</script>

<div class="min-h-screen bg-gray-100 py-8 px-4">
  <div class="max-w-7xl mx-auto">
    <header class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
    </header>

    <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {#each locations as {id,name,type,dimension,residents}}
        <article class="bg-white p-6 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
          <a href="/location/{id}" class="hover:underline">
            <h2 class="font-bold text-gray-900 text-xl mb-2">{name}</h2>
          </a>
          <div class="space-y-2">
            <p class="text-purple-600 font-medium">{type}</p>
            <p class="text-gray-600">{dimension}</p>
            <p class="text-sm mt-4 text-gray-500">Residents: {residents.length}</p>
            {#if residents.length > 0}
              <div class="flex -space-x-2 mt-2 overflow-hidden">
                {#each residents.slice(0, 5) as resident}
                  <img 
                    src={resident.image} 
                    alt={resident.name}
                    class="w-8 h-8 rounded-full border-2 border-white"
                    title={resident.name}
                  />
                {/each}
                {#if residents.length > 5}
                  <div class="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs text-gray-600">
                    +{residents.length - 5}
                  </div>
                {/if}
              </div>
            {/if}
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