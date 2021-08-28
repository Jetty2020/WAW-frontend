import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PageTitle from '../components/PageTitle';
import {
  postDetailQuery,
  postDetailQueryVariables,
} from '../__generated__/postDetailQuery';
import { POST_FRAGMENT } from '../fragments';
import LikeButton from '../components/postDetail/LikeButton';
import Comments from '../components/postDetail/Comments';

export const POST_DETAIL_QUERY = gql`
  query postDetailQuery($postInput: PostDetailInput!) {
    postDetail(input: $postInput) {
      ok
      error
      post {
        desc
        year
        createdAt
        isLike
        ...PostParts
      }
    }
  }
  ${POST_FRAGMENT}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostCon = styled.div`
  width: 768px;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;
const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
`;
const PostInfoCon = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
`;
const PostedCon = styled.div`
  display: flex;
`;
const WriterBox = styled.div`
  font-size: 1rem;
  font-weight: 500;
  margin-right: 0.5rem;
`;
const DotBox = styled.div`
  font-weight: 500;
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const DateBox = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: gray;
  margin-left: 0.5rem;
  @media screen and (max-width: 500px) {
    display: none;
  }
`;
const MadeCon = styled.div`
  display: flex;
`;
const ArtistName = styled.div`
  font-size: 1rem;
  font-weight: 500;
`;
const MadeYear = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: gray;
  margin-left: 0.75rem;
  @media screen and (max-width: 500px) {
    display: none;
  }
`;
const ImgCon = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  margin: 3rem auto;
  background-color: #eff1f2;
  @media screen and (max-width: 668px) {
    width: 95%;
  }
`;
const PostImg = styled.img`
  max-width: 500px;
  max-height: 500px;
  object-fit: contain;
  @media screen and (max-width: 668px) {
    width: 100%;
  }
`;
const PostDesc = styled.div`
  display: flex;
  width: 85%;
  margin: 5rem auto 0;
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.75rem;
  @media screen and (max-width: 668px) {
    width: 95%;
  }
`;

const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const { data, loading } = useQuery<postDetailQuery, postDetailQueryVariables>(
    POST_DETAIL_QUERY,
    {
      variables: {
        postInput: {
          postId: +postId,
        },
      },
    }
  );

  console.log(loading, data);
  // console.log(postId);
  return (
    <Container>
      {data?.postDetail.post && <LikeButton data={data} postId={+postId} />}
      <PageTitle title={data?.postDetail.post?.title ?? 'Post'} />
      {!loading && data?.postDetail.post ? (
        <PostCon>
          <Title>{data?.postDetail.post?.title}</Title>
          <PostInfoCon>
            <PostedCon>
              <Link to={`/user/${data?.postDetail.post?.writer.id}`}>
                <WriterBox>{data?.postDetail.post?.writer.nickname}</WriterBox>
              </Link>
              <DotBox>·</DotBox>
              <DateBox>{`${data?.postDetail.post?.createdAt.substr(
                0,
                4
              )}년 ${data?.postDetail.post?.createdAt.substr(
                5,
                2
              )}월 ${data?.postDetail.post?.createdAt.substr(
                8,
                2
              )}일`}</DateBox>
            </PostedCon>
            <MadeCon>
              {data?.postDetail.post?.artist?.name ? (
                <Link to={`/made-by/${data?.postDetail.post?.artist?.id}`}>
                  <ArtistName>{data?.postDetail.post?.artist?.name}</ArtistName>
                </Link>
              ) : (
                <ArtistName>작자 미상</ArtistName>
              )}
              <MadeYear>
                {data?.postDetail.post?.year
                  ? `제작년도: ${data?.postDetail.post?.year}`
                  : '제작년도 미상'}
              </MadeYear>
            </MadeCon>
          </PostInfoCon>
          <ImgCon>
            <PostImg src={data?.postDetail.post?.imgUrl} />
          </ImgCon>
          <PostDesc>{data?.postDetail.post?.desc}</PostDesc>
          <Comments postId={+postId} />
        </PostCon>
      ) : null}
    </Container>
  );
};

export default PostDetail;
