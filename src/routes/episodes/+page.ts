import type { PageLoad } from './$types';
import { fetchEpisodes } from '$lib/fetch';

export const load: PageLoad = async ({ url }) => {
  const page = Number(url.searchParams.get('page')) || 1;
  const data = await fetchEpisodes(page);
  
  return {
    episodes: data.results,
    pagination: {
      currentPage: page,
      totalPages: data.info.pages
    }
  };
};

export const ssr = true;
export const csr = true;