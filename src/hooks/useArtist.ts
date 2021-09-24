import { gql, useQuery } from '@apollo/client';
import {
  getArtistsQuery,
  getArtistsQueryVariables,
} from '../__generated__/getArtistsQuery';

export const GET_ARTISTS_QUERY = gql`
  query getArtistsQuery($getArtistsInput: ArtistInput!) {
    getArtists(input: $getArtistsInput) {
      ok
      error
      totalResults
      artists {
        id
        name
      }
    }
  }
`;

function useArtist() {
  const { data: artistsData, loading: artistsLoading } = useQuery<
    getArtistsQuery,
    getArtistsQueryVariables
  >(GET_ARTISTS_QUERY, {
    variables: {
      getArtistsInput: {},
    },
  });

  return {artistsData, artistsLoading};
}

export default useArtist;