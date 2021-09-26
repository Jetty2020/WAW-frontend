import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  postsQuery,
  postsQueryVariables,
  postsQuery_posts_results,
} from '../__generated__/postsQuery';
import { useInView } from 'react-intersection-observer';
import ListContainer from '../components/home/ListContainer';
import PostList from '../components/home/PostList';
import NoMorePost from '../components/home/NoMorePost';
import { POST_FRAGMENT } from '../fragments';
import { CONFIG_PAGES } from '../constants';
import Container from '../components/atoms/Container';

export const POSTS_QUERY = gql`
  query postsQuery($postsInput: PostsInput!) {
    posts(input: $postsInput) {
      ok
      error
      totalPages
      totalResults
      results {
        ...PostParts
      }
    }
  }
  ${POST_FRAGMENT}
`;

const Home = () => {
  const [page, setPage] = useState<number>(1);
  const [more, setMore] = useState<boolean>(true);
  const [posts, setPosts] = useState<postsQuery_posts_results[]>([]);
  const { data, loading } = useQuery<postsQuery, postsQueryVariables>(
    POSTS_QUERY,
    {
      variables: {
        postsInput: {
          page,
        },
      },
    }
  );
  const { ref, inView } = useInView({
    threshold: 0,
  });
  useEffect(() => {
    data?.posts?.results?.forEach((post) => {
      setPosts((cur) => [...cur, post]);
    });
  }, [data]);
  if (inView === true && !loading) setPage((cur) => cur + 1);
  if (more && (posts.length % CONFIG_PAGES !== 0 || data?.posts.results?.length === 0))
    setMore(false);
  return (
    <Container pageTitle="Home">
      {posts.length !== 0 ? (
        <ListContainer>
          {posts.map((post) => (
            <PostList post={post} key={post.id} />
          ))}
          {!loading && data && more ? <div ref={ref} /> : null}
        </ListContainer>
      ) : null}
      {!more ? (
        <NoMorePost totalResults={data?.posts.totalResults ?? 0} />
      ) : null}
    </Container>
  );
};

export default Home;
