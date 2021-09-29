import { gql, useQuery } from '@apollo/client';
import React, { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../components/atoms/Container';
import { CONFIG_SEARCH_POSTS } from '../constants';
import useArtist from '../hooks/useArtist';
import {
  searchByArtistQuery,
  searchByArtistQueryVariables,
  searchByArtistQuery_searchByArtist_posts,
} from '../__generated__/searchByArtistQuery';

const SEARCH_BY_ARTIST = gql`
  query searchByArtistQuery($searchByArtistInput: SearchByArtistInput!) {
    searchByArtist(input: $searchByArtistInput) {
      ok
      error
      totalResults
      posts {
        id
        imgUrl
        title
        desc
        likesNum
        artist {
          id
          name
        }
        writer {
          id
          nickname
        }
        createdAt
      }
    }
  }
`;

const ArtistListCon = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.color.white};
  box-shadow: 0 5px 18px -7px rgba(0, 0, 0, 1);
`;
const ArtistBox = styled.div`
  font-size: 0.875rem;
  padding: 0.75rem 1rem;
  margin: 0.5rem;
  border-radius: 2.5rem;
  background-color: rgb(241, 243, 245);
  color: rgb(12, 166, 120);
  cursor: pointer;
`;
const PostContainer = styled.div`
  margin: 3rem 0;
`;
const TotalSearch = styled.div`
  display: flex;
  font-size: 1.125rem;
  font-weight: 400;
  margin-top: 1.75rem;
`;
const TotalSearchNum = styled.div`
  margin-left: 0.25rem;
  font-weight: 700;
`;
const PostCon = styled.div`
  border-bottom: 1px solid #e2e2e2;
  padding-bottom: 4rem;
`;
const ImgCon = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 4rem auto 2rem;
  background-color: #eff1f2;
  @media screen and (max-width: 668px) {
    width: 95%;
  }
`;
const PostImg = styled.img`
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
  @media screen and (max-width: 668px) {
    width: 100%;
  }
`;
const PostTitle = styled.div`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;
const PostDesc = styled.div`
  font-weight: 400;
  color: gray;
`;
const PostBox = styled.div`
  display: flex;
  margin-top: 1rem;
`;
const PostBy = styled.div`
  height: 2rem;
  display: flex;
  align-items: center;
  color: rgb(12, 166, 120);
  background-color: rgb(241, 243, 245);
  padding: 0 1rem;
  border-radius: 1rem;
  margin-right: 0.5rem;
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
`;
const Name = styled.div`
  margin-left: 0.375rem;
  font-size: inherit;
  font-weight: 400;
  color: black;
`;
const PostInfo = styled.div`
  font-size: 0.875rem;
  color: gray;
  margin-right: 0.5rem;
`;
const NoMoreData = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 500;
  margin-top: 2rem;
  margin-bottom: 5rem;
`;

const Artist: React.FC = () => {
  const { artistsData, artistsLoading } = useArtist();
  const [_, initialId] = decodeURI(window.location.href).split('?id=');
  const [artistId, setArtistId] = useState<number>(+initialId);
  const [page, setPage] = useState<number>(1);
  const [more, setMore] = useState<boolean>(true);
  const [handlePage, setHandlePage] = useState<boolean>(true);
  const [posts, setPosts] = useState<
    searchByArtistQuery_searchByArtist_posts[]
  >([]);
  const history = useHistory();
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const { data: postsData, loading: postsLoading } = useQuery<
    searchByArtistQuery,
    searchByArtistQueryVariables
  >(SEARCH_BY_ARTIST, {
    variables: {
      searchByArtistInput: {
        page,
        artistId,
      },
    },
  });
  useEffect(() => {
    postsData?.searchByArtist.posts?.forEach((post) => {
      setPosts((cur) => [...cur, post]);
    });
    setHandlePage(() => true);
  }, [postsData]);
  const handleList = useCallback(
    (id: number) => {
      setArtistId(() => id);
      setPosts(() => []);
      setPage(() => 1);
      setMore(() => true);
      history.push(`/artist?id=${id}`);
    },
    [history]
  );
  if (inView === true && !postsLoading && handlePage) {
    setHandlePage(() => false);
    setPage((cur) => cur + 1);
  }
  if (
    more &&
    (posts.length % CONFIG_SEARCH_POSTS !== 0 ||
      postsData?.searchByArtist.posts?.length === 0)
  )
    setMore(() => false);

  return (
    <Container pageTitle="Artists">
      {!artistsLoading && (
        <ArtistListCon>
          {artistsData?.getArtists.artists?.map((artist) => (
            <ArtistBox onClick={() => handleList(artist.id)} key={artist.id}>
              {artist.name}
            </ArtistBox>
          ))}
        </ArtistListCon>
      )}
      <PostContainer>
        {posts && artistId && (
          <div>
            <TotalSearch>
              총{' '}
              <TotalSearchNum>
                {postsData?.searchByArtist.totalResults}개
              </TotalSearchNum>
              의 포스트를 찾았습니다.
            </TotalSearch>
            {posts?.map((post) => (
              <PostCon key={post.id}>
                <Link to={`/post/${post.id}`}>
                  <ImgCon>
                    <PostImg src={post.imgUrl} />
                  </ImgCon>
                </Link>
                <Link to={`/post/${post.id}`}>
                  <PostTitle>{post.title}</PostTitle>
                </Link>
                <PostDesc>
                  {post.desc?.slice(0, 100)}
                  {post.desc?.slice(100) && '...'}
                </PostDesc>
                <PostBox>
                  <PostBy>
                    posted by{' '}
                    <Link to={`/user/${post.writer.id}`}>
                      <Name>{post.writer.nickname}</Name>
                    </Link>
                  </PostBy>
                  {post.artist && (
                    <PostBy>
                      made by <Name>{post.artist?.name}</Name>
                    </PostBy>
                  )}
                </PostBox>
                <PostBox>
                  <PostInfo>{`${post?.createdAt.substr(
                    0,
                    4
                  )}년 ${post?.createdAt.substr(
                    5,
                    2
                  )}월 ${post?.createdAt.substr(8, 2)}일`}</PostInfo>
                  <PostInfo>·</PostInfo>
                  <PostInfo>{post.likesNum}개의 좋아요</PostInfo>
                </PostBox>
              </PostCon>
            ))}
            {!postsLoading && more && <div ref={ref} />}
          </div>
        )}
        {!more && !postsLoading && (
          <NoMoreData>
            더 이상 게시물이 없습니다. ({' '}
            {postsData?.searchByArtist.totalResults} /{' '}
            {postsData?.searchByArtist.totalResults} )
          </NoMoreData>
        )}
      </PostContainer>
    </Container>
  );
};

export default Artist;
