import type { PageLoad } from './$types';
import { fetchEpisode } from '$lib/fetch';

export const load: PageLoad = async ({ params }) => {
  const episode = await fetchEpisode(params.id);
  
  return {
    episode
  };
}