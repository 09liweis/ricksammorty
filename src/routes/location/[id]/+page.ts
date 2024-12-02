import type { PageLoad } from './$types';
import { fetchLocation } from '$lib/fetch';

export const load: PageLoad = async ({ params }) => {
  const location = await fetchLocation(params.id);
  
  return {
    location
  };
}
