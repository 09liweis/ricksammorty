<script lang="ts">
  import { goto } from '$app/navigation';
  import type { PageData } from './$types';

  export let data: PageData;

  let title = "Rick and Morty Library";
  $: ({ characters, pagination: { currentPage, totalPages } } = data);
  
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

    <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {#each characters as c}
        <article class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
          <div class="relative">
            <img 
              src={c.image} 
              alt={c.name} 
              class="w-full h-48 object-cover hover:scale-105 transition-transform duration-200"
            />
          </div>
          <div class="p-4">
            <h2 class="font-bold text-gray-900 text-lg mb-2">{c.name}</h2>
            <p class="text-sm text-gray-600 mb-1">{c.species} - <span class={c.status === 'Alive' ? 'text-green-600' : 'text-red-600'}>{c.status}</span></p>
            <p class="text-sm text-gray-500 truncate">{c.location.name}</p>
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