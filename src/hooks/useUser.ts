import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';
import { isLoggedInVar, logUserOut } from '../apollo';
import { meQuery } from '../__generated__/meQuery';

export const ME_QUERY = gql`
  query meQuery {
    me {
      id
      nickname
      email
    }
  }
`;

function useUser() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data, loading } = useQuery<meQuery>(ME_QUERY, {
    skip: !hasToken,
  });
  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);
  return { data, loading };
}
export default useUser;
