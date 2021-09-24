import { gql, useQuery } from '@apollo/client';
import { getArtistsQuery } from '../__generated__/getArtistsQuery';

export const GET_ARTISTS_QUERY = gql`
  query getArtistsQuery {
    getArtists {
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
  const { data: artistsData, loading: artistsLoading } =
    useQuery<getArtistsQuery>(GET_ARTISTS_QUERY);

  return { artistsData, artistsLoading };
}

export default useArtist;
