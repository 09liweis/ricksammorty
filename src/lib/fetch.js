import { request, gql } from 'graphql-request'

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
  const response = await request('https://rickandmortyapi.com/graphql', document);
  return response.characters;
}