<script>
  import "../app.css";
  import { page } from '$app/stores';
</script>

<nav class="bg-purple-600 text-white shadow-lg max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
  <a href="/" class="text-xl font-bold">Rick and Morty</a>
  <div class="flex space-x-4">
    <a 
      href="/" 
      class="px-3 py-2 rounded-md text-sm font-medium {$page.url.pathname === '/' ? 'bg-purple-800' : 'hover:bg-purple-700'}"
    >
      Characters
    </a>
    <a 
      href="/locations" 
      class="px-3 py-2 rounded-md text-sm font-medium {$page.url.pathname === '/locations' ? 'bg-purple-800' : 'hover:bg-purple-700'}"
    >
      Locations
    </a>
    <a 
      href="/episodes" 
      class="px-3 py-2 rounded-md text-sm font-medium {$page.url.pathname === '/episodes' ? 'bg-purple-800' : 'hover:bg-purple-700'}"
    >
      Episodes
    </a>
  </div>
</nav>

<main>
  <slot />
</main>