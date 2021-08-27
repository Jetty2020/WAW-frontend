import { gql, useApolloClient, useMutation } from '@apollo/client';
import React, { useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';
import { POST_DETAIL_QUERY } from '../../pages/PostDetail';
import {
  createCommentMutation,
  createCommentMutationVariables,
} from '../../__generated__/createCommentMutation';
import { postDetailQuery } from '../../__generated__/postDetailQuery';

const CREATE_COMMENT_MUTATION = gql`
  mutation createCommentMutation($createCommentInput: CreateCommentInput!) {
    createComment(input: $createCommentInput) {
      ok
      error
      id
    }
  }
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 85%;
  margin: 3rem auto 3rem;
  border-top: 1.5px solid #e6e5e5;
  @media screen and (max-width: 668px) {
    width: 95%;
  }
`;
const CommnetFormHeader = styled.h4`
  font-size: 1.125rem;
  font-weight: 500;
`;
const CommentTextarea = styled.textarea`
  width: 100%;
  min-height: 7rem;
  height: auto;
  line-height: 1.5rem;
  resize: none;
  border: 1.5px solid #e6e5e5;
  padding: 1.5rem 1rem;
  outline: none;
`;
interface IButtonStyleProps {
  canClick: boolean;
}
const CommentButton = styled.button<IButtonStyleProps>`
  width: 7rem;
  padding: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  color: ${(props) => props.theme.color.white};
  border-radius: 0.375rem;
  margin-top: 1.125rem;
  margin-left: auto;
  ${(props) =>
    props.canClick
      ? css`
          background-color: ${(props) => props.theme.color.blue};
          cursor: pointer;
          &:hover {
            background-color: ${(props) => props.theme.color.lightblue};
          }
        `
      : css`
          background-color: #dfe4ea;
          pointer-events: none;
        `}

  &:hover {
    background-color: ${(props) => props.theme.color.lightblue};
  }
`;
type Props = {
  data: postDetailQuery;
  postId: number;
};
const Comment: React.FC<Props> = ({ data, postId }) => {
  const client = useApolloClient();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const handleResizeHeight = useCallback(() => {
    if (textareaRef === null || textareaRef.current === null) {
      return;
    }
    textareaRef.current.style.height = '7rem';
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
  }, []);
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { isValid },
  } = useForm<{ content: string }>({
    mode: 'onChange',
  });
  const { ref, ...rest } = register('content', {
    required: '댓글이 비어있습니다.',
    maxLength: 500,
  });
  const onSubmit = () => {
    const { content } = getValues();
    createCommentMutation({
      variables: {
        createCommentInput: {
          postId: +postId,
          content,
        },
      },
    });
  };
  const onCompletedCreateComment = (
    createCommentData: createCommentMutation
  ) => {
    const {
      createComment: { ok, id },
    } = createCommentData;
    const { content } = getValues();
    if (ok) {
      const queryResult = client.readQuery({
        query: POST_DETAIL_QUERY,
        variables: {
          postInput: {
            postId,
          },
        },
      });
      client.writeQuery({
        query: POST_DETAIL_QUERY,
        data: {
          postDetail: {
            ...queryResult.postDetail,
            post: {
              ...queryResult.postDetail.post,
              comments: [
                {
                  id,
                  content,
                  createdAt: new Date().toISOString(),
                  user: {
                    __typename: 'User',
                    id: 1,
                    nickname: 'asdf',
                  },
                  __typename: 'Comment',
                },
                ...queryResult.postDetail.post.comments,
              ],
            },
          },
        },
      });
      setValue('content', '');
    }
  };
  const [createCommentMutation] = useMutation<
    createCommentMutation,
    createCommentMutationVariables
  >(CREATE_COMMENT_MUTATION, {
    onCompleted: onCompletedCreateComment,
  });
  return (
    <CommentForm onSubmit={handleSubmit(onSubmit)}>
      <CommnetFormHeader>
        {data.postDetail.post?.comments.length}개의 댓글
      </CommnetFormHeader>
      <CommentTextarea
        {...rest}
        ref={(e) => {
          ref(e);
          textareaRef.current = e;
        }}
        id="content"
        placeholder="댓글을 작성하세요"
        onInput={handleResizeHeight}
      />
      <CommentButton canClick={isValid}>댓글 작성</CommentButton>
    </CommentForm>
  );
};

export default Comment;
