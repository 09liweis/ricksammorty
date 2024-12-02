import type { PageLoad } from './$types';
import { fetchCharacter } from '$lib/fetch';

export const load: PageLoad = async ({ params }) => {
  const character = await fetchCharacter(params.id);
  
  return {
    character
  };
}
