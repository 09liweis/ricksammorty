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

interface LocationResponse {
  location: Location & {
    residents: Character[];
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

const getLocationQuery = (id: string) => gql`
{
  location(id: "${id}") {
    id
    name
    type
    dimension
    residents {
      id
      name
      status
      species
      type
      gender
      image
    }
  }
}
`

export const fetchGql = async <T>(url: string, query: string): Promise<T> => {
  const response = await request<T>(url, query);
  return response;
}

export const fetchCharacters = async (page = 1): Promise<{
  info: CharacterInfo;
  results: Character[];
}> => {
  const response = await fetchGql<CharactersResponse>(GRAPHQL_URL, getCharactersQuery(page));
  return response.characters;
}

export const fetchLocations = async (page = 1): Promise<{
  info: CharacterInfo;
  results: Location[];
}> => {
  const response = await fetchGql<LocationsResponse>(GRAPHQL_URL, getLocationsQuery(page));
  return response.locations;
}

export const fetchCharacter = async (id: string) => {
  const response = await fetchGql<CharacterResponse>(GRAPHQL_URL, getCharacterQuery(id));
  return response.character;
}

export const fetchLocation = async (id: string) => {
  const response = await fetchGql<LocationResponse>(GRAPHQL_URL, getLocationQuery(id));
  return response.location;
}
