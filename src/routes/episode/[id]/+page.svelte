<script lang="ts">
  import type { PageData } from './$types';
  
  export let data: PageData;
  $: episode = data.episode;

  function getSeasonFromEpisode(episode: string): string {
    const match = episode.match(/S(\d+)E\d+/);
    return match ? `Season ${parseInt(match[1])}` : 'Unknown Season';
  }
</script>

<div class="min-h-screen bg-gray-100 py-8 px-4">
  <div class="max-w-4xl mx-auto">
    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="p-8">
        <div class="flex items-center justify-between mb-6">
          <div>
            <span class="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold mb-2">
              {episode.episode}
            </span>
            <h1 class="text-3xl font-bold text-gray-900">{episode.name}</h1>
          </div>
          <div class="text-right">
            <p class="text-gray-600">{getSeasonFromEpisode(episode.episode)}</p>
            <p class="text-gray-500">Air Date: {episode.air_date}</p>
          </div>
        </div>

        <div class="mt-8">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Featured Characters</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {#each episode.characters as character}
              <a 
                href="/character/{character.id}"
                class="block group"
              >
                <div class="bg-gray-50 rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                  <img 
                    src={character.image} 
                    alt={character.name}
                    class="w-full h-40 object-cover"
                  />
                  <div class="p-3">
                    <h3 class="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                      {character.name}
                    </h3>
                    <p class="text-sm text-gray-600">
                      {character.species} - 
                      <span class={character.status === 'Alive' ? 'text-green-600' : 'text-red-600'}>
                        {character.status}
                      </span>
                    </p>
                  </div>
                </div>
              </a>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>