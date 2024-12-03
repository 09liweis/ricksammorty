import type { PageLoad } from './$types';
import { fetchCharacters } from '$lib/fetch';

export const load: PageLoad = async ({ url }) => {
  const page = Number(url.searchParams.get('page')) || 1;
  const data = await fetchCharacters(page);
  
  return {
    characters: data.results,
    pagination: {
      currentPage: page,
      totalPages: data.info.pages
    }
  };
};

// Enable client-side data reloading when URL changes
export const ssr = true;
export const csr = true;
