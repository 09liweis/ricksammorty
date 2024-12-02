<script lang="ts">
  import type { Character } from '$lib/types';
  
  export let data: { location: Character['location'] & { residents: any[] } };
  $: location = data.location;
</script>

<div class="container mx-auto p-4">
  <div class="bg-white shadow-md rounded-lg p-6">
    <h1 class="text-3xl font-bold mb-4">{location.name}</h1>
    
    <div class="grid grid-cols-2 gap-4">
      <div>
        <p class="font-semibold">Type:</p>
        <p>{location.type}</p>
      </div>
      <div>
        <p class="font-semibold">Dimension:</p>
        <p>{location.dimension}</p>
      </div>
    </div>

    <div class="mt-6">
      <h2 class="text-2xl font-semibold mb-4">Residents</h2>
      {#if location.residents.length > 0}
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {#each location.residents as resident}
            <a href="/character/{resident.id}" class="block">
              <div class="bg-gray-100 rounded-lg p-4 hover:bg-gray-200 transition">
                <img src={resident.image} alt={resident.name} class="w-full h-48 object-cover rounded-md mb-2">
                <h3 class="text-lg font-medium">{resident.name}</h3>
                <p class="text-sm text-gray-600">{resident.status} - {resident.species}</p>
              </div>
            </a>
          {/each}
        </div>
      {:else}
        <p>No residents found in this location.</p>
      {/if}
    </div>
  </div>
</div>

<style>
  .container {
    max-width: 1200px;
  }
</style>
