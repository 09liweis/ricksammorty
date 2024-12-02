import { request, gql } from 'graphql-request'
import type { Character } from './types';

const GRAPHQL_URL = 'https://rickandmortyapi.com/graphql';

interface CharacterInfo {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

interface Episode {
  id: string;
  name: string;
  episode: string;
  air_date: string;
}

interface Location {
  id: string;
  name: string;
  type: string;
  dimension: string;
  residents: Character[];
}

interface CharactersResponse {
  characters: {
    info: CharacterInfo;
    results: Character[];
  }
}

interface LocationsResponse {
  locations: {
    info: CharacterInfo;
    results: Location[];
  }
}

interface CharacterResponse {
  character: Character & {
    origin: {
      name: string;
      type: string;
      dimension: string;
    };
    location: {
      name: string;
      type: string;
      dimension: string;
    };
    episode: Episode[];
  };
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

const getLocationsQuery = (page: number) => gql`
{
  locations(page: ${page}) {
    info {
      count
      pages
      next
      prev
    }
    results {
      id
      name
      type
      dimension
      residents {
        id
        name
        image
      }
    }
  }
}
`

const getCharacterQuery = (id: string) => gql`
{
  character(id: ${id}) {
    id
    name
    status
    species
    type
    gender
    image
    created
    origin {
      name
      type
      dimension
    }
    location {
      name
      type
      dimension
    }
    episode {
      id
      name
      episode
      air_date
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

export const fetchLocations = async (page = 1): Promise<{
  info: CharacterInfo;
  results: Location[];
}> => {
  const response = await request<LocationsResponse>(GRAPHQL_URL, getLocationsQuery(page));
  return response.locations;
}

export const fetchCharacter = async (id: string) => {
  const response = await request<CharacterResponse>(GRAPHQL_URL, getCharacterQuery(id));
  return response.character;
}
