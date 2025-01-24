<script>
  import "../app.css";
  import { page } from '$app/stores';
  const MENUS = [
    {
      tl: 'Characters', pathname: '/'
    },
    {
      tl: 'Locations', pathname: '/locations'
    },
    {
      tl: 'Episodes', pathname: '/episodes'
    },
  ];
</script>

<nav class="sticky top-0 z-10 bg-purple-600 text-white shadow-lg max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
  <a href="/" class="text-xl font-bold">Rick and Morty</a>
  <div class="flex space-x-2">
    {#each MENUS as menu}
    <a 
      href="{menu.pathname}" 
      class="px-3 py-2 rounded-md text-sm font-medium {$page.url.pathname === menu.pathname ? 'bg-purple-800' : 'hover:bg-purple-700'}"
    >
      {menu.tl}
    </a>
    {/each}
  </div>
</nav>

<main>
  <slot />
</main>