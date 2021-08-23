import { gql, useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PageTitle from '../components/PageTitle';
import { BsHeartFill, BsHeart } from 'react-icons/bs';
import {
  postDetailQuery,
  postDetailQueryVariables,
} from '../__generated__/postDetailQuery';
import {
  toggleLikeMutation,
  toggleLikeMutationVariables,
} from '../__generated__/toggleLikeMutation';
import { client } from '../apollo';

interface IParams {
  postId: string;
}
const POST_DETAIL_QUERY = gql`
  query postDetailQuery($postInput: PostDetailInput!) {
    postDetail(input: $postInput) {
      ok
      error
      post {
        id
        title
        year
        desc
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

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLikeMutation($toggleLikeInput: ToggleLikeInput!) {
    toggleLike(input: $toggleLikeInput) {
      ok
      error
    }
  }
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
  margin: 5rem auto;
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.75rem;
  @media screen and (max-width: 668px) {
    width: 95%;
  }
`;

const LikeBtnCon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0.5rem;
  padding-bottom: 1rem;
  position: fixed;
  top: 35%;
  left: 10%;
  width: 4rem;
  border-radius: 2rem;
  background-color: #eff1f2;
`;

const LikeBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border: 1px solid gray;
  border-radius: 1.5rem;
  background-color: ${(props) => props.theme.color.white};
  cursor: pointer;
  &:hover {
    border-color: ${(props) => props.theme.color.red};
    color: ${(props) => props.theme.color.red};
  }
`;

const LikeNum = styled.div`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
`;

const PostDetail: React.FC = () => {
  const { postId } = useParams<IParams>();
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
  const onCompleted = (toggleLikeData: toggleLikeMutation) => {
    const {
      toggleLike: { ok },
    } = toggleLikeData;
    if (ok) {
      const postIdCashe = `Post:${postId}`;
      client.cache.modify({
        id: postIdCashe,
        fields: {
          isLike(prev) {
            return !prev;
          },
          likesNum(prev) {
            if (data?.postDetail.post?.isLike) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
    }
  };
  const [toggleLikeMutation] = useMutation<
    toggleLikeMutation,
    toggleLikeMutationVariables
  >(TOGGLE_LIKE_MUTATION, {
    variables: {
      toggleLikeInput: { postId: +postId },
    },
    onCompleted,
  });
  // console.log(loading, data);
  // console.log(postId);
  return (
    <Container>
      <LikeBtnCon>
        <LikeBtn onClick={() => toggleLikeMutation()}>
          {data?.postDetail.post?.isLike ? (
            <BsHeartFill size="1.5rem" />
          ) : (
            <BsHeart size="1.5rem" />
          )}
        </LikeBtn>
        <LikeNum>{data?.postDetail.post?.likesNum}</LikeNum>
      </LikeBtnCon>
      <PageTitle title={data?.postDetail.post?.title ?? 'Post'} />
      {!loading ? (
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
        </PostCon>
      ) : null}
    </Container>
  );
};

export default PostDetail;
