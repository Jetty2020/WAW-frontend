import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import PageTitle from '../components/PageTitle';
import {
  postsQuery,
  postsQueryVariables,
  postsQuery_posts_results,
} from '../__generated__/postsQuery';
import { useInView } from 'react-intersection-observer';
import HomeContainer from '../components/home/HomeContainer';
import ListContainer from '../components/home/ListContainer';
import PostList from '../components/home/PostList';
import NoMorePost from '../components/home/NoMorePost';

const POSTS_QUERY = gql`
  query postsQuery($postsInput: PostsInput!) {
    posts(input: $postsInput) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        title
        createdAt
        imgUrl
        artist {
          id
          name
        }
        year
        desc
        writer {
          id
          nickname
        }
        likesNum
        isLike
      }
    }
  }
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
  if (more && (posts.length % 9 !== 0 || data?.posts.results?.length === 0))
    setMore(false);
  return (
    <HomeContainer>
      <PageTitle title="Home" />
      {posts.length !== 0 ? (
        <ListContainer>
          {posts.map((post) => (
            <PostList post={post} />
          ))}
          {!loading && data && more ? <div ref={ref} /> : null}
        </ListContainer>
      ) : null}
      {!more ? (
        <NoMorePost totalResults={data?.posts.totalResults ?? 0} />
      ) : null}
    </HomeContainer>
  );
};

export default Home;
