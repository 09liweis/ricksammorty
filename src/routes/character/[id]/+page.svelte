<script lang="ts">
  import type { PageData } from './$types';
  
  export let data: PageData;
  $: character = data.character;

  // Function to determine status color
  function getStatusColor(status: string) {
    switch (status) {
      case 'Alive': return 'bg-green-100 text-green-800';
      case 'Dead': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
</script>

<div class="min-h-screen bg-gray-100 py-12 px-4">
  <div class="max-w-5xl mx-auto">
    <!-- Back button -->
    <a href="/" class="inline-flex items-center mb-6 text-purple-600 hover:text-purple-800 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
      </svg>
      Back to Characters
    </a>

    <!-- Character Card -->
    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="md:flex">
        <!-- Character Image with Status Badge -->
        <div class="md:flex-shrink-0 relative">
          <img 
            class="h-full w-full object-cover md:w-80" 
            src={character.image} 
            alt={character.name}
          />
          <div class="absolute top-4 left-4">
            <span 
              class={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(character.status)}`}
            >
              {character.status}
            </span>
          </div>
        </div>
        
        <!-- Character Details -->
        <div class="p-8 w-full">
          <div class="flex flex-col md:flex-row md:justify-between md:items-start">
            <div>
              <div class="uppercase tracking-wide text-sm text-purple-600 font-semibold">
                {character.species} {character.type ? `- ${character.type}` : ''} • {character.gender}
              </div>
              <h1 class="mt-1 text-3xl leading-tight font-bold text-gray-900">
                {character.name}
              </h1>
            </div>
            <div class="mt-4 md:mt-0 text-sm text-gray-500">
              Created: {new Date(character.created).toLocaleDateString()}
            </div>
          </div>
          
          <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Origin -->
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Origin</h3>
              <div class="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
                <p class="font-bold text-gray-900">{character.origin.name}</p>
              </div>
              {#if character.origin.type || character.origin.dimension}
                <div class="ml-7">
                  {#if character.origin.type}
                    <p class="text-sm text-gray-600">Type: {character.origin.type}</p>
                  {/if}
                  {#if character.origin.dimension}
                    <p class="text-sm text-gray-600">Dimension: {character.origin.dimension}</p>
                  {/if}                  
                </div>
              {/if}              
            </div>
            
            <!-- Current Location -->
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Current Location</h3>
              <div class="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
                <p class="font-bold text-gray-900">{character.location.name}</p>
              </div>
              {#if character.location.type || character.location.dimension}
                <div class="ml-7">
                  {#if character.location.type}
                    <p class="text-sm text-gray-600">Type: {character.location.type}</p>
                  {/if}
                  {#if character.location.dimension}
                    <p class="text-sm text-gray-600">Dimension: {character.location.dimension}</p>
                  {/if}
                </div>
              {/if}
            </div>
          </div>
          
          <!-- Episodes -->
          <div class="mt-8">
            <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-6V5h1v2h-1zm2 0h1v4h-1V7zm1 6h-1v2H7v-2h6v2h2v-2zm-8-8H7v4h2V7zm2 0v4h2V7h-2zm-2 6H7v2h2v-2zm2 0h2v2h-2v-2z" clip-rule="evenodd" />
              </svg>
              Episodes ({character.episode.length})
            </h3>
            <div class="bg-gray-50 rounded-lg border border-gray-200">
              <div class="max-h-60 overflow-y-auto p-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {#each character.episode as episode}
                    <a 
                      href="/episode/{episode.id}" 
                      class="flex items-center p-2 rounded-md hover:bg-purple-50 transition-colors group"
                    >
                      <div class="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <span class="text-xs font-medium text-purple-800">{episode.episode.slice(0, 3)}</span>
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 group-hover:text-purple-700 transition-colors truncate">
                          {episode.name}
                        </p>
                        <p class="text-xs text-gray-500">
                          {episode.air_date}
                        </p>
                      </div>
                    </a>
                  {/each}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>