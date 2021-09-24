import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineSearch } from 'react-icons/ai';
import { useInView } from 'react-intersection-observer';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PageTitle from '../components/PageTitle';
import useArtist from '../hooks/useArtist';
import { SearchPostInput } from '../__generated__/globalTypes';
import {
  searchPostQuery,
  searchPostQueryVariables,
  searchPostQuery_searchPost_posts,
} from '../__generated__/searchPostQuery';

const SEARCH_POST_QUERY = gql`
  query searchPostQuery($searchPostInput: SearchPostInput!) {
    searchPost(input: $searchPostInput) {
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SearchCon = styled.div`
  width: 768px;
  margin-top: 2rem;
  margin-bottom: 3rem;
  @media screen and (max-width: 800px) {
    width: 90%;
  }
`;
const InputBox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid black;
  padding: 0 1rem;
  background-color: none;
`;
const SearchInput = styled.input`
  width: 100%;
  line-height: 1.25rem;
  font-size: 1.375rem;
  margin: 1rem 0 1rem 0.875rem;
  border: none;
  background-color: none;
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
const ArtistCon = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 1rem;
  width: 100%;
`;
const ArtistBox = styled.div`
  font-size: 0.875rem;
  padding: 0.75rem 1rem;
  margin: 0.375rem 0.5rem;
  border-radius: 2.5rem;
  background-color: rgb(241, 243, 245);
  color: rgb(12, 166, 120);
`;

const Search: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [posts, setPosts] = useState<searchPostQuery_searchPost_posts[]>([]);
  const [more, setMore] = useState<boolean>(true);
  const history = useHistory();
  const { artistsData, artistsLoading } = useArtist();
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const [_, word] = decodeURI(window.location.href).split('?q=');
  const [searchQuery, setSearchQuery] = useState<string>(word);
  const { register, getValues, handleSubmit } = useForm<SearchPostInput>({
    mode: 'onChange',
  });
  const onSubmit = () => {
    const { query } = getValues();
    setPosts([]);
    setSearchQuery(query);
    history.push(`/search?q=${query}`);
  };

  const { data: postsData, loading: postsLoading } = useQuery<
    searchPostQuery,
    searchPostQueryVariables
  >(SEARCH_POST_QUERY, {
    variables: {
      searchPostInput: {
        query: searchQuery ? searchQuery : '',
        page,
      },
    },
  });
  useEffect(() => {
    postsData?.searchPost.posts?.forEach((post) => {
      setPosts((cur) => [...cur, post]);
    });
  }, [postsData]);
  if (inView === true && !postsLoading) setPage((cur) => cur + 1);
  if (
    more &&
    (posts.length % 6 !== 0 || postsData?.searchPost.posts?.length === 0)
  )
    setMore(false);
  return (
    <Container>
      <PageTitle title={word ? word : 'Search'} />
      <SearchCon>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputBox>
            <AiOutlineSearch size="1.75rem" />
            <SearchInput
              {...register('query', {
                required: '검색란이 비어있습니다.',
              })}
              id="query"
              name="query"
              type="text"
              defaultValue={word}
              maxLength={50}
            />
          </InputBox>
        </form>
        {(!posts.length || !word) && !artistsLoading && (
          <ArtistCon>
            <div>작가들 : </div>
            {!artistsLoading &&
              artistsData?.getArtists.artists?.map((artist) => (
                <Link to={`/artist?id=${artist.id}`}>
                  <ArtistBox>{artist.name}</ArtistBox>
                </Link>
              ))}
          </ArtistCon>
        )}
        {posts && word && (
          <div>
            <TotalSearch>
              총{' '}
              <TotalSearchNum>
                {postsData?.searchPost.totalResults}개
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
                      made by{' '}
                      <Link to={`/made-by/${post.artist.id}`}>
                        <Name>{post.artist?.name}</Name>
                      </Link>
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
            더 이상 게시물이 없습니다. ( {postsData?.searchPost.totalResults} /{' '}
            {postsData?.searchPost.totalResults} )
          </NoMoreData>
        )}
      </SearchCon>
    </Container>
  );
};

export default Search;
