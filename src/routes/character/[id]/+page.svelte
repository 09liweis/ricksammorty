<script lang="ts">
  import type { PageData } from './$types';
  
  export let data: PageData;
  $: character = data.character;
</script>

<div class="min-h-screen bg-gray-100 py-12 px-4">
  <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
    <div class="md:flex">
      <!-- Character Image -->
      <div class="md:flex-shrink-0">
        <img 
          class="h-full w-full object-cover md:w-56" 
          src={character.image} 
          alt={character.name}
        />
      </div>
      
      <!-- Character Details -->
      <div class="p-8 w-full">
        <div class="uppercase tracking-wide text-sm text-purple-600 font-semibold">
          {character.species} - {character.gender}
        </div>
        <h1 class="block mt-1 text-3xl leading-tight font-bold text-gray-900">
          {character.name}
        </h1>
        
        <div class="mt-4">
          <div class="flex items-center">
            <span 
              class="px-2 py-1 rounded-full text-xs font-bold {
                character.status === 'Alive' ? 'bg-green-100 text-green-800' : 
                character.status === 'Dead' ? 'bg-red-100 text-red-800' : 
                'bg-gray-100 text-gray-800'
              }"
            >
              {character.status}
            </span>
          </div>
        </div>
        
        <div class="mt-6 grid grid-cols-2 gap-4">
          <div>
            <p class="text-gray-600">Origin</p>
            <p class="font-bold">{character.origin.name}</p>
            <p class="text-sm text-gray-500">{character.origin.type || 'Unknown'}</p>
          </div>
          
          <div>
            <p class="text-gray-600">Current Location</p>
            <p class="font-bold">{character.location.name}</p>
            <p class="text-sm text-gray-500">{character.location.type || 'Unknown'}</p>
          </div>
        </div>
        
        <div class="mt-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-3">Episodes</h3>
          <div class="overflow-y-auto max-h-40 bg-gray-50 p-4 rounded-lg">
            {#each character.episode as episode}
              <a 
                href="/episode/{episode.id}" 
                class="block text-sm hover:text-purple-600 transition-colors"
              >
                <span class="font-medium text-purple-600">{episode.episode}</span>
                {episode.name}
              </a>
            {/each}
          </div>
        </div>
        
        <div class="mt-6 text-sm text-gray-500">
          Created: {new Date(character.created).toLocaleDateString()}
        </div>
      </div>
    </div>
  </div>
</div>