import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  deleteCommentMutation,
  deleteCommentMutationVariables,
} from '../../__generated__/deleteCommentMutation';
import { getCommentsQuery_getComments_comments } from '../../__generated__/getCommentsQuery';
import { GET_COMMENTS_QUERY } from './Comments';

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
interface IModalBgProps {
  modalShow: boolean;
}
const ModalBg = styled.div<IModalBgProps>`
  display: ${(props) => (props.modalShow ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #ffffffe2;
`;

const ModalBox = styled.div`
  width: 25rem;
  padding: 2rem 1.5rem;
  background-color: white;
  box-shadow: rgb(0 0 0 / 9%) 0px 2px 12px 0px;
`;
const ModalTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;
const ModalContent = styled.div`
  line-height: 1.5;
  font-size: 1rem;
  color: #495057;
  margin: 1.5rem 0;
`;
const ModalBtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
`;
interface IModalBtnProps {
  cancel?: boolean;
}

const ModalBtn = styled.button<IModalBtnProps>`
  height: 2rem;
  padding: 0 1.25rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => (props.cancel ? 'black' : 'white')};
  background-color: ${(props) => (props.cancel ? '#e9ecef' : '#12b886')};
  outline: none;
  border: none;
  border-radius: 0.25rem;
  margin-left: 0.75rem;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.cancel ? '#f7f7f7' : '#44d4a9')};
  }
`;

type Props = {
  data: getCommentsQuery_getComments_comments;
  postId: number;
};

const Comment: React.FC<Props> = ({ data, postId }) => {
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
  const handleModal = () => {
    setModalShow(true);
  };
  const deleteComment = () => {
    deleteCommentMutation({
      variables: {
        deleteCommentInput: {
          commentId: data.id,
        },
      },
    });
  };
  return (
    <CommentList>
      <ModalBg modalShow={modalShow}>
        <ModalBox>
          <ModalTitle>댓글 삭제</ModalTitle>
          <ModalContent>댓글을 정말로 삭제하시겠습니까?</ModalContent>
          <ModalBtnBox>
            <ModalBtn cancel onClick={() => setModalShow(false)}>취소</ModalBtn>
            <ModalBtn onClick={() => deleteComment()}>확인</ModalBtn>
          </ModalBtnBox>
        </ModalBox>
      </ModalBg>
      <InfoBox>
        <div>
          <Nickname to={`/user/${data.user.id}`}>{data.user.nickname}</Nickname>
          <DateBox>{`${data.createdAt.substr(0, 4)}년 ${data.createdAt.substr(
            5,
            2
          )}월 ${data.createdAt.substr(8, 2)}일`}</DateBox>
        </div>
        <DeleteCon onClick={() => handleModal()}>삭제</DeleteCon>
      </InfoBox>
      <Content>{data.content}</Content>
    </CommentList>
  );
};

export default Comment;
