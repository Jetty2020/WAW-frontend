import { gql, useMutation } from '@apollo/client';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useUser from '../../hooks/useUser';
import {
  deleteCommentMutation,
  deleteCommentMutationVariables,
} from '../../__generated__/deleteCommentMutation';
import { getCommentsQuery_getComments_comments } from '../../__generated__/getCommentsQuery';
import { GET_COMMENTS_QUERY } from './Comments';
import DeleteModal from './DeleteModal';

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteCommentMutation($deleteCommentInput: DeleteCommentInput!) {
    deleteComment(input: $deleteCommentInput) {
      ok
      error
    }
  }
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  border-bottom: 0.875px solid #e6e5e5;
  &:last-child {
    border-bottom: none;
    margin-bottom: 3rem;
  }
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const DeleteCon = styled.div`
  color: #868e96;
  cursor: pointer;
  &:hover {
    color: #c1c8cf;
    text-decoration: underline;
  }
`;
const Nickname = styled(Link)`
  align-self: flex-start;
  font-size: 1rem;
  font-weight: 600;
  color: #343a40;
  &:hover {
    text-decoration: underline;
  }
`;

const DateBox = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  margin-top: 0.25rem;
  color: #868e96;
`;

const Content = styled.div`
  line-height: 1.3rem;
  margin-top: 0.75rem;
  margin-bottom: 1.5rem;
`;

type Props = {
  data: getCommentsQuery_getComments_comments;
  postId: number;
};

const Comment: React.FC<Props> = ({ data, postId }) => {
  const { data: userData } = useUser();
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [deleteCommentMutation] = useMutation<
    deleteCommentMutation,
    deleteCommentMutationVariables
  >(DELETE_COMMENT_MUTATION, {
    refetchQueries: [
      {
        query: GET_COMMENTS_QUERY,
        variables: {
          getCommentsInput: {
            postId,
          },
        },
      },
    ],
  });
  const deleteComment = useCallback(() => {
    deleteCommentMutation({
      variables: {
        deleteCommentInput: {
          commentId: data.id,
        },
      },
    });
  }, [deleteCommentMutation, data.id]);
  return (
    <CommentList>
      {modalShow && (
        <DeleteModal
          setModalShow={setModalShow}
          deleteFC={deleteComment}
          modalText="댓글"
        />
      )}
      <InfoBox>
        <div>
          <Nickname to={`/user/${data.user.id}`}>{data.user.nickname}</Nickname>
          <DateBox>{`${data.createdAt.substr(0, 4)}년 ${data.createdAt.substr(
            5,
            2
          )}월 ${data.createdAt.substr(8, 2)}일`}</DateBox>
        </div>
        {data.user.id === userData?.me.id && (
          <DeleteCon onClick={() => setModalShow(() => true)}>삭제</DeleteCon>
        )}
      </InfoBox>
      <Content>{data.content}</Content>
    </CommentList>
  );
};

export default Comment;
