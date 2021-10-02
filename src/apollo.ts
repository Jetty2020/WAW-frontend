import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from '@apollo/client';
import { LOCALSTORAGE_TOKEN } from './constants';
import { setContext } from '@apollo/client/link/context';

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);
export const isLoggedInVar = makeVar(!!token);
export const authTokenVar = makeVar(token);

export const logUserOut = () => {
  localStorage.removeItem(LOCALSTORAGE_TOKEN);
  isLoggedInVar(false);
  authTokenVar('');
  client.cache.reset();
};

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://world-art-works-backend.herokuapp.com/graphql'
      : 'http://localhost:4000/graphql',
});
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'waw-token': authTokenVar() || '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
