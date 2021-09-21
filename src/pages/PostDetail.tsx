import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PageTitle from '../components/PageTitle';
import {
  postDetailQuery,
  postDetailQueryVariables,
} from '../__generated__/postDetailQuery';
import { POST_FRAGMENT } from '../fragments';
import LikeButton from '../components/postDetail/LikeButton';
import Comments from '../components/postDetail/Comments';
import {
  deletePostMutation,
  deletePostMutationVariables,
} from '../__generated__/deletePostMutation';
import { POSTS_QUERY } from './Home';
import { client } from '../apollo';
import DeleteModal from '../components/postDetail/DeleteModal';
import useUser from '../hooks/useUser';

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

const DELETE_POST_MUTATION = gql`
  mutation deletePostMutation($deletePostInput: DeletePostInput!) {
    deletePost(input: $deletePostInput) {
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
  margin-bottom: 3rem;
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
  &:hover {
    text-decoration: underline;
  }
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
interface IArtistProps {
  underline?: boolean;
}
const ArtistName = styled.div<IArtistProps>`
  font-size: 1rem;
  font-weight: 500;
  &:hover {
    text-decoration: ${(props) => (props.underline ? 'underline' : 'none')};
  }
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
const EditBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;
const EditBtn = styled.button`
  margin-left: 1rem;
  color: gray;
  padding: 0;
  cursor: pointer;
  border: none;
  background-color: ${(props) => props.theme.color.lightgray};
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
  const history = useHistory();
  const { postId } = useParams<{ postId: string }>();
  const [modalShow, setModalShow] = useState<boolean>(false);
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
  const onCompleted = (data: deletePostMutation) => {
    const {
      deletePost: { ok },
    } = data;
    if (ok) {
      const queryId = `Root_Query`;
      client.cache.modify({
        id: queryId,
        fields: {
          posts(prev) {
            console.log(prev);
            return prev;
          },
        },
      });
      history.push(`/`);
    }
  };
  const [deletePostMutation] = useMutation<
    deletePostMutation,
    deletePostMutationVariables
  >(DELETE_POST_MUTATION, {
    refetchQueries: [
      {
        query: POSTS_QUERY,
        variables: {
          postsInput: {
            page: 1,
          },
        },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted,
  });
  const updatePost = () => {
    history.push(`/edit-post/${postId}`);
  };
  const deletePost = () => {
    deletePostMutation({
      variables: {
        deletePostInput: {
          postId: +postId,
        },
      },
    });
  };
  const { data: userData } = useUser();
  useEffect(() => {
    if (!loading && !data?.postDetail.post)
      history.push(`/post/${postId}/NotFound`);
  });
  return (
    <Container>
      {data?.postDetail.post && <LikeButton data={data} postId={+postId} />}
      {modalShow && (
        <DeleteModal
          setModalShow={setModalShow}
          deleteFC={deletePost}
          modalText="게시물"
        />
      )}
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
                  <ArtistName underline>
                    {data?.postDetail.post?.artist?.name}
                  </ArtistName>
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
          {userData?.me.id === data?.postDetail.post?.writer?.id && (
            <EditBox>
              <EditBtn onClick={() => updatePost()}>수정</EditBtn>
              <EditBtn onClick={() => setModalShow(true)}>삭제</EditBtn>
            </EditBox>
          )}
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
