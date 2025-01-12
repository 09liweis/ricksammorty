<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
  <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
    <div class="mb-6">
      <h1 class="text-6xl font-bold text-purple-600 mb-4">
        {$page.status}
      </h1>
      <p class="text-2xl font-semibold text-gray-800 mb-2">
        {#if $page.status === 404}
          Page Not Found
        {:else if $page.status === 500}
          Server Error
        {:else}
          {$page.error?.message || 'Something went wrong'}
        {/if}
      </p>
      <p class="text-gray-600 mb-8">
        {#if $page.status === 404}
          The page you're looking for doesn't exist or has been moved.
        {:else if $page.status === 500}
          We're experiencing some technical difficulties. Please try again later.
        {:else}
          We apologize for the inconvenience. Please try again or go back to the home page.
        {/if}
      </p>
      {#if $page.status === 404}
        <div class="text-sm text-gray-500 mb-8">
          You might want to check the URL or navigate to one of our main sections:
          <div class="mt-4 flex justify-center space-x-4">
            <a href="/characters" class="text-purple-600 hover:underline">Characters</a>
            <a href="/locations" class="text-purple-600 hover:underline">Locations</a>
            <a href="/episodes" class="text-purple-600 hover:underline">Episodes</a>
          </div>
        </div>
      {/if}
    </div>
    
    <div class="flex justify-center space-x-4">
      {#if $page.status !== 404}
        <button
          class="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          on:click={() => window.location.reload()}
        >
          Try Again
        </button>
      {/if}
      <a
        href="/"
        class="p-2 {$page.status === 404 ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} rounded-lg transition-colors"
      >
        Go Home
      </a>
    </div>
  </div>
</div>