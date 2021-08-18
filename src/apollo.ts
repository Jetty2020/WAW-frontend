import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';
import { LOCALSTORAGE_TOKEN } from './constants';

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);
export const isLoggedInVar = makeVar(!!token);
export const authTokenVar = makeVar(token);

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});
