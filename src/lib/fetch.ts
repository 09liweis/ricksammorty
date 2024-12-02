import { request, gql } from 'graphql-request'
import type { Character } from './types';

const GRAPHQL_URL = 'https://rickandmortyapi.com/graphql';

interface CharacterInfo {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

interface CharactersResponse {
  characters: {
    info: CharacterInfo;
    results: Character[];
  }
}

const getCharactersQuery = (page: number) => gql`
{
  characters(page: ${page}) {
    info {
      count
      pages
      next
      prev
    }
    results {
      id
      name
      status
      species
      gender
      image
      episode {
        name
        episode
      }
      location {
        name
      }
    }
  }
}
`

export const fetchGql = async (page = 1): Promise<{
  info: CharacterInfo;
  results: Character[];
}> => {
  const response = await request<CharactersResponse>(GRAPHQL_URL, getCharactersQuery(page));
  return response.characters;
}
