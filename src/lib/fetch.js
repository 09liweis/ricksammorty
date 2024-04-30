import { request, gql } from 'graphql-request'

const GRAPHQL_URL = 'https://rickandmortyapi.com/graphql';

const document = gql`
{
  characters(page: 1) {
    info {
      count
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

export const fetchGql = async () => {
  const response = await request(GRAPHQL_URL, document);
  return response.characters;
}