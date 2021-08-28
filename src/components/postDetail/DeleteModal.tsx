import { gql, useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import {
  deleteCommentMutation,
  deleteCommentMutationVariables,
} from '../../__generated__/deleteCommentMutation';
import { GET_COMMENTS_QUERY } from './Comments';

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteCommentMutation($deleteCommentInput: DeleteCommentInput!) {
    deleteComment(input: $deleteCommentInput) {
      ok
      error
    }
  }
`;

const ModalBg = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
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
  setModalShow: (value: boolean) => void;
  postId: number;
  commentId: number;
};
const DeleteModal: React.FC<Props> = ({ setModalShow, postId, commentId }) => {
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);
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
  const deleteComment = () => {
    deleteCommentMutation({
      variables: {
        deleteCommentInput: {
          commentId,
        },
      },
    });
  };
  return createPortal(
    <ModalBg>
      <ModalBox>
        <ModalTitle>댓글 삭제</ModalTitle>
        <ModalContent>댓글을 정말로 삭제하시겠습니까?</ModalContent>
        <ModalBtnBox>
          <ModalBtn cancel onClick={() => setModalShow(false)}>
            취소
          </ModalBtn>
          <ModalBtn onClick={() => deleteComment()}>확인</ModalBtn>
        </ModalBtnBox>
      </ModalBox>
    </ModalBg>,
    document.getElementById('modal')!
  );
};

export default DeleteModal;
