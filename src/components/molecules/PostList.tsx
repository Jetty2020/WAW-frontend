import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CONFIG_SEARCH_POSTS } from '../../constants';
import {
  searchByUserQuery,
  searchByUserQueryVariables,
  searchByUserQuery_searchByUser_posts,
} from '../../__generated__/searchByUserQuery';

const SEARCHBYUSER_QUERY = gql`
  query searchByUserQuery($searchByUserInput: SearchByUserInput!) {
    searchByUser(input: $searchByUserInput) {
      ok
      error
      totalResults
      userName
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
const ContentBox = styled.div`
  padding: 2rem;
  margin-top: 3rem;
  border: 1px solid #d3d3d3;
  border-radius: 0.25rem;
  background-color: ${(props) => props.theme.color.white};
  box-shadow: 0 5px 18px -7px rgba(0, 0, 0, 1);
`;
const ProfileTitle = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
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

type Props = {
  userId: number;
  isMe?: boolean;
};
const MyPost: React.FC<Props> = ({ userId, isMe }) => {
  const [page, setPage] = useState<number>(1);
  const [more, setMore] = useState<boolean>(true);
  const [posts, setPosts] = useState<searchByUserQuery_searchByUser_posts[]>(
    []
  );
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const { data: postsData, loading: postsLoading } = useQuery<
    searchByUserQuery,
    searchByUserQueryVariables
  >(SEARCHBYUSER_QUERY, {
    variables: {
      searchByUserInput: {
        userId,
        page,
      },
    },
  });
  useEffect(() => {
    postsData?.searchByUser.posts?.forEach((post) => {
      setPosts((cur) => [...cur, post]);
    });
  }, [postsData]);
  if (
    inView === true &&
    !postsLoading &&
    page * CONFIG_SEARCH_POSTS === posts.length
  )
    setPage((cur) => cur + 1);
  if (
    more &&
    (posts.length % CONFIG_SEARCH_POSTS !== 0 ||
      postsData?.searchByUser.posts?.length === 0)
  )
    setMore(() => false);
  return (
    <ContentBox>
      {isMe ? (
        <ProfileTitle>내 게시물</ProfileTitle>
      ) : (
        <ProfileTitle>
          {postsData?.searchByUser.userName &&
            "'" + postsData?.searchByUser.userName + "'님의 게시물"}
        </ProfileTitle>
      )}
      <TotalSearch>
        총{' '}
        <TotalSearchNum>
          {postsData?.searchByUser.totalResults}개
        </TotalSearchNum>
        의 포스트가 있습니다.
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
            {post.artist && (
              <PostBy>
                made by{' '}
                <Link to={`/artist?id=${post.artist.id}`}>
                  <Name>{post.artist?.name}</Name>
                </Link>
              </PostBy>
            )}
          </PostBox>
          <PostBox>
            <PostInfo>{`${post?.createdAt.substr(
              0,
              4
            )}년 ${post?.createdAt.substr(5, 2)}월 ${post?.createdAt.substr(
              8,
              2
            )}일`}</PostInfo>
            <PostInfo>·</PostInfo>
            <PostInfo>{post.likesNum}개의 좋아요</PostInfo>
          </PostBox>
        </PostCon>
      ))}
      {!postsLoading && more && <div ref={ref} />}
      {!more && !postsLoading && (
        <NoMoreData>
          더 이상 게시물이 없습니다. ( {postsData?.searchByUser.totalResults} /{' '}
          {postsData?.searchByUser.totalResults} )
        </NoMoreData>
      )}
    </ContentBox>
  );
};

export default MyPost;
